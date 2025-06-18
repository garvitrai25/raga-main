// src/components/pages/Login.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase"; // ✅ Use your initialized Firebase
import { Vortex } from "../ui/vortex";
import GoogleAuthButton from "./GoogleAuthButton";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        setError("Please verify your email before logging in.");
        return;
      }

      console.log("Login successful:", user);
      // Optional: save user info or token in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/"); // redirect to homepage
    } catch (err) {
      console.error("Login failed:", err.message);
      setError("Invalid email or password");
    }
  };

  return (
    <>
      <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
        <Vortex className="mt-20 pt-10 z-10">
          <div className="mx-auto rounded-lg dark:border md:mt-0 w-9/12 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="shadow flex max-sm:flex-col-reverse gap-10 shadow-violet-400 p-6 bg-clip-padding backdrop-filter backdrop-blur-xl bg-white/10 bg-opacity-30 rounded-lg text-white mx-auto">
              <div className="w-1/2 max-sm:w-full">
                <h1 className="text-4xl font-semibold mb-5">
                  <span className="text-violet-400">Zen</span>Zone
                </h1>
                <h1 className="text-lg mb-4 font-medium leading-tight tracking-tight text-gray-100 md:text-2xl">
                  Login to your account
                </h1>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-200">
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="name@company.com"
                      className="bg-white/30 text-black rounded-lg outline-none block w-full p-2.5"
                      required
                      onChange={handleChange}
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
                      className="bg-white/30 text-black rounded-lg outline-none block w-full p-2.5"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-500">
                      <input type="checkbox" className="mr-2" /> Remember me
                    </label>
                    <Link to="/forgot-password" className="text-sm text-violet-400 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <button type="submit" className="w-full bg-violet-400 hover:bg-violet-500 text-white rounded-lg px-5 py-2.5">
                    Login
                  </button>
                  <div className="flex items-center w-full justify-center my-6">
                    <hr className="w-1/2 bg-gray-50" />
                    <span className="px-2 text-gray-500 text-xs">OR</span>
                    <hr className="w-1/2 bg-gray-50" />
                  </div>
                  <GoogleAuthButton text={"Log in with Google"} />
                  <p className="text-sm text-gray-500">
                    Don’t have an account yet?{" "}
                    <Link to="/register" className="text-violet-400 hover:underline">
                      Sign up
                    </Link>
                  </p>
                </form>
              </div>
              <div className="w-1/2 max-sm:w-full max-sm:h-[150px] flex justify-center">
                <img
                  className="rounded-lg object-cover max-sm:object-center"
                  src="https://cdn.pixabay.com/photo/2023/06/26/15/27/stones-8090026_1280.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </Vortex>
      </div>
    </>
  );
};

export default LoginForm;
