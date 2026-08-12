import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/nlogo.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/">
          <img src={logo} alt="Stratos HQ" className="logo" />
        </NavLink>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#toolkit" className="nav-link" onClick={closeMenu}>The Toolkit</a>
          <a href="#how-it-works" className="nav-link" onClick={closeMenu}>How It Works</a>
          <a href="#about" className="nav-link" onClick={closeMenu}>Who It's For</a>
        </nav>

        <div className="navbar-actions">
          <NavLink to="/login" className="login-link">Log In</NavLink>
          <NavLink to="/waitlist" className="join-btn">Join Waitlist</NavLink>
        </div>

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
  );
};

export default Navbar;