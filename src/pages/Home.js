// Home.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import emailjs from 'emailjs-com';   // ✅ import emailjs
import './Home.css';
import Navbar from '../components/Navbar';
import logo from '../assets/flogo.png';


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
    <Navbar />

{/* Hero Section */}
<section className="hero">
  <div className="container hero-content">
    <div className="hero-badge">
      <span className="badge-dot"></span> Africa's toolkit for brand growth
    </div>

    <h1 className="hero-title">
  Brand growth <br />
  shouldn't <br />
  be a <span className="highlight">luxury.</span>
</h1>
    <p className="hero-subtext">
      Stratos gives creators and small brands the exact assets top brands use to plan, create, and grow. All in one simple toolkit.
    </p>

    <div className="hero-buttons">
      <NavLink to="/waitlist" className="waitlist-btn1">
        Join Waitlist <span className="arrow">→</span>
      </NavLink>
      <NavLink to="how-it-works" className="hero-btn-secondary">
        <span className="play-icon">▶</span> See How It Works
      </NavLink>
    </div>
    <div className="hero-tools-grid">
  {/* Caption Vault */}
  <div className="tool-card">
    <div className="tool-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    </div>
    <h3 className="tool-title">Caption Vault</h3>
    <p className="tool-desc">Ready-to-use captions for every post type, niche, and platform.</p>

    <div className="tool-preview caption-preview">
      <div className="preview-line">
        <span className="tag tt">TT</span>
        <span>Lagos creator starter pack. Save this.</span>
      </div>
      <div className="preview-line">
        <span className="tag ig">IG</span>
        <span>The secret to consistent posts? Steal this...</span>
      </div>
      <div className="preview-line">
        <span className="tag tt">TT</span>
        <span>Lagos creator starter pack. Save this.</span>
      </div>
      <div className="preview-line">
        <span className="tag x">X</span>
        <span>You don't need more ideas. You need a...</span>
      </div>
    </div>

    <NavLink to="/features" className="tool-cta">Explore <span className="arrow">→</span></NavLink>
  </div>

  {/* Carousel Template */}
  <div className="tool-card">
    <span className="tool-badge">Popular</span>
    <div className="tool-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    </div>
    <h3 className="tool-title">Carousel Template</h3>
    <p className="tool-desc">Plug-and-play carousel layouts that actually convert.</p>

    <div className="tool-preview carousel-preview">
      <div className="before-after">
        <div className="ba-col">
          <span className="ba-label">BEFORE</span>
          <p>"Check out my new collection"</p>
          <span className="ba-stat">4 saves · 12 likes</span>
        </div>
        <div className="ba-col">
          <span className="ba-label">AFTER</span>
          <p>"Rate my fit 1–10 👀"</p>
          <span className="ba-stat highlight">847 saves · 3x reach</span>
        </div>
      </div>
    </div>

    <NavLink to="/features" className="tool-cta">Use Template <span className="arrow">→</span></NavLink>
  </div>

  {/* Content Calendar */}
  <div className="tool-card">
    <div className="tool-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    </div>
    <h3 className="tool-title">Content Calendar</h3>
    <p className="tool-desc">Plan a month of content in one view. Never miss a drop.</p>

    <div className="tool-preview calendar-preview">
  <span className="cal-month">June 2026</span>
  <div className="cal-grid">
    {[
      { day: 28, muted: true }, { day: 29, muted: true }, { day: 30, muted: true },
      { day: 1 }, { day: 2 }, { day: 3 }, { day: 4 },
      { day: 5 }, { day: 6 }, { day: 7 }, { day: 8 }, { day: 9 }, { day: 10 }, { day: 11 },
      { day: 12 }, { day: 13, active: true }, { day: 14 }, { day: 15 }, { day: 16 }, { day: 17 }, { day: 18 },
      { day: 19 }, { day: 20 }, { day: 21 }, { day: 22 }, { day: 23 }, { day: 24 }, { day: 25 },
      { day: 26 }, { day: 27 }, { day: 28 }, { day: 29 }, { day: 30 }, { day: 1, muted: true }, { day: 2, muted: true },
    ].map((cell, i) => (
      <span key={i} className={`cal-day ${cell.active ? 'active' : ''} ${cell.muted ? 'muted' : ''}`}>
        {cell.day}
      </span>
    ))}
  </div>
