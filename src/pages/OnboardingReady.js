import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OnboardingReady.css";
import { useAuth } from "../context/AuthContext";
import { fetchStarterKit } from "../lib/starterKit";

const OnboardingReady = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [kit, setKit] = useState(null); // null while loading

  const firstName = profile?.first_name || "there";
  const nicheName = profile?.niches?.name;

  useEffect(() => {
    let cancelled = false;
    fetchStarterKit(profile?.niche_id).then((tools) => {
      if (!cancelled) setKit(tools);
    });
    return () => {
      cancelled = true;
    };
  }, [profile?.niche_id]);

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
          You're all set, <span className="text-orange">{firstName}</span>
        </h1>
        <p className="ready-subtitle">
          {kit && kit.length > 0
            ? `Your ${nicheName ? `${nicheName} ` : ""}Starter Kit is unlocked. ${kit.length} tool${kit.length === 1 ? "" : "s"} ready to use.`
            : "Your 30-day plan is ready. Day 1 starts today."}
        </p>

        <div className="starter-kit-box">
          <p className="kit-label">YOUR STARTER KIT INCLUDES</p>
          <ul className="kit-list">
            {kit === null ? (
              <li className="kit-loading">Loading your kit…</li>
            ) : kit.length > 0 ? (
              kit.map((tool) => (
                <li key={tool.id}>
                  <span className="check-icon">✓</span> {tool.title}
                </li>
              ))
            ) : (
              <>
                <li><span className="check-icon">✓</span> A 30-day growth plan for your niche</li>
                <li><span className="check-icon">✓</span> Daily tasks with step-by-step checklists</li>
                <li><span className="check-icon">✓</span> Templates, captions and scripts as they launch</li>
              </>
            )}
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