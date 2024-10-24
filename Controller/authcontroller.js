import UserModel from "../UserModel.js"; // Import the User model
import { hashPassword, comparepassword } from "../authhelper.js"; // Import helper functions for password hashing and comparison
import JWT from "jsonwebtoken"; // Import JWT for creating JSON web tokens

// Controller for user registration
export const registerController = async (req, res) => {
  try {
    // Destructure user details from request body
    const { name, email, password, Phone, address, answer } = req.body;

    // Validate required fields
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!Phone) {
      return res.send({ message: "Phone is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }

    // Check if user already exists
    const existuser = await UserModel.findOne({ email });
    if (existuser) {
      return res.status(200).send({
        success: false,
        message: "Already registered, please login",
      });
    }

    // Hash the password and create a new user
    const Hasedpassword = await hashPassword(password);
    const user = await new UserModel({
      name,
      email,
      Phone,
      address,
      password: Hasedpassword,
      answer,
    }).save();

    // Send success response
    res.status(201).send({
      success: true,
      message: "User added successfully",
      user,
    });
  } catch (error) {
    console.log(error); // Log error for debugging
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

// Controller for user login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Find user by email
    const user = await UserModel.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    // Compare passwords
    const match = await comparepassword(password, user.password);

    // Check if passwords match
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    // Create a JWT token for the user
    const token = await JWT.sign({ _id: user.id }, process.env.jwt_secretkey, {
      expiresIn: "1d",
    });

    // Send success response with user details and token
    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        id: user._id,
        name: user.name,
        Phone: user.Phone,
        email: user.email,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    // Send error response if login fails
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

// Controller for password reset
export const forgetPasswordController = async (req, res) => {
  try {
    const { email, answer, newpassword } = req.body;

    // Validate required fields
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "Answer is required" });
    }
    if (!newpassword) {
      res.status(400).send({ message: "New password is required" });
    }

    // Find user by email and security answer
    const user = await UserModel.findOne({ email, answer });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Wrong email or answer",
      });
    }

    // Hash the new password and update the user
    const hashed = await hashPassword(newpassword);
    await UserModel.findByIdAndUpdate(user._id, { password: hashed });

    // Send success response
    return res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error); // Log error for debugging
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

// Controller for updating user profile
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, Phone } = req.body;

    // Find user by email
    const user = await UserModel.findOne({ email });

    // Validate password length if provided
    if (password && password.length < 6) {
      return res.json({
        error: "Password is required and must be at least 6 characters long",
      });
    }

    // Hash the password if provided
    const hashedPassword = password ? await hashPassword(password) : undefined;

    // Update user profile with new data or retain existing data
    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        Phone: Phone || user.Phone,
        address: address || user.address,
      },
      { new: true }
    );

    // Send success response with updated user
    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error); // Log error for debugging
    res.status(400).send({
      success: false,
      message: "Error While Updating profile",
      error,
    });
  }
};