</div>

    <NavLink to="/features" className="tool-cta">Open Calendar <span className="arrow">→</span></NavLink>
  </div>
</div>
  </div>
</section>


     {/* The Toolkit Section */}
<section className="toolkit-section" id="toolkit">
  <div className="container">
    <div className="toolkit-header">
      <span className="toolkit-eyebrow">THE TOOLKIT</span>
      <h2 className="toolkit-heading">
        Everything you need.<br />
        Organised by <span className="highlight">what you're doing.</span>
      </h2>
      <p className="toolkit-subtext">
        Four categories. Dozens of assets. All the same materials a marketing agency uses,
        without the agency price tag.
      </p>
    </div>

    <div className="toolkit-grid">
      {/* Card 1: Content */}
      <div className="tk-card">
        <div className="tk-card-top">
          <span className="tk-category">CONTENT</span>
          <h3 className="tk-title">Write it once.<br />Use it everywhere.</h3>
          <p className="tk-desc">
            Captions, hooks, DM scripts, and thread starters written for African creators, ready to copy and go.
          </p>
          <div className="tk-pills">
            <span>Caption Vault</span>
            <span>Hook Library</span>
            <span>DM Scripts</span>
            <span>Thread Starters</span>
            <span>Story Prompts</span>
          </div>
        </div>
        <div className="tk-card-bottom">
          <p className="tk-mini-title">FROM THE VAULT</p>
          <div className="tk-vault-list">
            <div className="tk-vault-item">
              <span className="tag ig">IG</span> The secret to consistent posts? Steal this system from top creators.
            </div>
            <div className="tk-vault-item">
              <span className="tag tt">TT</span> Lagos creator starter pack — save this before you need it.
            </div>
            <div className="tk-vault-item">
              <span className="tag x">X</span> You don't need more ideas. You need a system that doesn't break.
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Design (No bottom section) */}
      <div className="tk-card">
        <div className="tk-card-top">
          <span className="tk-category">DESIGN</span>
          <h3 className="tk-title">Templates that do the work.</h3>
          <p className="tk-desc">
            Canva templates organised by niche: carousels, stories, reels covers, and brand kits. Open and edit.
          </p>
          <div className="tk-pills">
            <span>Carousel Templates</span>
            <span>Story Layouts</span>
            <span>Reel Covers</span>
            <span>Brand Kits</span>
          </div>
        </div>
      </div>

      {/* Card 3: Strategy */}
      <div className="tk-card">
        <div className="tk-card-top">
          <span className="tk-category">STRATEGY</span>
          <h3 className="tk-title">Know what to post. And when.</h3>
          <p className="tk-desc">
            Content calendars, 30-day challenge plans, and competitor research frameworks. No more guessing.
          </p>
          <div className="tk-pills">
            <span>30-Day Plans</span>
            <span>Content Pillars</span>
            <span>Competitor Sheet</span>
          </div>
        </div>
        <div className="tk-card-bottom">
          <p className="tk-mini-title">June 2026 — Content Plan</p>
          <div className="tk-calendar-mini">
            <div className="cal-row">
              <div className="cal-num">28</div>
              <div className="cal-num">29</div>
              <div className="cal-num">30</div>
              <div className="cal-num">1</div>
              <div className="cal-block">2</div>
              <div className="cal-num">3</div>
              <div className="cal-num">4</div>
            </div>
            <div className="cal-row">
              <div className="cal-block">5</div>
              <div className="cal-num">6</div>
              <div className="cal-num">7</div>
              <div className="cal-num">8</div>
              <div className="cal-block">9</div>
              <div className="cal-num">10</div>
              <div className="cal-num">11</div>
            </div>
            <div className="cal-row">
              <div className="cal-num">12</div>
              <div className="cal-block">13</div>
              <div className="cal-num">14</div>
              <div className="cal-num">15</div>
              <div className="cal-num">16</div>
              <div className="cal-block">17</div>
              <div className="cal-num">18</div>
            </div>
          </div>
        </div>
      </div>

      {/* Card 4: Brand & Business */}
      <div className="tk-card">
        <div className="tk-card-top">
          <span className="tk-category">BRAND & BUSINESS</span>
          <h3 className="tk-title">Look the part.<br />Run the business.</h3>
          <p className="tk-desc">
            Rate cards, pitch decks, invoice templates, and brand brief guides. The paperwork side of being a creator.
          </p>
          <div className="tk-pills">
            <span>Rate Card Template</span>
            <span>Pitch Deck</span>
            <span>Invoice Template</span>
            <span>Brand Brief Guide</span>
          </div>
        </div>
        <div className="tk-card-bottom">
          <div className="tk-brand-details">
            <div className="tk-color">
              <span className="swatch orange"></span>
              <div className="color-text">Brand Primary<br/><strong>#F97316</strong></div>
            </div>
            <div className="tk-color">
              <span className="swatch black"></span>
              <div className="color-text">Brand Dark<br/><strong>#1A1A1A</strong></div>
            </div>
          </div>
          <div className="tk-rates">
            <div className="tk-rate"><span>Story Post (sponsored)</span> <strong>₦65,000</strong></div>
            <div className="tk-rate"><span>Reel + usage rights</span> <strong>₦210,000</strong></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


    {/* The Problem Section */}
