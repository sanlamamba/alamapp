import mongoose from "mongoose";
const { Schema } = mongoose;

export const lessonSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: "Title is required",
      minlength: [3, "Too short"],
      maxlength: [32, "Too long"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    content: {
      type: {},
      required: true,
      minlength: [20, "Too short"],
      maxlength: [200000, "Too long"],
    },
    video: {
      type: {},
      required: true,
      minlength: [20, "Too short"],
      maxlength: [100000, "Too long"],
    },
    free_preview: {
      type: Boolean,
      default: false,
    },
    course: {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Lesson", lessonSchema);
