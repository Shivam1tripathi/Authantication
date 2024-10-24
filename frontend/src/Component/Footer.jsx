import React, { useEffect, useState } from "react";
import { useAuth } from "../authcontext"; // Import the authentication context

const Footer = () => {
  const [auth, setAuth] = useAuth(); // Access the auth context to manage user authentication and dark mode

  // State variables for text color and background color, initialized with default values
  let [textcolor, setTextcolor] = useState("white");
  let [backgroundcolor, setBackgroundcolor] = useState("black");

  // Effect to handle color changes based on dark mode setting from auth context
  useEffect(() => {
    if (auth.darkmode === true) {
      // If dark mode is enabled, set text to black and background to white
      setTextcolor("black");
      setBackgroundcolor("white");
    } else {
      // If dark mode is disabled, set text to white and background to black
      setTextcolor("white");
      setBackgroundcolor("black");
    }
  }, [auth]); // Dependency on `auth`, runs whenever dark mode setting in auth changes

  return (
    // Footer container with dynamic background color
    <div className="bg-slate-500 h-20 flex items-center justify-center">
      {/* Welcome message with dynamic text color */}
      <h1 style={{ color: textcolor }} className="font-extrabold text-4xl">
        WELCOME
      </h1>
    </div>
  );
};

export default Footer;
