import React, { useEffect, useState } from "react"; // Import necessary React hooks
import Layout from "../Component/Layout"; // Import the Layout component for consistent styling
import axios from "axios"; // Import axios for making HTTP requests
import toast from "react-hot-toast"; // Import toast for displaying notifications
import { useNavigate } from "react-router-dom"; // Import navigation hook
import { useAuth } from "../authcontext"; // Import custom authentication context

const RegisterPage = () => {
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

  // State variables for form inputs
  const [name, setName] = useState(""); // For user name
  const [email, setEmail] = useState(""); // For user email
  const [password, setPassword] = useState(""); // For user password
  const [Phone, setPhone] = useState(""); // For user phone number
  const [address, setAddress] = useState(""); // For user address
  const [answer, setAnswer] = useState(""); // For security question answer
  const navigate = useNavigate(); // Get the navigate function for redirection

  // Form submission handler
  const handlesubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Make a POST request to the registration API
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v2/auth/register`,
        { name, email, password, Phone, address, answer }
      );
      console.log("2"); // Log to the console for debugging purposes
      if (res.data.success) {
        // If registration is successful, navigate to the login page and show success message
        navigate("/login");
        toast.success(res.data.message);
      } else {
        // If registration fails, show error message
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error); // Log any errors to the console for debugging
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
          Register
        </h1>
        {/* Registration form */}
        <form
          onSubmit={handlesubmit}
          className="bg-slate-400 mt-5 mb-16 flex flex-col p-4 rounded-lg register-form"
        >
          {/* Input fields for registration details */}
          <input
            className="mt-3 w-60 h-8 rounded-lg p-2"
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            placeholder="Name"
            required
          />
          <input
            className="mt-3 w-60 h-8 rounded-lg p-2"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Email"
            required
          />
          <input
            className="mt-3 w-60 h-8 rounded-lg p-2"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
            required
          />
          <input
            className="mt-3 w-60 h-8 rounded-lg p-2"
            value={Phone}
            onChange={(e) => {
              const input = e.target.value;

              // Allow only digits and limit to 10 characters
              if (/^\d*$/.test(input) && input.length <= 10) {
                setPhone(input);
              }
            }}
            type="number"
            placeholder="Phone"
            style={{
              WebkitAppearance: "none", // Remove spinner for WebKit browsers
              MozAppearance: "textfield", // Remove spinner for Firefox
            }}
            required
          />
          <input
            className="mt-3 w-60 h-8 rounded-lg p-2"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            type="text"
            placeholder="Address"
            required
          />
          <input
            className="mt-3 w-60 h-8 rounded-lg p-2"
            onChange={(e) => {
              setAnswer(e.target.value);
            }}
            type="text"
            placeholder="Enter Favourite Sports"
            required
          />
          {/* Submit button */}
          <button
            type="submit"
            className="mt-3 w-40 h-8 rounded-lg p-2 bg-blue-600 text-white font-bold flex justify-center items-center"
          >
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default RegisterPage; // Export the RegisterPage component for use in other parts of the application
