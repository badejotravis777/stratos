import React from 'react';
import {
  LuVideo,
  LuStore,
  LuUserRound,
  LuHandshake,
  LuChartColumn,
  LuRocket,
} from 'react-icons/lu';
import './Audience.css';

const AUDIENCES = [
  { icon: LuVideo, title: 'Content creators', text: 'Post consistently without burning out or running out of ideas.' },
  { icon: LuStore, title: 'Small business owners', text: 'Market your business properly without paying for an agency.' },
  { icon: LuUserRound, title: 'Personal brands', text: 'Show up online like the expert you already are.' },
  { icon: LuHandshake, title: 'Coaches & service providers', text: 'Turn what you know into content that brings in clients.' },
  { icon: LuChartColumn, title: 'Marketing teams', text: 'Ship campaigns faster with assets that are ready to go.' },
  { icon: LuRocket, title: 'Entrepreneurs ready to scale', text: 'Grow from side hustle to a brand people recognise.' },
];

const NICHES = [
  'Fashion', 'Beauty', 'Fitness', 'Real Estate', 'Tech Startups',
  'Coaches', 'E-Commerce', 'Photography', 'Copywriters', 'Freelancers', 'Event Planners',
  'Faith Content', 'Mental Health', 'Motivation', 'Travel', 'Legal Consultants', 'Branding Agencies',
];

const Audience = () => (
  <section className="lp-section lp-section--dark lp-audience" id="who">
    <div className="lp-container">
      <div className="lp-head lp-head--split">
        <div>
          <span className="lp-eyebrow lp-reveal">Who it's for</span>
          <h2 className="lp-h2 lp-reveal">
            Built for anyone building a brand <span className="lp-accent">in Africa.</span>
          </h2>
        </div>
        <p className="lp-lead lp-reveal" style={{ '--lp-d': '100ms' }}>
          Whether you're posting from your phone or running a small team, Stratos meets you where you
          are and grows with you.
        </p>
      </div>

      <ul className="lp-audience-grid">
        {AUDIENCES.map(({ icon: Icon, title, text }, i) => (
          <li key={title} className="lp-audience-card lp-reveal" style={{ '--lp-d': `${(i % 3) * 80}ms` }}>
            <span className="lp-icon-tile"><Icon /></span>
            <h3>{title}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ul>

      <div className="lp-niches lp-reveal">
        <p className="lp-niches-title">
          Tailored to <span>every niche</span>
        </p>
        <ul className="lp-niches-list">
          {NICHES.map((n) => (
            <li key={n}>{n}</li>
          ))}
          <li className="lp-niches-more">+ many more</li>
        </ul>
      </div>
    </div>
  </section>
);

export default Audience;
