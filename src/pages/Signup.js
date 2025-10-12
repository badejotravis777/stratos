import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";
import signupImage from "../assets/signup-bg.png";
import uploadIcon from "../assets/upload-icon.png"; // 👈 import the image
import { FiEye, FiEyeOff } from "react-icons/fi";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    industry: "",
    agree: false,
  });
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
        await axios.post("http://localhost:5000/api/signup", {

        ...formData,
        profilePic,
      });
      setSuccessMsg("Account created successfully!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      {/* LEFT SIDE */}
      <div className="signup-left">
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="title-section">
            <h2>Create Your Account</h2>
            <p className="subtitle">Please fill in your details below</p>
          </div>

          {/* Upload Icon / Preview */}
          <label htmlFor="profileUpload" className="upload-icon" aria-label="Upload profile">
            {profilePic ? (
              <img src={profilePic} alt="Profile" />
            ) : (
              <img src={uploadIcon} alt="Upload Icon" className="upload-image" />
            )}
          </label>

          <input
            type="file"
            id="profileUpload"
            accept="image/*"
            className="upload-input"
            onChange={handleImageChange}
          />

          {/* Rest of your form... */}
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
          />

          {/* Password */}
          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter a password"
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FiEyeOff className="password-icon" />
              ) : (
                <FiEye className="password-icon" />
              )}
            </span>
          </div>

          {/* Industry */}
          <label>Industry</label>
          <div className="select-wrapper">
            <select
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              required
            >
              <option value="">What industry are you in?</option>
              <option value="Tech">Tech</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Checkbox */}
          <div className="checkbox-row">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              required
            />
            <label className="terms-label">
              I agree to the <span>Terms and Conditions</span>
            </label>
          </div>

          {errorMsg && <p className="error-msg">{errorMsg}</p>}
          {successMsg && <p className="success-msg">{successMsg}</p>}

          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          <p className="login-text">
            Already have an account? <NavLink to="/login">Log In</NavLink>
          </p>
        </form>
      </div>

      {/* RIGHT SIDE */}
      <div className="signup-right">
        <img src={signupImage} alt="Signup" />
      </div>
    </div>
  );
};

export default Signup;
