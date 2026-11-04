import React from "react";
import { useNavigate } from "react-router-dom";
import "./OnboardingReady.css";

const OnboardingReady = () => {
  const navigate = useNavigate();

  return (
    <div className="onboarding-ready-layout">
      {/* Background Clouds */}
      <div className="bg-clouds"></div>

      {/* Progress Stepper */}
      <div className="progress-container">
        <div className="step completed"><div className="step-circle">1</div><span className="step-label">Welcome</span></div>
        <div className="step-divider completed-divider"></div>
        <div className="step completed"><div className="step-circle">2</div><span className="step-label">Features</span></div>
        <div className="step-divider completed-divider"></div>
        <div className="step completed"><div className="step-circle">3</div><span className="step-label">Your Details</span></div>
        <div className="step-divider completed-divider"></div>
        <div className="step active"><div className="step-circle check">✓</div><span className="step-label">Ready</span></div>
      </div>

      {/* Main Content Card */}
      <div className="ready-card">
        <div className="ready-icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
            <polyline points="2 12 12 17 22 12"></polyline>
            <polyline points="2 17 12 22 22 17"></polyline>
          </svg>
        </div>

        <h1 className="ready-title">
          You're all set, <span className="text-orange">there</span>
        </h1>
        <p className="ready-subtitle">Your Starter Kit is unlocked — 5 tools ready to use.</p>

        <div className="starter-kit-box">
          <p className="kit-label">YOUR STARTER KIT INCLUDES</p>
          <ul className="kit-list">
            <li>
              <span className="check-icon">✓</span> 5 Carousel Scripts
            </li>
            <li>
              <span className="check-icon">✓</span> 10 Instagram Captions
            </li>
            <li>
              <span className="check-icon">✓</span> 1 CapCut Video Template
            </li>
            <li>
              <span className="check-icon">✓</span> 1-Month Notion Content Calendar
            </li>
            <li>
              <span className="check-icon">✓</span> 3 DM Conversion Scripts
            </li>
          </ul>
        </div>

        <button className="enter-dashboard-btn" onClick={() => navigate("/dashboard")}>
          Enter Dashboard &gt;
        </button>
      </div>
    </div>
  );
};

export default OnboardingReady;