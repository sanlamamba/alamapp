import mongoose from "mongoose";
const { Schema } = mongoose;

export const lessonSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      minlength: 3,
      maxLength: 320,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    content: {
      type: {},
      minlength: 200,
    },
    video: {
      type: String,
      required: true,
      minlength: 3,
      maxLength: 320,
      trim: true,
    },
    free_preview: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
