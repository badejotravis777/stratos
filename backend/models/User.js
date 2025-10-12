import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    industry: { type: String },
    profilePic: { type: String }, 
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