<section className="problem-section" id="about">
  <div className="container">
    <div className="problem-grid">
      
      {/* Left Column: Copy & List */}
      <div className="problem-left">
        <span className="problem-eyebrow">THE PROBLEM</span>
        <h2 className="problem-heading">
          Growing a<br />
          brand online<br />
          shouldn't feel this<br />
          <span className="highlight">chaotic.</span>
        </h2>

        <div className="problem-list">
          <div className="problem-item">
            <div className="p-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f7941d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            </div>
            <div className="p-text">
              <p className="p-title">Too many tools</p>
              <p className="p-sub">No clear workflow.</p>
            </div>
          </div>
          
          <div className="problem-item">
            <div className="p-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f7941d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            </div>
            <div className="p-text">
              <p className="p-title">You don't know</p>
              <p className="p-sub">what to post next.</p>
            </div>
          </div>

          <div className="problem-item">
            <div className="p-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f7941d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <div className="p-text">
              <p className="p-title">Creating content takes too long.</p>
              <p className="p-sub">Hours lost, every week.</p>
            </div>
          </div>

          <div className="problem-item">
            <div className="p-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f7941d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
            </div>
            <div className="p-text">
              <p className="p-title">You start strong</p>
              <p className="p-sub">then lose consistency.</p>
            </div>
          </div>
        </div>

        <p className="problem-footer">
          It's not a lack of effort.<br />
          It's a <span className="highlight-underline">broken system.</span>
        </p>
      </div>

      {/* Right Column: Cards */}
      <div className="problem-right">
        
        {/* Testimonial Card */}
        <div className="p-card testimonial-card">
          <div className="quote-mark">“</div>
          <p className="quote-text">
            I was using six different tools just to post once a week.<br />
            Stratos<br />
            replaced the chaos.
          </p>
          <div className="quote-author">
            <span className="author-dot"></span> Fashion creator · 38K followers · Lagos
          </div>
        </div>

        {/* Stack Card */}
        <div className="p-card stack-card">
          <p className="stack-title">What it takes to post one thing right now:</p>
          <ul className="stack-list">
            <li>
              <span className="app-icon canva">C</span>
              <span className="app-name">Canva:</span> design the visual
            </li>
            <li>
              <span className="app-icon capcut">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><path d="M12 2L2 12l10 10 10-10L12 2zm0 14.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z"/></svg>
              </span>
              <span className="app-name">CapCut:</span> edit the video
            </li>
            <li>
              <span className="app-icon chatgpt">G</span>
              <span className="app-name">ChatGPT:</span> write the caption
            </li>
            <li>
              <span className="app-icon notion">N</span>
              <span className="app-name">Notion:</span> track the plan
            </li>
            <li>
              <span className="app-icon drive">D</span>
              <span className="app-name">Google Drive:</span> store the assets
            </li>
          </ul>
          <p className="stack-footer">Stratos puts it all in one place.</p>
        </div>

      </div>
    </div>
  </div>
