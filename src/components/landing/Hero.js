import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  LuArrowRight,
  LuPlay,
  LuCheck,
  LuMessageSquareText,
  LuGalleryHorizontalEnd,
  LuCalendarDays,
  LuCopy,
} from 'react-icons/lu';
import './Hero.css';

const CAPTIONS = [
  { platform: 'TT', text: 'Lagos creator starter pack. Save this.' },
  { platform: 'IG', text: 'The secret to consistent posts? Steal this system.' },
  { platform: 'X', text: "You don't need more ideas. You need a system." },
  { platform: 'IG', text: 'POV: you finally planned a full month of content.' },
];

const WORKS_WITH = ['Canva', 'CapCut', 'WhatsApp', 'Google Docs', 'Instagram', 'TikTok'];

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const SCHEDULED = new Set([2, 5, 9, 12, 16, 19, 23, 26, 30]);

function buildMonth(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();

  const cells = [];
  for (let i = firstWeekday - 1; i >= 0; i -= 1) cells.push({ day: daysInPrev - i, muted: true });
  for (let d = 1; d <= daysInMonth; d += 1) cells.push({ day: d });
  for (let n = 1; cells.length % 7 !== 0; n += 1) cells.push({ day: n, muted: true });

  return {
    label: date.toLocaleString('en-US', { month: 'long', year: 'numeric' }),
    today: date.getDate(),
    cells,
  };
}

const Hero = () => {
  const month = useMemo(() => buildMonth(new Date()), []);

  return (
    <section className="lp-hero lp-on-dark" id="top">
      <div className="lp-container">
        <div className="lp-hero-copy">
          <span className="lp-eyebrow lp-rise">
            <span className="lp-eyebrow-dot" /> <span className="lp-hero-eyebrow-extra">Early access · </span>Africa's toolkit for brand growth
          </span>

          <h1 className="lp-hero-title lp-rise" style={{ '--lp-d': '80ms' }}>
            Brand growth shouldn't be a <span className="lp-accent">luxury.</span>
          </h1>

          <p className="lp-hero-sub lp-rise" style={{ '--lp-d': '160ms' }}>
            Stratos is the plug-and-play brand toolkit for African creators and small businesses.
            Templates, content scripts, design kits and strategy, all in one place. No agency needed.
          </p>

          <div className="lp-hero-ctas lp-rise" style={{ '--lp-d': '240ms' }}>
            <Link to="/waitlist" className="lp-btn lp-btn--primary">
              Join the waitlist <LuArrowRight className="lp-btn-arrow" aria-hidden="true" />
            </Link>
            <a href="#how-it-works" className="lp-btn lp-btn--ghost">
              <LuPlay aria-hidden="true" /> See how it works
            </a>
          </div>

          <ul className="lp-hero-proof lp-rise" style={{ '--lp-d': '320ms' }}>
            <li><LuCheck aria-hidden="true" /> Free plan to start</li>
            <li><LuCheck aria-hidden="true" /> Built mobile-first</li>
            <li><LuCheck aria-hidden="true" /> Founding-member pricing</li>
          </ul>
        </div>

        <div className="lp-hero-showcase lp-rise" style={{ '--lp-d': '420ms' }} aria-label="A preview of tools inside Stratos">
          {/* Caption Vault */}
          <article className="lp-tool">
            <header className="lp-tool-head">
              <span className="lp-icon-tile"><LuMessageSquareText /></span>
              <div>
                <h3 className="lp-tool-title">Caption Vault</h3>
                <p className="lp-tool-desc">Ready-to-use captions for every niche and platform.</p>
              </div>
            </header>
            <div className="lp-tool-preview">
              <ul className="lp-captions">
                {CAPTIONS.map((c) => (
                  <li key={c.text}>
                    <span className="lp-platform">{c.platform}</span>
                    <span className="lp-caption-text">{c.text}</span>
                    <LuCopy className="lp-caption-copy" aria-hidden="true" />
                  </li>
                ))}
              </ul>
            </div>
            <p className="lp-tool-meta"><span /> 250+ captions, sorted by tone</p>
          </article>

          {/* Carousel Template */}
          <article className="lp-tool lp-tool--featured">
            <header className="lp-tool-head">
              <span className="lp-icon-tile"><LuGalleryHorizontalEnd /></span>
              <div>
                <h3 className="lp-tool-title">
                  Carousel Templates <span className="lp-tool-badge">Popular</span>
                </h3>
                <p className="lp-tool-desc">Plug-and-play layouts that actually convert.</p>
              </div>
            </header>
            <div className="lp-tool-preview lp-ba">
              <div className="lp-ba-col">
                <span className="lp-ba-label">Before</span>
                <p className="lp-ba-hook">"Check out my new collection"</p>
                <span className="lp-ba-stat">4 saves · 12 likes</span>
              </div>
              <div className="lp-ba-col lp-ba-col--after">
                <span className="lp-ba-label">After</span>
                <p className="lp-ba-hook">"Rate my fit 1–10 👀"</p>
                <span className="lp-ba-stat">847 saves · 3× reach</span>
              </div>
              <div className="lp-ba-dots" aria-hidden="true">
                <span className="is-active" /><span /><span /><span /><span />
              </div>
            </div>
            <p className="lp-tool-meta"><span /> Canva-ready, edit in minutes</p>
          </article>

          {/* Content Calendar */}
          <article className="lp-tool">
            <header className="lp-tool-head">
              <span className="lp-icon-tile"><LuCalendarDays /></span>
              <div>
                <h3 className="lp-tool-title">Content Calendar</h3>
                <p className="lp-tool-desc">Plan a month of content in one view.</p>
              </div>
            </header>
            <div className="lp-tool-preview lp-cal">
              <div className="lp-cal-top">
                <span>{month.label}</span>
                <span className="lp-cal-legend"><i /> Scheduled</span>
              </div>
              <div className="lp-cal-grid" role="presentation">
                {WEEKDAYS.map((d, i) => (
                  <span key={`w${i}`} className="lp-cal-wd">{d}</span>
                ))}
                {month.cells.map((cell, i) => {
                  const isToday = !cell.muted && cell.day === month.today;
                  const isScheduled = !cell.muted && !isToday && SCHEDULED.has(cell.day);
                  return (
                    <span
                      key={i}
                      className={`lp-cal-day${cell.muted ? ' is-muted' : ''}${isToday ? ' is-today' : ''}${isScheduled ? ' is-scheduled' : ''}`}
                    >
                      {cell.day}
                    </span>
                  );
                })}
              </div>
            </div>
            <p className="lp-tool-meta"><span /> 30-day plans, never miss a drop</p>
          </article>
        </div>

        <div className="lp-hero-works lp-rise" style={{ '--lp-d': '520ms' }}>
          <p>Works with the tools you already use</p>
          <ul>
            {WORKS_WITH.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Hero;
