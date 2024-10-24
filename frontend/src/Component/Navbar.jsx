import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { useAuth } from "../authcontext"; // Import the authentication context
import toast from "react-hot-toast"; // Import toast for notifications
import Darkmodetoggle from "./Darkmodetoggle"; // Import Dark Mode toggle component

const Navbar = () => {
  const [auth, setAuth] = useAuth(); // Access the auth context for managing user authentication and preferences

  // State variables for text color and background color, initialized based on dark mode
  let [textcolor, setTextcolor] = useState("white");
  let [backgroundcolor, setBackgroundcolor] = useState("black");

  // Effect to dynamically update text and background colors based on dark mode setting in auth
  useEffect(() => {
    if (auth.darkmode === true) {
      // If dark mode is enabled, set text to white and background to black
      setTextcolor("white");
      setBackgroundcolor("black");
    } else {
      // If dark mode is disabled, set text to black and background to white
      setTextcolor("black");
      setBackgroundcolor("white");
    }
  }, [auth]); // Runs whenever the auth context changes

  // Function to handle user logout
  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" }); // Reset auth context to null user and empty token
    localStorage.removeItem("auth"); // Remove user data from localStorage
    toast.success("Logout Successful"); // Display a success message
  };

  return (
    // Navbar container with dynamic background color
    <div
      style={{ backgroundColor: backgroundcolor }}
      className="h-14 p-2 flex justify-between"
    >
      {/* Logo or home link */}
      <Link
        to={"/"}
        style={{ color: textcolor }}
        className="text-3xl font-bold"
      >
        Auth
      </Link>

      {/* Navigation links */}
      <ul className="flex mr-4">
        {/* If the user is logged in, show home and logout options */}
        {auth?.user ? (
          <>
            <Link
              to={"/"}
              style={{ color: textcolor }}
              className="text-xl mr-3 font-extrabold"
            >
              Home
            </Link>
            <button
              style={{ color: textcolor }}
              onClick={handleLogout}
              className="text-xl mr-2 mb-4 font-extrabold"
            >
              LOGOUT
            </button>
          </>
        ) : (
          // If the user is not logged in, show register and login options
          <>
            <Link
              to={"/register"}
              style={{ color: textcolor }}
              className="text-xl mr-2 font-extrabold"
            >
              Register
            </Link>
            <Link
              to={"/login"}
              style={{ color: textcolor }}
              className="text-xl mr-2 font-extrabold"
            >
              Login
            </Link>
          </>
        )}
        {/* Dark mode toggle button */}
        <Darkmodetoggle />
      </ul>
    </div>
  );
};

export default Navbar;
