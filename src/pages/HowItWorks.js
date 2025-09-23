import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import "./HowItWorks.css";
import logo from "../assets/stratos-logo.png";
import FAQ from "../components/FAQ";

// Example images (replace with your actual assets)
import waitlistImg from "../assets/waitlist.png";
import accessImg from "../assets/access.png";
import toolsImg from "../assets/tools.png";
import buildImg from "../assets/build.png";

import emailjs from 'emailjs-com';  



const steps = [
  { title: "Join Waitlist", image: waitlistImg },
  { title: "Get Access", image: accessImg },
  { title: "Pick Tools", image: toolsImg },
  { title: "Start Building", image: buildImg },
];

const HowItWorks = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    // ✅ newsletter states
const [email, setEmail] = useState("");
const [statusMessage, setStatusMessage] = useState("");
const [statusType, setStatusType] = useState(""); // "success" | "error"

const handleSubscribe = (e) => {
  e.preventDefault();

  if (!email) {
    setStatusMessage("Please enter a valid email.");
    setStatusType("error");
    return;
  }

  emailjs
    .send(
      "service_mjcwa2j", // your service ID
      "template_ckay6hf", // template ID
      { to_email: email },
      "d6TDjzKXpICXorApk" // public key
    )
    .then(
      () => {
        setStatusMessage("Thanks for subscribing! 🎉 Check your inbox.");
        setStatusType("success");
        setEmail("");
      },
      (error) => {
        console.error(error);
        setStatusMessage("Something went wrong. Please try again.");
        setStatusType("error");
      }
    );

  // ✅ Auto-hide after 5s
  setTimeout(() => {
    setStatusMessage("");
    setStatusType("");
  }, 5000);
};
  return (
    <div className="howitworks-page">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="navbar-inner">
        <NavLink to="/">
      <img src={logo} alt="Stratos HQ" className="logo" />
    </NavLink>


          <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-active' : ''}>About</NavLink>
            <NavLink to="/features" className={({ isActive }) => isActive ? 'nav-active' : ''}>Features</NavLink>
            <NavLink to="/how-it-works" className={({ isActive }) => isActive ? 'nav-active' : ''}>How It Works</NavLink>
            <NavLink to="/pricing" className={({ isActive }) => isActive ? 'nav-active' : ''}>Pricing</NavLink>
          </nav>

          <NavLink to="/signup" className="create-account">Create Account</NavLink>

          {/* Animated Hamburger */}
          <div
            className={`hamburger ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="howitworks-hero">
        <h2>How Stratos Works</h2>
        <p>
          Stratos HQ brings your workflow into one smart hub. Sign up, pick your
          tools, and start building faster, smarter, and stronger all in one
          place.
        </p>

        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={index} className="step-item">
              {index % 2 === 0 ? (
                <>
                  <div className="step-content">
                    <h4>{step.title}</h4>
                  </div>
                  <div className="step-center">
                    <span className="step-circle"></span>
                    {index !== steps.length - 1 && (
                      <div className="step-line"></div>
                    )}
                  </div>
                  <div className="step-image">
                    <img src={step.image} alt={step.title} />
                  </div>
                </>
              ) : (
                <>
                  <div className="step-image">
                    <img src={step.image} alt={step.title} />
                  </div>
                  <div className="step-center">
                    <span className="step-circle"></span>
                    {index !== steps.length - 1 && (
                      <div className="step-line"></div>
                    )}
                  </div>
                  <div className="step-content">
                    <h4>{step.title}</h4>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

   {/* HOW IT WORKS VIDEO SECTION */}
<section className="howitworks-video">
  <h2>How It Works</h2>
  <div className="video-card">
    <video
      src={require("../assets/startos.mp4")} // your video in assets
      className="video-thumb"
      controls
    //   poster={require("../assets/howitworks-thumb.png")} // optional: fallback thumbnail
    />
  </div>
</section>


{/* FAQ Section */}
<FAQ />


 {/* FOOTER */}
 <footer className="footer">
        <div className="footer-inner container">
          {/* LEFT SIDE */}
          <div className="footer-left">
            <img src={logo} alt="Stratos HQ" className="footer-logo" />

            <p className="footer-desc">
              StratosHQ is your all-in-one toolkit for bold, standout branding.
              Designed to help entrepreneurs, creators, and teams craft smarter
              strategies, stunning captions, and scalable results.
            </p>

            <h4 className="newsletter-title">Subscribe to our newsletter</h4>

            {/* ✅ Real newsletter form */}
            <form className="newsletter-row" onSubmit={handleSubscribe}>
              <input
                type="email"
                className="newsletter-input"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button className="newsletter-arrow" type="submit" aria-label="Subscribe">
                <svg
                  width="18"
                  height="12"
                  viewBox="0 0 18 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 6h14M10 1l6 5-6 5"
                    stroke="#222"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>

            {statusMessage && (
  <div
    className={`newsletter-feedback ${statusType}`}
    role="alert"
  >
    <span className="feedback-icon">
      {statusType === "success" ? "✅" : "⚠️"}
    </span>
    <span className="feedback-message">{statusMessage}</span>
  </div>
)}



            <div className="footer-socials">
              <a href="https://www.instagram.com/stratoshq?igsh=emk3b3Y4YTRqOWxy&utm_source=qr" className="social-circle" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.linkedin.com/company/stratos-hq/" className="social-circle" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://tiktok.com" className="social-circle" aria-label="TikTok">
                <i className="fab fa-tiktok"></i>
              </a>
            </div>

            <p className="footer-copyright">
              © {new Date().getFullYear()} StratosHQ. All Rights Reserved.
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="footer-right">
            <nav className="footer-links">
              <a href="/about">About</a>
              <a href="/features">Features</a>
              <a href="/how-it-works">How It Works</a>
              <a href="/pricing">Pricing</a>
            </nav>

            <div className="footer-contacts">
              <div className="contact-block">
                <p className="contact-title">Contact Us</p>
                <p className="contact-line">+234 912 843 00714</p>
                <p className="contact-line">Stratoshqapp@gmail.com</p>
              </div>

              <div className="contact-block">
                <p className="contact-title">Location</p>
                <p className="contact-line">Lagos, Nigeria</p>
                <p className="contact-line">Lagos</p>
              </div>
            </div>
          </div>
        </div>
      </footer>


    </div>
  );
};

export default HowItWorks;
