import mongoose from "mongoose";
import { lessonSchema } from "./lesson";
const { Schema } = mongoose;

const courseSchema = new Schema(
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
    description: {
      type: {},
      minlength: 200,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
    },
    category: String,
    published: {
      type: Boolean,
      default: false,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // lessons sorted object of lessons
    lessons: [lessonSchema],
    registered: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Course", courseSchema);