</section>


{/* How It Works Section */}
<section className="how-it-works-section"  id="how-it-works">
  <div className="container">
    <div className="hiw-header">
      <span className="hiw-eyebrow">HOW IT WORKS</span>
      <h2 className="hiw-heading">
        Three taps.<br />
        Done.
      </h2>
      <p className="hiw-subtext">
        Stratos is the access layer. Your tools stay where they live: Canva, CapCut, 
        Google Docs. Stratos just makes finding and using the right one fast.
      </p>
    </div>

    <div className="hiw-grid">
      {/* Column 1 */}
      <div className="hiw-col">
        <div className="hiw-icon-wrapper">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="4" width="20" height="32" rx="4" stroke="#D1D5DB" strokeWidth="1.5"/><rect x="13" y="10" width="14" height="18" stroke="#D1D5DB" strokeWidth="1"/><circle cx="16" cy="14" r="2" fill="#F97316"/></svg>
        </div>
        <div className="hiw-step-num step-orange">01</div>
        <h3 className="hiw-col-title">Pick a category</h3>
        <p className="hiw-col-desc">
          Open Stratos and choose what you're doing: writing content, finding a design template, planning a strategy, or sorting your brand.
        </p>
        <div className="hiw-card">
          <ul className="hiw-list">
          <li className="active">
  <span className="list-left"><span className="dot dot-orange"></span> Content</span>
  <span className="list-right">24 tools</span>
</li>
            <li>
              <span className="list-left"><span className="dot dot-gray"></span> Design</span>
              <span className="list-right">18 tools</span>
            </li>
            <li>
              <span className="list-left"><span className="dot dot-gray"></span> Strategy</span>
              <span className="list-right">12 tools</span>
            </li>
            <li>
              <span className="list-left"><span className="dot dot-gray"></span> Brand & Business</span>
              <span className="list-right">16 tools</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Column 2 */}
      <div className="hiw-col">
        <div className="hiw-icon-wrapper">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="12" width="24" height="16" rx="2" stroke="#D1D5DB" strokeWidth="1.5"/><line x1="6" y1="16.5" x2="30" y2="16.5" stroke="#D1D5DB" strokeWidth="1.5"/><path d="M26 24L32 30M32 30L28 31M32 30L31 26" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div className="hiw-step-num step-gray">02</div>
        <h3 className="hiw-col-title">Choose your tool</h3>
        <p className="hiw-col-desc">
          Browse tools by what you need. Each one shows you a preview before you use it, so you know exactly what you're getting.
        </p>
        <div className="hiw-card">
          <div className="hiw-inner-card">
            <span className="inner-card-eyebrow">CONTENT / CAPTIONS</span>
            <h4 className="inner-card-title">Caption Vault</h4>
            <p className="inner-card-desc">250+ ready-to-copy captions for Instagram, TikTok, and X. Sorted by tone and niche.</p>
            <button className="inner-card-btn">Copy or open in Docs</button>
          </div>
        </div>
      </div>

      {/* Column 3 */}
      <div className="hiw-col">
        <div className="hiw-icon-wrapper">
           <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="8" width="16" height="24" rx="3" stroke="#D1D5DB" strokeWidth="1.5"/><circle cx="32" cy="20" r="4" stroke="#F97316" strokeWidth="1.5"/><path d="M24 20H28" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round"/><path d="M26 18L28 20L26 22" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div className="hiw-step-num step-gray">03</div>
        <h3 className="hiw-col-title">Use it immediately</h3>
        <p className="hiw-col-desc">
          Copy the asset directly, download the file, or tap to open it in Canva, CapCut, or Google Docs. No setup. No friction.
        </p>
        <div className="hiw-card card-flex-col">
          <button className="hiw-action-btn">
            <svg className="action-icon" fill="none" viewBox="0 0 24 24" stroke="#F97316"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            Copy caption to clipboard
          </button>
          <button className="hiw-action-btn">
            <svg className="action-icon" fill="none" viewBox="0 0 24 24" stroke="#F97316"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Download the file
          </button>
          <button className="hiw-action-btn">
            <svg className="action-icon" fill="none" viewBox="0 0 24 24" stroke="#F97316"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            Open in Canva or CapCut
          </button>
        </div>
      </div>
    </div>
  </div>
