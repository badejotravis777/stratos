import React from "react";
import { useNavigate } from "react-router-dom";
import "./OnboardingFeatures.css";

const OnboardingFeatures = () => {
  const navigate = useNavigate();

  return (
    <div className="onboarding-features-layout">
      {/* Background Clouds */}
      <div className="bg-clouds"></div>

      {/* Progress Stepper */}
      <div className="progress-container">
        <div className="step completed">
          <div className="step-circle">1</div>
          <span className="step-label">Welcome</span>
        </div>
        
        <div className="step-divider completed-divider"></div>
        
        <div className="step active">
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
      <div className="features-card">
        <h1 className="features-title">
          Everything you need for<br />
          <span className="text-orange">content creation</span>
        </h1>
        <p className="features-subtitle">
          Four tools. One focused workspace.
        </p>

        <div className="features-grid">
          {/* Content Tools */}
          <div className="feature-item">
            <div className="feature-icon-wrapper">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
            </div>
            <h3>Content Tools</h3>
            <p>Captions, scripts and voiceovers that convert.</p>
          </div>

          {/* Design Tools */}
          <div className="feature-item">
            <div className="feature-icon-wrapper">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </div>
            <h3>Design Tools</h3>
            <p>Canva templates and brand kits at your fingertips.</p>
          </div>

          {/* Strategy Tools */}
          <div className="feature-item">
            <div className="feature-icon-wrapper">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
            <h3>Strategy Tools</h3>
            <p>Content calendars, campaigns and trend alerts.</p>
          </div>

          {/* Brand Tools */}
          <div className="feature-item">
            <div className="feature-icon-wrapper">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </div>
            <h3>Brand Tools</h3>
            <p>Voice builders, moodboards and client templates.</p>
          </div>
        </div>

        <button 
          className="continue-btn" 
          onClick={() => navigate("/onboarding-details")} 
        >
          Continue &gt;
        </button>
      </div>
    </div>
  );
};

export default OnboardingFeatures;