import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Waitlist.css";
import logo from "../assets/stratos-logo.png";
import { joinWaitlist, EMAIL_PATTERN } from "../lib/waitlist";

const Waitlist = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = email.trim();

    if (!EMAIL_PATTERN.test(value)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const { alreadyJoined } = await joinWaitlist(value, "Waitlist page");
      setStatus("success");
      setMessage(
        alreadyJoined
          ? "You're already on the list. We'll email you the moment your spot opens."
          : "You're in! We'll email you the moment your spot opens."
      );
    } catch (err) {
      console.error("Waitlist signup failed", err);
      setStatus("error");
      setMessage("Something went wrong on our side. Please try again in a moment.");
    }
  };

  return (
    <div className="waitlist-layout">
      <button className="back-btn" onClick={() => navigate(-1)}>
        &lt; Back
      </button>

      <div className="waitlist-card">
        <img src={logo} alt="Stratos HQ" className="card-logo" />

        <div className="early-access-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#EA580C" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
          </svg>
          EARLY ACCESS - LIMITED SPOTS
        </div>

        <h1 className="card-title">One place to plan,<br />create, and grow.</h1>
        <p className="card-desc">
          Stratos is launching soon. Get in early and shape the product plus lock in founding member pricing.
        </p>

        {status === "success" ? (
          <div className="waitlist-success" role="status">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <p>{message}</p>
            <button type="button" className="submit-btn" onClick={() => navigate("/")}>
              Back to home
            </button>
          </div>
        ) : (
          <form className="waitlist-form-simple" onSubmit={handleSubmit} noValidate>
            <div className="input-wrapper">
              <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <label htmlFor="waitlist-email" className="visually-hidden">Email address</label>
              <input
                id="waitlist-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                aria-invalid={status === "error"}
                aria-describedby="waitlist-msg"
                disabled={status === "loading"}
                required
              />
            </div>

            <button type="submit" className="submit-btn" disabled={status === "loading"}>
              {status === "loading" ? "Submitting..." : "Get early access →"}
            </button>
          </form>
        )}

        <p id="waitlist-msg" className={`no-spam${status === "error" ? " is-error" : ""}`} aria-live="polite">
          {status === "error" ? message : status === "success" ? "" : "No spam. Unsubscribe anytime."}
        </p>

        <div className="social-proof">
          <div className="avatars">
            <div className="avatar a1">A</div>
            <div className="avatar a2">D</div>
            <div className="avatar a3">M</div>
            <div className="avatar a4">J</div>
          </div>
          <span className="proof-text"><strong>423 creators</strong> already waiting</span>
        </div>
      </div>

      <div className="bg-clouds"></div>
    </div>
  );
};

export default Waitlist;
