import mongoose from "mongoose"; // Import mongoose for MongoDB object modeling

// Function to establish a connection to the MongoDB database
const Dbconnection = async () => {
  try {
    // Attempt to connect to the database using the MongoDB URL from environment variables
    const conn = await mongoose.connect(process.env.Mongodb_URL);

    // Log a success message with the host name of the connected database
    console.log(`Connection made successfully ${conn.connection.host}`);
  } catch (error) {
    // Log an error message if the connection fails
    console.log(`Connection failed ${error}`);
  }
};

// Export the Dbconnection function for use in other modules
export default Dbconnection;
