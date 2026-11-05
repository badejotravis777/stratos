import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LuMenu, LuX, LuArrowRight } from 'react-icons/lu';
import logo from '../../assets/nlogo.png';
import './LandingNav.css';

const NAV_LINKS = [
  { href: '#toolkit', label: 'Toolkit' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#who', label: "Who it's for" },
  { href: '#pricing', label: 'Pricing' },
  { href: '#story', label: 'Our story' },
];

const LandingNav = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth > 960 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`lp-nav${scrolled || open ? ' is-solid' : ''}${open ? ' is-open' : ''}`}>
      <div className="lp-container lp-nav-bar">
        <Link to="/" className="lp-nav-logo" aria-label="Stratos HQ home" onClick={close}>
          <img src={logo} alt="Stratos HQ" width="138" height="30" />
        </Link>

        <nav className="lp-nav-links" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="lp-nav-actions">
          <Link to="/login" className="lp-nav-login">
            Log in
          </Link>
          <Link to="/waitlist" className="lp-btn lp-btn--primary lp-btn--sm">
            Join waitlist
          </Link>
        </div>

        <button
          type="button"
          className="lp-nav-toggle"
          aria-expanded={open}
          aria-controls="lp-mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <LuX /> : <LuMenu />}
        </button>
      </div>

      <div id="lp-mobile-menu" className="lp-nav-panel" aria-hidden={!open}>
        <nav className="lp-container" aria-label="Mobile">
          <ul className="lp-nav-panel-links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={close} tabIndex={open ? 0 : -1}>
                  {link.label}
                  <LuArrowRight aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <div className="lp-nav-panel-actions">
            <Link to="/login" className="lp-btn lp-btn--ghost lp-btn--block" tabIndex={open ? 0 : -1}>
              Log in
            </Link>
            <Link to="/waitlist" className="lp-btn lp-btn--primary lp-btn--block" tabIndex={open ? 0 : -1}>
              Join waitlist
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default LandingNav;
