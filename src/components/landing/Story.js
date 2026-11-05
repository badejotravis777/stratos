import React from 'react';
import './Story.css';

// Add a `photo` (imported image) to any member to replace their monogram.
const TEAM = [
  { name: 'Christian Edward-Ngwu', role: 'Founder & Lead Strategist' },
  { name: 'Olatubosun Travis', role: 'Chief Technology Officer' },
  { name: 'Olubunmi-Durotoye Nathaniel', role: 'UI/UX Designer' },
  { name: 'Michael Adebanwo', role: 'Creative Designer' },
];

const initials = (name) =>
  name
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

const Story = () => (
  <section className="lp-section lp-section--light lp-story" id="story">
    <div className="lp-container">
      <div className="lp-story-grid">
        <div className="lp-story-intro">
          <span className="lp-eyebrow lp-reveal">How it started</span>
          <h2 className="lp-h2 lp-reveal">
            Built from one <span className="lp-accent">real problem.</span>
          </h2>
        </div>

        <div className="lp-story-body">
          <p className="lp-story-lede lp-reveal">
            Too many African creators and small businesses had the ideas, but not the tools or guidance
            to grow professionally online.
          </p>
          <p className="lp-reveal">
            After years of working with brands, Christian Edward-Ngwu saw the same struggle again and
            again: inconsistent content, limited resources and no strategy. So he built Stratos, a
            mobile-first toolkit that gives everyday creators plug-and-play marketing systems, pro
            templates and strategy tools, all without needing a full agency.
          </p>
          <p className="lp-reveal">
            Today, Stratos is helping creators and startups build real brands with confidence, clarity
            and consistency.
          </p>
          <blockquote className="lp-story-mission lp-reveal">
            “We're building the future of branding in Africa. Simple, smart and scalable.”
          </blockquote>
        </div>
      </div>

      <div className="lp-team" id="team">
        <div className="lp-team-head lp-reveal">
          <h3>Meet the team</h3>
          <p>Powered by <strong>Novalith Marketing</strong></p>
        </div>
        <ul className="lp-team-grid">
          {TEAM.map((member, i) => (
            <li key={member.name} className="lp-member lp-reveal" style={{ '--lp-d': `${i * 70}ms` }}>
              {member.photo ? (
                <img className="lp-member-avatar" src={member.photo} alt="" />
              ) : (
                <span className="lp-member-avatar" aria-hidden="true">{initials(member.name)}</span>
              )}
              <h4>{member.name}</h4>
              <p>{member.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default Story;
