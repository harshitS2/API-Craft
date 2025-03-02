import React from "react";
import { Link, useLocation } from "react-router-dom"; // Add useLocation import
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { authUser, logOut } = useAuthStore();
  const location = useLocation(); // Get current location

  // Check if current path is /login or /signup
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  console.log(authUser);

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* Left side */}
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          API-Craft
        </Link>
      </div>

      {/* Center links */}
      <div className="flex justify-center flex-1 gap-4">
        <Link to="/" className="btn btn-ghost">
          Home
        </Link>
        <Link to="/apis" className="btn btn-ghost">
          APIs
        </Link>
        <Link to="/create-api" className="btn btn-ghost">
          CreateAPI
        </Link>
      </div>

      {/* Right side */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
        />

        {/* Conditional rendering based on authUser */}
        {authUser ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
              <li>
                <Link to="/logout" onClick={logOut}>Logout</Link>
              </li>
            </ul>
          </div>
        ) : (
          // Only show Login/SignUp button if not on auth pages
          !isAuthPage && (
            <div className="flex gap-2">
              <Link to="/login" className="btn btn-ghost">
                Login/SignUp
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Navbar;