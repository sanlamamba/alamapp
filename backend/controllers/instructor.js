import User from "../models/user";
import { hashPassword, comparePassword } from "../utils/auth/auth";
import jwt from "jsonwebtoken";
import Course from "../models/course";

export const becomeInstructor = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id })
      .select("-password")
      .exec();
    console.log(user);
    if (user.role.includes("Instructor")) {
      return res.status(400).json({
        message: "You are already an instructor",
      });
    }
    user.role.push("Instructor");
    await user.save();
    // destroy and  create token for user
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
    });
    res.status(200).json({
      message: "You are now an instructor",
      user,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Error creating instructor, please try again",
    });
  }
};

export const currentInstructor = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user._id })
      .select("-password")
      .exec();
    if (!user.role.includes("Instructor")) {
      return res.status(400).json({
        message: "You are not an instructor",
      });
    }
    return res.status(200).json({
      message: "You are an instructor",
      user,
    });
  } catch (err) {
    console.log(err);
  }
};

export const instructorCourses = async (req, res) => {
  try{
    const courses = await Course.find({ instructor: req.user._id })
      .sort({ createdAt: -1 }).exec();
    return res.status(200).json({
      message: `${courses.length} courses found`,
      count : courses.length,
      courses,
    });
  }catch (err) {
    res.status(500).json({
      message: "Error getting courses",
      error: err,
    });
  }
}