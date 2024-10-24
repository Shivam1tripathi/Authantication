import React, { useEffect, useState } from "react";
import Layout from "../Component/Layout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authcontext";
import axios from "axios";
import toast from "react-hot-toast";

const EditProfile = () => {
  // Initialize authentication context and dark mode settings
  const [auth, setAuth] = useAuth(); // Get auth context (includes user data and dark mode settings)
  let [textcolor, setTextcolor] = useState("white"); // State to manage text color based on dark mode
  let [backgroundcolor, setBackgroundcolor] = useState("black"); // State to manage background color

  // Update colors based on the dark mode setting from auth context
  useEffect(() => {
    if (auth.darkmode === true) {
      setTextcolor("black");
      setBackgroundcolor("white");
    } else {
      setTextcolor("white");
      setBackgroundcolor("#78ABA8");
    }
  }, [auth]); // Dependency on auth, runs whenever `auth` changes

  // Initialize form state variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate(); // Navigation hook to programmatically redirect

  // Populate user data into the form on component mount
  useEffect(() => {
    const { name, email, Phone, address } = auth?.user; // Destructure user details from auth context
    setName(name);
    setEmail(email);
    setPhone(Phone);
    setAddress(address);
  }, [auth?.user]); // Dependency on `auth?.user`, runs whenever the user data changes

  // Form submission handler for profile update
  const handlesubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Send a PUT request to update the user profile
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v2/auth/profile`,
        { name, email, password, Phone, address } // Send updated form data
      );
      console.log(data);

      // Handle error response from the server
      if (data?.error) {
        toast.error(data?.error); // Display error message
      } else {
        // Update auth context and local storage with the updated user data
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile updated successfully"); // Display success message
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong"); // Display error message on failure
    }
  };

  return (
    <Layout>
      {/* Main container with dynamic background color */}
      <div
        style={{ height: "85vh", backgroundColor: backgroundcolor }}
        className="flex flex-col items-center"
      >
        {/* Page title */}
        <h1 className="text-5xl mt-10 font-bold">Edit Profile</h1>

        {/* Form for editing profile */}
        <form
          onSubmit={handlesubmit}
          className="bg-slate-400 mt-5 mb-16 flex flex-col p-4 rounded-lg register-form"
        >
          {/* Name input field */}
          <input
            className="mt-3 w-60 h-8 rounded-lg p-2"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            placeholder="Name"
            required
          />

          {/* Email input field (disabled) */}
          <input
            className="mt-3 w-60 h-8 rounded-lg p-2"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Email"
            required
            disabled // Email is disabled for editing
          />

          {/* Password input field */}
          <input
            className="mt-3 w-60 h-8 rounded-lg p-2"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="New Password"
          />

          {/* Phone input field with number and 10-digit restriction */}
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

          {/* Address input field */}
          <input
            className="mt-3 w-60 h-8 rounded-lg p-2"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            type="text"
            placeholder="Address"
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

export default EditProfile;
