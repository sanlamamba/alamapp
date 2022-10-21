import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      min: 6,
      max: 64,
    },
    picture: {
      type: String,
      default: "/avatar_default.jpg",
    },
    role: {
      type: [String],
      default: ["Subscriber"],
      enum: ["Subscriber", "Instructor", "Admin"],
    },
    stripe_account_id: "",
    strip_seller: {},
    stripeSession: {},
    course_progress: [
      {
        courseId: String,
        lessons: [
          {
            lessonId: String,
            completed: Boolean,
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
