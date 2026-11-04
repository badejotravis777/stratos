import React from "react";
import { useNavigate } from "react-router-dom";
import "./Onboarding.css";
import logo from "../assets/stratos-logo.png"; // Ensure this matches your logo path

const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <div className="onboarding-layout">
      
      {/* Progress Stepper */}
      <div className="progress-container">
        <div className="step active">
          <div className="step-circle">1</div>
          <span className="step-label">Welcome</span>
        </div>
        <div className="step-divider"></div>
        <div className="step">
          <div className="step-circle">2</div>
          <span className="step-label">Features</span>
        </div>
        <div className="step-divider"></div>
        <div className="step">
          <div className="step-circle">3</div>
          <span className="step-label">Your Details</span>
        </div>
        <div className="step-divider"></div>
        <div className="step">
          <div className="step-circle">✓</div>
          <span className="step-label">Ready</span>
        </div>
      </div>

      {/* Main Card */}
      <div className="onboarding-card">
        <h1 className="welcome-title">
          Welcome to <img src={logo} alt="Stratos HQ" className="inline-logo" />
        </h1>
        <p className="welcome-subtitle">
          Your toolkit for content creating, planning and growing without stress
        </p>
        <button 
          className="get-started-btn" 
          onClick={() => navigate("/onboarding-features")} // Adjust next route as needed
        >
          Get Started &gt;
        </button>
      </div>

    </div>
  );
};

export default Onboarding;