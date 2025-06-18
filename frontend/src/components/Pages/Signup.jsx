import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { Vortex } from "../ui/vortex";
import { toast } from "react-hot-toast";
import GoogleAuthButton from "./GoogleAuthButton";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCred.user);
      localStorage.setItem("user", JSON.stringify(userCred.user));
      toast.success("Signup successful! Please verify your email.");
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err.message);
      toast.error(err.message);
    }
  };

  return (
    <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
      <Vortex className="mt-20 pt-10 z-10">
        <div className="mx-auto rounded-lg dark:border md:mt-0 w-9/12 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="shadow flex max-sm:flex-col-reverse gap-10 shadow-violet-400 p-6 bg-clip-padding backdrop-filter backdrop-blur-xl bg-white/10 bg-opacity-30 rounded-lg text-white mx-auto">
            <div className="left w-1/2 max-sm:w-full">
              <h1 className="text-4xl font-semibold mb-5">
                <span className="text-violet-400">Zen</span>Zone
              </h1>
              <h1 className="text-lg font-medium mb-4 leading-tight tracking-tight text-gray-100 md:text-2xl">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6 text-black" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-200">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="John Doe"
                    className="bg-white/30 text-black rounded-lg w-full p-2.5"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-200">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="name@company.com"
                    className="bg-white/30 text-black rounded-lg w-full p-2.5"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-200">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-white/30 text-black rounded-lg w-full p-2.5"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-200">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="bg-white/30 text-black rounded-lg w-full p-2.5"
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-violet-400 hover:bg-violet-500 rounded-lg px-5 py-2.5"
                >
                  Sign up
                </button>

                <div className="flex items-center w-full justify-center my-6">
                  <hr className="w-1/2 bg-gray-50" />
                  <span className="px-2 text-gray-500 text-xs">OR</span>
                  <hr className="w-1/2 bg-gray-50" />
                </div>

                <GoogleAuthButton text={"Sign up with Google"} />

                <p className="text-sm text-gray-500">
                  Already have an account?{" "}
                  <Link to="/login" className="text-violet-400 hover:underline">
                    Login
                  </Link>
                </p>
              </form>
            </div>
            <div className="w-1/2 max-sm:w-full max-sm:h-[150px] flex justify-center">
              <img
                className="object-cover rounded-lg"
                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fb6c8ee7-953e-4132-8a70-f7df09b6fa8e/dey3pb8-e86d3b07-bb73-4db9-87a5-950f6b866c76.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </Vortex>
    </div>
  );
};

export default SignupForm;
