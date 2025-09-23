import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import "./About.css";
import logo from "../assets/stratos-logo.png";
import aboutImg from "../assets/about-image.jpg";
import emailjs from 'emailjs-com'; 

// import your icons directly (these are the 3 blobs/icons you exported from Figma)
import visionIcon from "../assets/vision-icon.png";
import missionIcon from "../assets/mission-icon.png";
import valuesIcon from "../assets/values-icon.png";

const About = () => {
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
    <div className="about-page">
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

      <main className="about-container">
        {/* Left column: heading */}
        <div className="about-left">
          <h1 className="about-heading">
            <span className="strong">Our Story:</span>{" "}
            <span className="muted">The Journey</span>
            <br />
            <span className="muted">That’s Shaped </span>
            <span className="accent">Our Success</span>
          </h1>
        </div>

        <div className="visual-row">
  {/* Desktop image */}
  <div className="about-visual desktop-only">
    <img src={aboutImg} alt="About visual" className="about-photo" />
  </div>

  {/* Mobile-friendly portrait image */}
  <div className="about-visual mobile-only">
    <img src={require("../assets/about-image-mobile.jpg")} alt="About mobile" className="about-photo" />
  </div>

  <div className="about-copy-right">
    <p className="about-copy-line">At Stratos HQ, we empower</p>
    <p className="about-copy-line">businesses with innovative digital</p>
    <p className="about-copy-line">solutions that scale.</p>
  </div>
</div>


        {/* WHO WE ARE SECTION */}
        <section className="who-we-are">
          <h2 className="who-heading">Who We Are</h2>
          <p className="who-subtitle">
            some actual important text that’s gonna be the subtitle but we gotta make it long 
            because it has to be long you get me
          </p>

          <div className="who-grid">
  <div className="who-item">
    <div className="who-icon">
      <img src={visionIcon} alt="Vision Icon" />
    </div>
    <h3 className="who-title">Vision</h3>
    <p className="who-text">
      At Stratos HQ, our vision is to become a global leader in shaping the
      future of digital experiences where creativity meets strategy, and
      innovation powers growth.
    </p>
  </div>

  <div className="who-item">
    <div className="who-icon">
      <img src={missionIcon} alt="Mission Icon" />
    </div>
    <h3 className="who-title">Mission</h3>
    <p className="who-text">
      Our mission is to deliver smart, scalable, and human-centered digital
      solutions that help businesses thrive and build lasting impact in a
      fast-changing world.
    </p>
  </div>

  <div className="who-item">
    <div className="who-icon">
      <img src={valuesIcon} alt="Values Icon" />
    </div>
    <h3 className="who-title">Values</h3>
    <p className="who-text">
      We believe in the power of simplicity to cut through complexity, innovation
      to stay ahead of the curve, and empathy to design with real people in mind.
    </p>
  </div>
</div>
    </section>
    <section className="who-we-serve">
  <h2 className="serve-heading">Who We Serve</h2>
  <p className="serve-subtitle">
    some actual important text that's gonna be the subtitle but we gotta make it long
    because it has to be long you get me
  </p>

  <div className="serve-images">

    {/* Desktop images (wide banners) */}
    <img
      src={require("../assets/content-creators.png")}
      alt="Content Creators"
      className="serve-img desktop-only"
    />
    <img
      src={require("../assets/entrepreneurs.png")}
      alt="Entrepreneurs"
      className="serve-img desktop-only"
    />
    <img
      src={require("../assets/marketing-teams.png")}
      alt="Marketing Teams"
      className="serve-img desktop-only"
    />

    {/* Mobile images (stacked cards with text overlay) */}
    <img
      src={require("../assets/mobile-content-creators.png")}
      alt="Content Creators"
      className="serve-img mobile-only"
    />
    <img
      src={require("../assets/mobile-entrepreneurs.png")}
      alt="Entrepreneurs"
      className="serve-img mobile-only"
    />
    <img
      src={require("../assets/mobile-marketing-teams.png")}
      alt="Marketing Teams"
      className="serve-img mobile-only"
    />

  </div>
</section>

      </main>


    {/* Better Tools Section */}
    <section className="better-tools">
  <div className="better-tools-inner container">
    <div className="better-tools-text">
      <h2>
        Your Brand Deserves <br />
        Better Tools
      </h2>
      <p>
        We’re building something bold, ready to use. <br />
        captions, brand kits, and strategy tools <br />
        <strong>for you.</strong>
      </p>
      <NavLink to="/waitlist" className="waitlist-btn outline">
  Join the waitlist
</NavLink>

    </div>

    <div className="better-tools-image">
      <img src={require('../assets/imge.png')} alt="Better Tools" />
    </div>
  </div>
</section>


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

export default About;
