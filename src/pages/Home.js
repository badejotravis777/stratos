// Home.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import emailjs from 'emailjs-com';   // ✅ import emailjs
import './Home.css';
import logo from '../assets/stratos-logo.png';
import heroImg from '../assets/tool-ui.png';

const Home = () => {
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
    <div className="home">
      {/* Header */}
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

      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <h1 className="hero-title">
            <span className="normal">Create</span>{' '}
            <span className="scale">
              . <strong>Scale</strong> .
            </span>{' '}
            <span className="normal">Dominate</span>
          </h1>
          <p className="hero-subtext">
            A toolkit for growth made for creators, small brands, and African entrepreneurs who want to stand out and scale fast.
          </p>
          <NavLink to="/waitlist" className="waitlist-btn1">
  Join the waitlist
</NavLink>


          <div className="hero-image">
            <img src={heroImg} alt="Stratos UI" />
          </div>
        </div>
      </section>

      {/* Trusted Brands & Tools Section */}
<section className="trusted-section">
  <div className="trusted-container">
    <p className="trusted-title">
      <strong>Trusted by leading brands</strong> worldwide
    </p>

    <div className="brand-logos">
      <img src={require('../assets/brand-logos/sl1.png')} alt="Brand 1" />
      <img src={require('../assets/brand-logos/sl2.png')} alt="Brand 2" />
      <img src={require('../assets/brand-logos/sl3.png')} alt="Brand 3" />
      <img src={require('../assets/brand-logos/sl7.png')} alt="Brand 4" />
      <img src={require('../assets/brand-logos/sl6.png')} alt="Brand 6" />
      <img src={require('../assets/brand-logos/sl4.png')} alt="Brand 7" />
      <img src={require('../assets/brand-logos/sl8.png')} alt="Brand 7" />
      <img src={require('../assets/brand-logos/sl10.png')} alt="Brand 7" />
    </div>
  </div>
</section>


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

   
      <NavLink to="/waitlist" className="waitlist-btn2">
  Join the waitlist
</NavLink>


    </div>

    <div className="better-tools-image">
      <img src={require('../assets/imge.png')} alt="Better Tools" />
    </div>
  </div>
</section>

<section className="testimonials-section">
  <div className="container">
  <h2 className="testimonials-title">Why We Believe in Stratos</h2>

<div className="testimonials-subtitle">
  <span>Our expectations are bold, our vision is clear — Stratos is built to</span>
  <span>empower creators, teams, and brands to grow without limits.</span>
</div>


    <div className="testimonials-grid">
      {/* Left Large Testimonial */}
      <div className="testimonial-card large">
        <p className="quote-mark">❝</p>
        <p className="testimonial-text">
      “At Stratos, our expectation is simple — to empower bold ideas. 
      We believe creators and teams deserve tools that remove the 
      guesswork, so every campaign feels smarter, faster, and more impactful.”
    </p>
        <div className="testimonial-author">
          <img src={require("../assets/Nath.png")} alt="Ayomide Olu-Moji" className="author-img"/>
          <div>
            <p className="author-name">Nathaniel Isaac</p>
            <p className="author-role">Product Manager</p>
          </div>
        </div>
      </div>

      {/* Right Column - Two Stacked Testimonials */}
      <div className="testimonial-side">
        <div className="testimonial-card small">
          <p className="quote-mark">❝</p>
          <p className="testimonial-text">
        “We love Stratos because it’s not just another tool — it’s a partner. 
        It helps us move faster, create with confidence, and focus on the 
        work that truly matters.”
      </p>
          <div className="testimonial-author">
            <img src={require("../assets/Hepzi.png")} alt="Daniel Kim" className="author-img"/>
            <div>
              <p className="author-name">Hepzibah</p>
              <p className="author-role">Product Designer</p>
            </div>
          </div>
        </div>

        <div className="testimonial-card small">
          <p className="quote-mark">❝</p>
          <p className="testimonial-text">
        “Our expectation is growth — not just in numbers, but in creativity, 
        collaboration, and clarity. With Stratos, every step forward feels 
        like a leap toward something bigger.”
      </p>
          <div className="testimonial-author">
            <img src={require("../assets/travis.png")} alt="Samantha Lee" className="author-img"/>
            <div>
              <p className="author-name">Badejo Bosun</p>
              <p className="author-role">Co-Founder</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</section>



{/* PRICING SECTION */}
<section className="pricing-section">
  <h2 className="pricing-title">Plans that grow with you</h2>
  <p className="pricing-subtitle">
    Whether you are just starting out or running an agency. We have got flexible plans to fit your needs and help you scale
  </p>

  <div className="pricing-cards">
    {/* Pro Plan */}
    <div className="pricing-card">
      <img src={require('../assets/icons/bolt.png')} alt="Pro Icon" className="plan-icon-img" />
      <h3>Pro</h3>
      <p className="price">
        $5<span>/month</span>
      </p>
      <ul className="features">
        <li>Caption Generator Access</li>
        <li>Brand Kit Templates</li>
        <li>Monthly Strategy Guide</li>
        <li>Email Support</li>
      </ul>
      <button className="btn btn-primary">Get Started with Pro</button>
    </div>

    {/* Elite Plan */}
    <div className="pricing-card">
      <img src={require('../assets/icons/crown.png')} alt="Elite Icon" className="plan-icon-img" />
      <h3>Elite</h3>
      <p className="price">
        $15<span>/month</span>
      </p>
      <ul className="features">
        <li>Everything in Pro</li>
        <li>Premium Captions Library</li>
        <li>AI Branding Toolkit</li>
        <li>Priority Support</li>
      </ul>
      <button className="btn btn-primary">Get Started with Elite</button>
    </div>

    {/* Agency Plan */}
    <div className="pricing-card highlighted">
      <img src={require('../assets/icons/bulb.png')} alt="Agency Icon" className="plan-icon-img" />
      <h3>Agency</h3>
      <p className="price">
        $20<span>/month</span>
      </p>
      <ul className="features white-dots">
        <li>Everything in Elite</li>
        <li>Team Collaboration Tools</li>
        <li>Custom Strategy Sessions</li>
        <li>1-on-1 Brand Audits</li>
      </ul>
      <button className="btn btn-light">Get Started with Agency</button>
    </div>
  </div>
</section>

{/* Better Tools Section */}
<section className="better-tools">
  <div className="better-tools-content">
    <div className="text-block">
      <h2 className="tools-title">Your brand deserves better tools</h2>
      <p className="tools-subtitle">
  We’re building something bold ready-to-use captions,<br />
  brand kits, and strategy tools tailored for you
</p>


    </div>
    <NavLink to="/waitlist" className="waitlist-btn3">
      Join the waitlist <span className="arrow">→</span>
      </NavLink>
  </div>
  {/* <hr className="tools-divider" /> */}
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

export default Home;
