import React, { useState, useEffect } from "react";
import { useAuth } from "../authcontext"; // Import the authentication context

const Darkmodetoggle = () => {
  const [auth, setAuth] = useAuth(); // Access the auth context to manage user authentication and preferences

  // Initialize dark mode state from localStorage or set to false by default
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode"); // Retrieve dark mode preference from localStorage
    return savedMode ? JSON.parse(savedMode) : false; // Parse stored value or return false if not found
  });

  // Effect to apply the dark mode settings when `darkMode` changes
  useEffect(() => {
    if (darkMode) {
      // Update the auth context when dark mode is enabled
      setAuth({ ...auth, user: auth.user, token: auth.token, darkmode: true });
      // Set the `data-theme` attribute on the root document element for dark mode styling
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      // Update the auth context when dark mode is disabled
      setAuth({ ...auth, user: auth.user, token: auth.token, darkmode: false });
      // Set the `data-theme` attribute on the root document element for light mode styling
      document.documentElement.setAttribute("data-theme", "light");
    }
    // Save the dark mode preference in localStorage
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]); // Dependency on `darkMode`, runs whenever it changes

  // Function to toggle dark mode state
  const toggleDarkMode = () => {
    setDarkMode(!darkMode); // Toggle between dark and light mode
  };

  return (
    // Dark mode toggle switch UI
    <label className="switch mr-3 ml-3">
      {/* Checkbox input for toggling dark mode */}
      <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
      {/* Custom slider for switch UI */}
      <span className="slider round"></span>
    </label>
  );
};

export default Darkmodetoggle;
