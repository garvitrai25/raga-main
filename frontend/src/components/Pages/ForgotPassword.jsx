import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod"; // Validation
import { Vortex } from "../ui/vortex";
import { NavbarDemo } from "../NavbarDemo";
import { sendPasswordResetEmail } from "firebase/auth"; // Firebase reset email
import { auth } from "../../lib/firebase"; // Firebase instance

// Zod schema for validation
const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validation = forgotPasswordSchema.safeParse({ email });

    if (!validation.success) {
      const errorMessages = validation.error.format();
      setErrors({ email: errorMessages.email?._errors[0] });
      return;
    }

    setErrors({});

    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Reset link sent successfully");
      setSubmitted(true);
    } catch (error) {
      console.error("Could not send reset link:", error);
      alert("Error sending reset link. Please try again later.");
    }
  };

  return (
    <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
      <NavbarDemo className="mb-4" />
      <Vortex className="mt-20 pt-10 z-10">
        <div className="w-full mx-auto rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="shadow shadow-violet-400 space-y-4 md:space-y-6 sm:p-8 bg-clip-padding backdrop-filter backdrop-blur-xl bg-white/10 bg-opacity-30 rounded-lg text-white p-10 max-w-lg mx-auto">
            {!submitted ? (
              <>
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-100 md:text-2xl dark:text-white">
                  Forgot Password
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-200">
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-white/30 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="name@company.com"
                      required
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-violet-400 hover:bg-violet-500 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Send Reset Link
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Remembered your password?{" "}
                    <Link
                      to="/login"
                      className="font-medium text-violet-400 hover:underline dark:text-violet-300"
                    >
                      Login
                    </Link>
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-100">
                  Check your email
                </h2>
                <p className="text-gray-400 mt-1">
                  We’ve sent a password reset link to {email}.
                </p>
                <Link
                  to="/login"
                  className="text-indigo-500 hover:text-indigo-400 mt-4"
                >
                  Back to Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </Vortex>
    </div>
  );
}