</section>


{/* Niches Section */}
<section className="niches-section">
  <div className="container">
    <h2 className="niches-heading">
      Built for creators<br />
      across <span className="text-orange">every niche</span>
    </h2>

    <div className="niches-cluster">
      {/* Row 1 */}
      <div className="niches-row">
        <span className="niche-pill active-white">
          <svg viewBox="0 0 24 24"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-1.5L2 22l3 3 14.5-14.5z"/></svg>
          Copywriters
        </span>
        <span className="niche-pill inactive">
          <svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="14" rx="2"/><circle cx="12" cy="13" r="4"/><path d="M8 6V4h8v2"/></svg>
          Photography
        </span>
        <span className="niche-pill inactive">
          <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
          Mental Health
        </span>
        <span className="niche-pill inactive">
          <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          Freelancers
        </span>
        <span className="niche-pill inactive">
          <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          Event Planners
        </span>
        <span className="niche-pill inactive">
          <svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          Motivation
        </span>
      </div>

      {/* Row 2 */}
      <div className="niches-row">
        <span className="niche-pill inactive">
          <svg viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
          Faith Content
        </span>
        <span className="niche-pill active-orange">
          <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          Beauty
        </span>
        <span className="niche-pill inactive">
          <svg viewBox="0 0 24 24"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
          Fashion
        </span>
        <span className="niche-pill inactive">
          <svg viewBox="0 0 24 24"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
          Fitness
        </span>
        <span className="niche-pill inactive">
          <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          Real Estate
        </span>
        <span className="niche-pill inactive">
          <svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
          Tech Startups
        </span>
        <span className="niche-pill active-white">
          <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
          Coaches
        </span>
      </div>

      {/* Row 3 */}
      <div className="niches-row">
        <span className="niche-pill active-white">
          <svg viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
          E-Commerce
        </span>
        <span className="niche-pill inactive">
          <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          Travel
        </span>
        <span className="niche-pill inactive">
          <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          Legal Consultants
        </span>
        <span className="niche-pill active-white">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
          Branding Agencies
        </span>
      </div>

      {/* Row 4 */}
      <div className="niches-row">
        <span className="niche-pill active-orange">
          <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
          + Many more niches covered
        </span>
      </div>
    </div>
  </div>
</section>

{/* CTA / Waitlist Section */}
<section className="cta-section">
  <div className="container cta-container">
    <span className="cta-eyebrow">READY WHEN YOU ARE</span>
    
    <h2 className="cta-heading">
      Stop figuring it out.<br />
      Start growing.
    </h2>
    
    <p className="cta-subtext">
      Join the waitlist and get early access to the toolkit built for creators<br />
      across Africa.
    </p>
    
    <div className="cta-actions">
      <button className="btn-primary">
        Join Waitlist
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </button>
      
      <button className="btn-secondary">
        See How It Works
      </button>
    </div>
  </div>
</section>

 {/* Footer Section */}
<footer className="footer-section">
  <div className="container footer-container">
    {/* Column 1: Left */}
    <div className="footer-col-left">
      {/* Insert your actual logo asset path below */}
      <img src={logo} alt="Stratos HQ" className="footer-logo" />
    </div>

    {/* Column 2: Center */}
    <div className="footer-col-center">
      <p>© 2026 Novalith Marketing. All rights reserved.</p>
    </div>

    {/* Column 3: Right */}
    <div className="footer-col-right">
      <a href="#privacy" className="footer-link">Privacy</a>
      <a href="#terms" className="footer-link">Terms</a>
      <a href="#contact" className="footer-link">Contact</a>
    </div>
  </div>
</footer>



     
    </div>
  );
};

export default Home;
