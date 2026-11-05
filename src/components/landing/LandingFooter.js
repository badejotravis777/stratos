import React from 'react';
import { Link } from 'react-router-dom';
import { LuMail } from 'react-icons/lu';
import { FaWhatsapp } from 'react-icons/fa6';
import logo from '../../assets/nlogo.png';
import './LandingFooter.css';

const LandingFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="lp-footer">
      <div className="lp-container">
        <div className="lp-footer-top">
          <div className="lp-footer-brand">
            <Link to="/" aria-label="Stratos HQ home">
              <img src={logo} alt="Stratos HQ" width="138" height="30" />
            </Link>
            <p>
              Building the future of branding in Africa. Simple, smart and scalable.
            </p>
          </div>

          <nav className="lp-footer-cols" aria-label="Footer">
            <div>
              <h3>Product</h3>
              <ul>
                <li><a href="#toolkit">Toolkit</a></li>
                <li><a href="#how-it-works">How it works</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#roadmap">Roadmap</a></li>
              </ul>
            </div>
            <div>
              <h3>Company</h3>
              <ul>
                <li><a href="#story">Our story</a></li>
                <li><a href="#team">Team</a></li>
                <li><a href="#who">Who it's for</a></li>
              </ul>
            </div>
            <div>
              <h3>Get in touch</h3>
              <ul>
                <li>
                  <a href="mailto:hello@stratoshqapp.com"><LuMail aria-hidden="true" /> hello@stratoshqapp.com</a>
                </li>
                <li>
                  <a href="https://wa.me/2349128430714" target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp aria-hidden="true" /> WhatsApp
                  </a>
                </li>
                <li><Link to="/login">Log in</Link></li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="lp-footer-bottom">
          <p>© {year} Novalith Marketing. All rights reserved.</p>
          <p>Made for Africa's creators and small businesses.</p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
