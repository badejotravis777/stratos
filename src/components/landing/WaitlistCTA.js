import React, { useState } from 'react';
import { LuArrowRight, LuMail, LuCircleCheck, LuLoaderCircle } from 'react-icons/lu';
import { FaWhatsapp } from 'react-icons/fa6';
import { joinWaitlist, EMAIL_PATTERN } from '../../lib/waitlist';
import './WaitlistCTA.css';

const WaitlistCTA = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = email.trim();

    if (!EMAIL_PATTERN.test(value)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      await joinWaitlist(value);
      setStatus('success');
      setMessage("You're on the list. We'll email you as soon as your spot opens.");
      setEmail('');
    } catch (err) {
      console.error('Waitlist signup failed', err);
      setStatus('error');
      setMessage('Something went wrong on our side. Please try again in a moment.');
    }
  };

  return (
    <section className="lp-section lp-cta lp-on-dark" id="waitlist">
      <div className="lp-container">
        <div className="lp-cta-inner">
          <span className="lp-eyebrow lp-reveal">
            <span className="lp-eyebrow-dot" /> Join the waitlist today
          </span>
          <h2 className="lp-cta-title lp-reveal">
            <span>Stop figuring it out.</span> <span className="lp-accent">Start growing.</span>
          </h2>
          <p className="lp-lead lp-reveal">
            Get early access to the toolkit built for creators across Africa, and lock in founding-member
            pricing before launch.
          </p>

          {status === 'success' ? (
            <div className="lp-cta-success lp-reveal is-visible" role="status">
              <LuCircleCheck aria-hidden="true" />
              <p>{message}</p>
            </div>
          ) : (
            <form className="lp-cta-form lp-reveal" onSubmit={handleSubmit} noValidate>
              <label htmlFor="lp-cta-email" className="lp-visually-hidden">Email address</label>
              <div className={`lp-cta-field${status === 'error' ? ' has-error' : ''}`}>
                <LuMail aria-hidden="true" />
                <input
                  id="lp-cta-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  aria-invalid={status === 'error'}
                  aria-describedby="lp-cta-msg"
                  disabled={status === 'loading'}
                  required
                />
              </div>
              <button type="submit" className="lp-btn lp-btn--primary" disabled={status === 'loading'}>
                {status === 'loading' ? (
                  <>
                    <LuLoaderCircle className="lp-spin" aria-hidden="true" /> Joining…
                  </>
                ) : (
                  <>
                    Get early access <LuArrowRight className="lp-btn-arrow" aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          )}

          <p id="lp-cta-msg" className={`lp-cta-msg${status === 'error' ? ' is-error' : ''}`} aria-live="polite">
            {status === 'error' ? message : 'No spam. Unsubscribe anytime.'}
          </p>

          <a
            className="lp-cta-whatsapp lp-reveal"
            href="https://wa.me/2349128430714"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp aria-hidden="true" /> Questions first? Chat with us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default WaitlistCTA;
