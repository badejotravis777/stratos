import React from 'react';
import './Roadmap.css';

const PHASES = [
  {
    phase: 'Phase 1',
    title: 'Launch',
    current: true,
    items: ['Launch the Android app', 'Build our early user community', 'Refine based on your feedback'],
  },
  {
    phase: 'Phase 2',
    title: 'Go local',
    items: ['Templates in local languages', 'Launch a creator marketplace', 'WhatsApp Business & Meta Ads integrations'],
  },
  {
    phase: 'Phase 3',
    title: 'Get smarter',
    items: ['AI-powered brand audit', 'Content recommendation engine', 'Growth dashboard'],
  },
  {
    phase: 'Phase 4',
    title: 'Grow the ecosystem',
    items: ['Stratos Creator Accelerator', 'Brand Clinics across Nigeria & Ghana', 'Sponsorships for student entrepreneurs'],
  },
];

const Roadmap = () => (
  <section className="lp-section lp-section--tint lp-roadmap" id="roadmap">
    <div className="lp-container">
      <div className="lp-head lp-head--split">
        <div>
          <span className="lp-eyebrow lp-reveal">Future vision</span>
          <h2 className="lp-h2 lp-reveal">
            The toolkit is <span className="lp-accent">just the start.</span>
          </h2>
        </div>
        <p className="lp-lead lp-reveal" style={{ '--lp-d': '100ms' }}>
          Here's where Stratos is headed, and what early members will help shape along the way.
        </p>
      </div>

      <ol className="lp-phases">
        {PHASES.map((p, i) => (
          <li
            key={p.phase}
            className={`lp-phase lp-reveal${p.current ? ' is-current' : ''}`}
            style={{ '--lp-d': `${i * 80}ms` }}
          >
            <div className="lp-phase-marker" aria-hidden="true"><span /></div>
            <div className="lp-phase-card">
              <div className="lp-phase-top">
                <span className="lp-phase-label">{p.phase}</span>
                {p.current && <span className="lp-phase-now">Now</span>}
              </div>
              <h3>{p.title}</h3>
              <ul>
                {p.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default Roadmap;
