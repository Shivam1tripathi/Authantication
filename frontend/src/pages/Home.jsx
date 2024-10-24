import React, { useEffect, useState } from "react"; // Import necessary hooks and components
import Layout from "../Component/Layout"; // Import the Layout component for consistent styling
import { Link } from "react-router-dom"; // Import Link for navigation
import { useAuth } from "../authcontext"; // Import custom authentication context

const Home = () => {
  // Get authentication state and function from context
  const [auth, setAuth] = useAuth();

  // State variables for text color, background color, and heading color
  let [textcolor, setTextcolor] = useState("white");
  let [backgroundcolor, setBackgroundcolor] = useState("black");
  let [color, setColor] = useState("white");

  // Effect to change colors based on dark mode setting
  useEffect(() => {
    if (auth.darkmode === true) {
      // If dark mode is enabled, set appropriate colors
      setTextcolor("black");
      setBackgroundcolor("white");
      setColor("#78ABA8");
    } else {
      // If dark mode is not enabled, set different colors
      setTextcolor("white");
      setBackgroundcolor("#78ABA8");
      setColor("white");
    }
  }, [auth]); // Re-run this effect whenever auth changes

  return (
    <Layout>
      {/* Main container with dynamic background color */}
      <div
        style={{ height: "85vh", backgroundColor: backgroundcolor }}
        className="flex flex-col"
      >
        {/* Main heading with dynamic text color */}
        <h1
          style={{ color: color }}
          className="text-center font-extrabold text-4xl text-blue-500"
        >
          Home
        </h1>

        {auth?.user ? ( // Check if the user is authenticated
          <>
            {/* Navigation link to edit profile */}
            <div className="flex justify-end">
              <Link
                to={"/edit-profile"}
                className="w-28 h-9 flex justify-center items-center rounded-xl font-bold text-white bg-red-600"
              >
                Edit profile
              </Link>
            </div>
            {/* User information displayed if authenticated */}
            <div className="flex mt-10 flex-col items-center h-full">
              <h1 className="font-bold text-3xl mt-5">
                Name: {auth?.user?.name}
              </h1>
              <h1 className="font-bold text-3xl mt-5">
                Email: {auth?.user?.email}
              </h1>
              <h1 className="font-bold text-3xl mt-5">
                Phone: {auth?.user?.Phone}
              </h1>
              <h1 className="font-bold text-3xl mt-5">
                Address: {auth?.user?.address}
              </h1>
            </div>
          </>
        ) : (
          // If user is not authenticated, prompt to login
          <div
            style={{ height: "85vh" }}
            className="flex justify-center items-center"
          >
            <h1 className="text-center font-extrabold text-5xl text-red-600">
              Please login
            </h1>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home; // Export the Home component for use in other parts of the application
