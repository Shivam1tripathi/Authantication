import React, { useEffect, useState } from "react";
import Layout from "../Component/Layout"; // Import layout for page structure
import axios from "axios"; // Import axios for API requests
import toast from "react-hot-toast"; // Import toast for notifications
import { useNavigate } from "react-router-dom"; // Import navigation hook
import { useAuth } from "../authcontext"; // Import authentication context

const Forgetpassword = () => {
  const [auth, setAuth] = useAuth(); // Access auth context to handle user authentication and dark mode settings

  // State variables for text and background color based on dark mode
  let [textcolor, setTextcolor] = useState("white");
  let [backgroundcolor, setBackgroundcolor] = useState("black");

  // Effect to change colors based on dark mode setting
  useEffect(() => {
    if (auth.darkmode === true) {
      setTextcolor("black");
      setBackgroundcolor("white");
    } else {
      setTextcolor("white");
      setBackgroundcolor("#78ABA8"); // Different background for non-dark mode
    }
  }, [auth]);

  // Form field state variables for email, new password, and security answer
  const [email, setEmail] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate(); // Use the navigate hook for programmatic navigation

  // Form submission function
  const handlesubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // API request to reset password, sending email, security answer, and new password
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v2/auth/forgetpassword`,
        {
          email,
          answer,
          newpassword,
        }
      );

      // If the request is successful, display success message and navigate to login page
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        // If there's an error, display error message
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong"); // General error handling
    }
  };

  return (
    <Layout>
      {/* Page container with dynamic background color */}
      <div
        style={{ backgroundColor: backgroundcolor }}
        className="flex flex-col items-center"
      >
        {/* Page title with dynamic text color */}
        <h1 style={{ color: textcolor }} className="text-5xl mt-10 font-bold">
          FORGET PASSWORD
        </h1>

        {/* Form for submitting email, new password, and security question answer */}
        <form
          onSubmit={handlesubmit}
          className="bg-slate-400 mt-10 mb-16 flex flex-col p-4 rounded-2xl login-form"
        >
          {/* Email input field */}
          <input
            className="mt-8 w-60 h-8 rounded-lg p-2"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
          />

          {/* New password input field */}
          <input
            className="mt-8 w-60 h-8 rounded-lg p-2"
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
          />

          {/* Security answer input field */}
          <input
            className="mt-8 w-60 h-8 rounded-lg p-2"
            onChange={(e) => setAnswer(e.target.value)}
            type="text"
            placeholder="Enter Favourite sports"
            required
          />

          {/* Submit button */}
          <button
            type="submit"
            className="mt-5 w-40 h-8 rounded-lg p-2 bg-blue-600 text-white font-bold flex justify-center items-center"
          >
            Change Password
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Forgetpassword;
