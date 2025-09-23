import React, { useState } from "react";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom"; 
import "./Waitlist.css";
import logo from "../assets/stratos-logo.png";
import heroImage from "../assets/waitlist-image.png";
import successImg from "../assets/waitlist-image.png"; 

const Waitlist = () => {
  const [industry, setIndustry] = useState("");
  const [customIndustry, setCustomIndustry] = useState("");
  const [stage, setStage] = useState("");
  const [customStage, setCustomStage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_mjcwa2j", // ✅ your EmailJS service ID
        "template_gby2nre", // ✅ your EmailJS template ID
        e.target,
        "d6TDjzKXpICXorApk" // ✅ your EmailJS public key
      )
      .then(
        (result) => {
          setSubmitted(true); // ✅ show success screen
          setTimeout(() => navigate("/"), 7000); // ✅ redirect after 7s
        },
        (error) => {
          alert("❌ Something went wrong. Please try again.");
          console.error(error);
        }
      );
  };

  if (submitted) {
    // ✅ Success screen after form submit
    return (
      <div className="success-screen">
        <div className="success-left">
          <div className="check-icon">✔️</div>
          <h2>You’ve been added</h2>
          <p>
            Stay tuned, follow us on social media for updates, sneak peeks,
            and early access.
          </p>
          <div className="social-icons">
            <a href="j"><i className="fab fa-instagram"></i></a>
            <a href="ik"><i className="fab fa-tiktok"></i></a>
            <a href="n"><i className="fab fa-x-twitter"></i></a>
          </div>
        </div>
        <div className="success-right">
          <img src={successImg} alt="Success" />
        </div>
      </div>
    );
  }

  return (
    <div className="waitlist-page">
      <div className="waitlist-left">
        <img src={logo} alt="Stratos HQ" className="waitlist-logo" />

        <h1>Smarter Content, Faster Growth</h1>
        <p>
          Stratos is a new tool designed for creators <br />
          to enhance their productivity and creativity.
        </p>

        {/* FORM */}
        <form className="waitlist-form" onSubmit={sendEmail}>
          {/* NAME + EMAIL */}
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="from_name"   // ✅ matches {{from_name}}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="from_email"  // ✅ matches {{from_email}}
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>

          {/* INDUSTRY */}
          <div className="form-group">
          <label>What industry are you in?</label>
  <select
    value={industry}
    onChange={(e) => setIndustry(e.target.value)}
    required
  >
    <option value="">Select One</option>
    <option>Advertising & Marketing</option>
    <option>Aerospace & Defense</option>
    <option>Agriculture</option>
    <option>Automotive</option>
    <option>Biotechnology</option>
    <option>Construction & Real Estate</option>
    <option>Consumer Goods</option>
    <option>Design & Creative</option>
    <option>Education</option>
    <option>Energy & Utilities</option>
    <option>Entertainment & Media</option>
    <option>Finance & Banking</option>
    <option>Government & Public Sector</option>
    <option>Healthcare & Medical</option>
    <option>Hospitality & Travel</option>
    <option>Information Technology (IT)</option>
    <option>Insurance</option>
    <option>Legal Services</option>
    <option>Logistics & Transportation</option>
    <option>Manufacturing</option>
    <option>Mining & Metals</option>
    <option>Nonprofit & NGOs</option>
    <option>Pharmaceuticals</option>
    <option>Professional Services</option>
    <option>Retail & E-Commerce</option>
    <option>Science & Research</option>
    <option>Sports & Recreation</option>
    <option>Telecommunications</option>
    <option>Textiles & Apparel</option>
    <option>Technology (Software & Hardware)</option>
    <option value="Other">Other</option>
  </select>

  {industry === "Other" && (
    <input
      type="text"
      name="industry"   // 👈 always "industry"
      placeholder="Please specify your industry"
      value={customIndustry}
      onChange={(e) => setCustomIndustry(e.target.value)}
      className="custom-input"
      required
    />
  )}

  {industry !== "Other" && (
    <input type="hidden" name="industry" value={industry} />
  )}
</div>

{/* STAGE */}
<div className="form-group">
  <label>What stage are you at?</label>
  <select
    value={stage}
    onChange={(e) => setStage(e.target.value)}
    required
  >
    <option value="">Select One</option>
    <option>Idea Stage</option>
    <option>Pre-Seed</option>
    <option>Seed</option>
    <option>Early Stage</option>
    <option>Growth Stage</option>
    <option>Scaling</option>
    <option>Established</option>
    <option>Expansion</option>
    <option>Mature / Enterprise</option>
    <option value="Other">Other</option>
  </select>

  {stage === "Other" && (
    <input
      type="text"
      name="stage"   // 👈 always "stage"
      placeholder="Please specify your stage"
      value={customStage}
      onChange={(e) => setCustomStage(e.target.value)}
      className="custom-input"
      required
    />
  )}

  {stage !== "Other" && (
    <input type="hidden" name="stage" value={stage} />
  )}
          </div>

          {/* EXPECTATION */}
          <div className="form-group">
            <label>What do you expect from Stratos HQ?</label>
            <input
              type="text"
              name="expectation"  // ✅ matches {{expectation}}
              placeholder="It could be a feature or an addition..."
            />
          </div>

          <button type="submit" className="join-btn">
            Join Now
          </button>
        </form>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="waitlist-right">
        <img src={heroImage} alt="Waitlist Hero" className="waitlist-image" />
      </div>
    </div>
  );
};

export default Waitlist;
