import User from "../models/user";
import { hashPassword, comparePassword } from "../utils/auth/auth";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }
    const userExists = await User.findOne({ email }).exec();
    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Error creating user, please try again",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }
    const userExists = await User.findOne({ email }).exec();
    if (!userExists) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }
    const isPasswordValid = await comparePassword(
      password,
      userExists.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }
    const token = jwt.sign(
      {
        _id: userExists._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    userExists.password = undefined;
    res.cookie("token", token, {
      httpOnly: true,
    });
    res.status(200).json({
      message: "User logged in successfully",
      user: userExists,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Error logging in user, please try again",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({
      message: "Logged out successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Error logging out user, please try again",
    });
  }
};

export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password").exec();
    // console.log("current user", user);
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Error getting current user, please try again",
    });
  }
};
