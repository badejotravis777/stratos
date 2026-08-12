import React, { useState } from "react";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom"; 
import "./Waitlist.css";
import logo from "../assets/stratos-logo.png"; 

const Waitlist = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    emailjs
      .sendForm(
        "service_ueib6xh", 
        "template_gby2nre", 
        e.target,
        "d6TDjzKXpICXorApk" 
      )
      .then(
        (result) => {
          alert("Your request for early access has been submitted successfully.");
          navigate("/"); 
        },
        (error) => {
          setIsSubmitting(false);
          console.error("EmailJS Error Details:", error);
          alert(`Error: ${error.text || JSON.stringify(error)}`);
        }
      );
  };

  return (
    <div className="waitlist-layout">
      <button className="back-btn" onClick={() => navigate(-1)}>
        &lt; Back
      </button>
      
      <div className="waitlist-card">
        <img src={logo} alt="Stratos HQ" className="card-logo" />
        
        <div className="early-access-badge">
          {/* Professional SVG Star Icon */}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#EA580C" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
          </svg>
          EARLY ACCESS - LIMITED SPOTS
        </div>
        
        <h1 className="card-title">One place to plan,<br />create, and grow.</h1>
        <p className="card-desc">
          Stratos is launching soon. Get in early and shape the product plus lock in founding member pricing.
        </p>

        <form className="waitlist-form-simple" onSubmit={sendEmail}>
          <div className="input-wrapper">
            {/* Professional SVG Envelope Icon */}
            <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <input
              type="email"
              name="from_email" 
              placeholder="your@email.com"
              required
            />
          </div>
          
          <input type="hidden" name="from_name" value="Waitlist User" />
          <input type="hidden" name="industry" value="N/A" />
          <input type="hidden" name="stage" value="N/A" />
          <input type="hidden" name="expectation" value="N/A" />

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Get early access →"}
          </button>
        </form>
        
        <p className="no-spam">No spam. Unsubscribe anytime.</p>
        
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