const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [1, "Age must be a positive number"],
    },
    semester: {
      type: Number,
      required: [true, "Semester is required"],
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);