import mongoose from "mongoose";

const UserProfileSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, 
  fullName: { type: String, required: true },
  role: { type: String, required: true },
  niche: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("UserProfile", UserProfileSchema);