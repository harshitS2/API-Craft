import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [serverError, setServerError] = useState("");
  const { login, isLoggingIn } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setServerError("");

    // Client-side validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      return;
    }
    if (!password || password.length < 8) {
      setPasswordError(true);
      return;
    }

    try {
      const loginData = { email, password };
      const res = await login(loginData);

      console.log("Login response:", res);

      // Check if login was successful
      if (res.message === "User logged in successfully") {
        // Optional: Clear fields on success
        setEmail("");
        setPassword("");
        setEmailError(false);
        setPasswordError(false);
        setServerError("");
        navigate("/dashboard");
      } else {
        throw new Error("Unexpected login response");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.");
      if (error.response?.data?.error) {
        setServerError(error.response.data.error);
      } else {
        setServerError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center mt-32 p-4 overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#171C21] rounded-xl shadow-lg p-8"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-[#ECF9FF]">
          Login
        </h1>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-white">
            Email
          </label>
          <div
            className={`flex items-center border rounded-lg p-2 transition-colors duration-200 ${
              emailError
                ? "border-red-500"
                : "border-gray-300 focus-within:border-blue-500"
            }`}
          >
            <svg
              className="h-5 w-5 text-gray-400 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input
              type="email"
              placeholder="mail@site.com"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false);
                setServerError("");
              }}
              className="w-full focus:outline-none border-none bg-transparent text-white"
            />
          </div>
          {emailError && (
            <p className="text-sm text-red-500 mt-1">
              Please enter a valid email address
            </p>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-white">
            Password
          </label>
          <div
            className={`flex items-center border rounded-lg p-2 transition-colors duration-200 ${
              passwordError
                ? "border-red-500"
                : "border-gray-300 focus-within:border-blue-500"
            }`}
          >
            <svg
              className="h-5 w-5 text-gray-400 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(false);
                setServerError("");
              }}
              className="w-full focus:outline-none border-none bg-transparent text-white"
            />
          </div>
          {passwordError && (
            <p className="text-sm text-red-500 mt-1">
              Password must be at least 8 characters
            </p>
          )}
        </div>

        {/* Server Error Message */}
        {serverError && (
          <p className="text-sm text-red-500 mb-4 text-center">{serverError}</p>
        )}

        {/* Login Button */}
        <button
          type="submit"
          disabled={isLoggingIn}
          className={`w-full py-2 px-4 font-medium rounded-lg transition-colors duration-200 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:cursor-pointer
                     ${
                       isLoggingIn
                         ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                         : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white"
                     }`}
        >
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className="flex justify-center mt-4">
        <Link
          to="/signup"
          className="text-sm text-blue-500 hover:text-blue-600"
        >
          Don’t have an account? Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;