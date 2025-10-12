import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import loginImage from "../assets/login-bg.png"; // same style image
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
        await axios.post("http://localhost:5000/api/login",formData);
      setSuccessMsg("Login successful!");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Invalid credentials. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* LEFT SIDE */}
      <div className="login-left">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="title-section">
            <h2>Welcome Back</h2>
            <p className="subtitle">Please fill in your details below</p>
          </div>

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
          />

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

          {errorMsg && <p className="error-msg">{errorMsg}</p>}
          {successMsg && <p className="success-msg">{successMsg}</p>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>

          <p className="signup-text">
            You don’t have an account? <NavLink to="/signup">Sign Up</NavLink>
          </p>
        </form>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">
        <img src={loginImage} alt="Login" />
      </div>
    </div>
  );
};

export default Login;
