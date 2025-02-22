import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const { signup } = useAuthStore();
  const navigate = useNavigate();

  // Password validation checks
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);

  // Check if all required conditions are met
  const isFormValid = () => {
    return (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword &&
      hasMinLength &&
      hasNumber &&
      hasLowercase &&
      hasUppercase
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }
    const signUpData = {
      name,
      email,
      password,
      confirmPassword,
    };
    // Send sign-up request to the server here
    try {
      const res = await signup(signUpData);
      if (res.message === "User registered successfully") {
        navigate("/dashboard");
      } else {
        throw new Error("Unexpected login response");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.");
    }
  };
  return (
    <div className="flex flex-col items-center mt-32 p-4 overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#171C21] rounded-xl shadow-lg p-8"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-[#ECF9FF]">
          Sign-up
        </h1>
        {/* Name Input */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-white">
            Name
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
              type="text"
              placeholder="Your Name..."
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="w-full focus:outline-none border-none bg-transparent text-white"
            />
          </div>
        </div>
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
                setPasswordMatchError(false);
              }}
              className="w-full focus:outline-none border-none bg-transparent text-white"
            />
          </div>
        </div>
        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-white">
            Confirm Password
          </label>
          <div
            className={`flex items-center border rounded-lg p-2 transition-colors duration-200 ${
              passwordError || passwordMatchError
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
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setPasswordError(false);
                setPasswordMatchError(false);
              }}
              className="w-full focus:outline-none border-none bg-transparent text-white"
            />
          </div>
          <div className="text-sm mt-1">
            <p className="text-white">
              Must be more than 8 characters, including:
            </p>
            <ul className="list-disc list-inside">
              <li className={hasMinLength ? "text-green-500" : "text-white"}>
                At least 8 characters
              </li>
              <li className={hasNumber ? "text-green-500" : "text-white"}>
                At least one number
              </li>
              <li className={hasLowercase ? "text-green-500" : "text-white"}>
                At least one lowercase letter
              </li>
              <li className={hasUppercase ? "text-green-500" : "text-white"}>
                At least one uppercase letter
              </li>
            </ul>
          </div>
          {passwordMatchError && (
            <p className="text-sm text-red-500 mt-1">Passwords do not match</p>
          )}
        </div>
        {/* SignUp Button */}
        <button
          type="submit"
          disabled={!isFormValid()}
          className={`w-full py-2 px-4 font-medium rounded-lg transition-colors duration-200 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:cursor-pointer
                     ${
                       isFormValid()
                         ? "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white"
                         : "bg-gray-400 text-gray-600 cursor-not-allowed"
                     }`}
        >
          Sign Up
        </button>
      </form>
      <div className="flex justify-center mt-4">
        <Link to="/login" className="text-sm text-blue-500 hover:text-blue-600">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
