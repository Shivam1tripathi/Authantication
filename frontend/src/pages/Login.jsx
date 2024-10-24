import React, { useEffect, useState } from "react"; // Import necessary React hooks
import Layout from "../Component/Layout"; // Import the Layout component for consistent styling
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import navigation hooks
import axios from "axios"; // Import axios for making HTTP requests
import toast from "react-hot-toast"; // Import toast for displaying notifications
import { useAuth } from "../authcontext"; // Import custom authentication context

const Login = () => {
  // Get authentication state and function from context
  const [auth, setAuth] = useAuth();

  // State variables for dynamic colors based on dark mode
  let [textcolor, setTextcolor] = useState("white");
  let [backgroundcolor, setBackgroundcolor] = useState("black");

  // Effect to change colors based on dark mode setting
  useEffect(() => {
    if (auth.darkmode === true) {
      setTextcolor("black"); // Set text color for dark mode
      setBackgroundcolor("white"); // Set background color for dark mode
    } else {
      setTextcolor("white"); // Set text color for light mode
      setBackgroundcolor("#78ABA8"); // Set background color for light mode
    }
  }, [auth]); // Re-run this effect whenever auth changes

  // State variables for email and password inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Hooks for navigation and current location
  const location = useLocation(); // Get the current location
  const navigate = useNavigate(); // Get the navigate function

  // Form submission handler
  const handlesubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Make a POST request to the login API
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v2/auth/login`,
        { email, password }
      );
      if (res.data.success) {
        // If login is successful, update auth context and local storage
        toast.success(res.data.message); // Show success message
        setAuth({
          ...auth, // Spread existing auth state
          user: res.data.user, // Set the logged-in user
          token: res.data.token, // Set the authentication token
        });
        localStorage.setItem("auth", JSON.stringify(res.data)); // Store auth data in local storage
        navigate(location.state || "/"); // Navigate to the original location or home
      } else {
        // If login fails, show error message
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error); // Log any errors to the console
      toast.error("Something Went Wrong"); // Show generic error message
    }
  };

  return (
    <Layout>
      {/* Main container with dynamic background color */}
      <div
        style={{ backgroundColor: backgroundcolor }}
        className="flex flex-col items-center bg-slate-200"
      >
        {/* Main heading */}
        <h1 style={{ color: textcolor }} className="text-5xl mt-10 font-bold ">
          LOGIN
        </h1>
        {/* Login form */}
        <form
          onSubmit={handlesubmit}
          className="bg-slate-400 mt-5 mb-20 flex flex-col p-4 rounded-xl login-form"
        >
          {/* Email input */}
          <input
            className="mt-5 w-60 h-10 rounded-lg p-2"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Email"
            required
          />
          {/* Password input */}
          <input
            className="mt-8 w-60 h-10 rounded-lg p-2"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
            required
          />
          {/* Submit button */}
          <button
            type="submit"
            className="mt-10 w-40 h-8 rounded-lg p-2 bg-blue-600 text-white font-bold flex justify-center items-center"
          >
            Submit
          </button>
          {/* Link to password recovery */}
          <Link to={"/forget-password"} className="text-blue-700 mt-2">
            Forget Password
          </Link>
        </form>
      </div>
    </Layout>
  );
};

export default Login; // Export the Login component for use in other parts of the application
