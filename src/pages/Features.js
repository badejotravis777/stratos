import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/stratos-logo.png";
import featuresImg from "../assets/features.png"; 
import emailjs from 'emailjs-com'; 
import './Features.css';

// import the 4 block images
import designImg from "../assets/design-tools.png";
import videoImg from "../assets/video-tools.png";
import strategyImg from "../assets/strategy-tools.png";
import supportImg from "../assets/support-tools.png";

import f1 from "../assets/card.png";
import f2 from "../assets/card1.png";
import f3 from "../assets/pricing.png";
import f4 from "../assets/stat.png";

import t1 from "../assets/1.png";
import t2 from "../assets/2.png";
import t3 from "../assets/3.png";
import t4 from "../assets/4.png";
const Features = () => {
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
    <div>
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

          <NavLink to="" className="create-account">Create Account</NavLink>

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


  {/* FEATURES SECTION */}
  <section className="features-section">
        <h2 className="features-title">What Makes Stratos</h2>
        <p className="features-subtitle">
          A balance of smart design and powerful technology built to keep your team moving forward
        </p>

        <div className="features-image-wrapper">
          {/* Desktop image */}
          <img src={featuresImg} alt="Stratos Features" className="features-img desktop-only" />

          {/* Mobile separated images */}
          <div className="features-mobile-images mobile-only">
            <img src={f1} alt="Design Tools" />
            <img src={f2} alt="Video Tools" />
            <img src={f3} alt="Strategy Tools" />
            <img src={f4} alt="Support Tools" />
          </div>
        </div>
      </section>
{/* WHY IT WORKS — each block has its own styling */}
<section className="why-section">
  <h2 className="why-title">Why It Works</h2>
  <p className="why-subtitle">
    Core set of powerful features that grow as the skills do. We
    guarantee it’ll keep innovation moving at pace.
  </p>

  {/* Desktop grid */}
  <div className="why-grid desktop-only">
    {/* BLOCK 1 */}
    <div className="why-row block-1">
      <div className="why-col image-col">
        <img src={designImg} alt="Design Tools" className="why-img img-1" />
      </div>
      <div className="why-col text-col">
        <div className="text-card">
          <h3>Design Tools</h3>
          <p>Bring your ideas to life with easy drag-and-drop templates, customizable brand kits, and ready-for-use assets.</p>
          <ul>
            <li>Create stunning graphics in minutes</li>
            <li>Keep your brand consistent across every project</li>
            <li>No design experience required</li>
          </ul>
        </div>
      </div>
    </div>

    {/* BLOCK 2 */}
    <div className="why-row block-2">
      <div className="why-col text-col">
        <div className="text-card">
          <h3>Video Tools</h3>
          <p>Edit, trim, and enhance your videos without needing pro software — fast templates and social-media ready exports.</p>
          <ul>
            <li>Quick tools to resize and format</li>
            <li>Templates to add captions and transitions</li>
            <li>Collaborate with your team in real-time</li>
          </ul>
        </div>
      </div>
      <div className="why-col image-col">
        <img src={videoImg} alt="Video Tools" className="why-img img-2" />
      </div>
    </div>

    {/* BLOCK 3 */}
    <div className="why-row block-3">
      <div className="why-col image-col">
        <img src={strategyImg} alt="Strategy Tools" className="why-img img-3" />
      </div>
      <div className="why-col text-col">
        <div className="text-card">
          <h3>Strategy Tools</h3>
          <p>Plan smarter with built-in strategy features that keep your content consistent and effective.</p>
          <ul>
            <li>AI-powered insights for optimization</li>
            <li>Smart scheduling to post at the right time</li>
            <li>Campaign planning that grows with your goals</li>
          </ul>
        </div>
      </div>
    </div>

    {/* BLOCK 4 */}
    <div className="why-row block-4">
      <div className="why-col text-col">
        <div className="text-card">
          <h3>Support and Learning</h3>
          <p>Stratos isn’t just tools — it’s a community. Get tutorials, guides, and real support when you need it.</p>
          <ul>
            <li>Step-by-step guides for every feature</li>
            <li>Live chat and community forums</li>
            <li>Tips to help you grow faster</li>
          </ul>
        </div>
      </div>
      <div className="why-col image-col">
        <img src={supportImg} alt="Support and Learning" className="why-img img-4" />
      </div>
    </div>
  </div>

  {/* Mobile stacked images */}
  <div className="why-mobile-images mobile-only">
    <img src={t1} alt="Design Tools" />
    <img src={t2} alt="Video Tools" />
    <img src={t3} alt="Strategy Tools" />
    <img src={t4} alt="Support Tools" />
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
    <NavLink to="/waitlist" className="waitlist-btn">
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

export default Features;
