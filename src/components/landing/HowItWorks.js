import React from 'react';
import { LuCopy, LuDownload, LuExternalLink, LuChevronRight } from 'react-icons/lu';
import './HowItWorks.css';

const CATEGORIES = [
  { name: 'Content', count: 24, active: true },
  { name: 'Design', count: 18 },
  { name: 'Strategy', count: 12 },
  { name: 'Brand & Business', count: 16 },
];

const ACTIONS = [
  { icon: LuCopy, label: 'Copy caption to clipboard' },
  { icon: LuDownload, label: 'Download the file' },
  { icon: LuExternalLink, label: 'Open in Canva or CapCut' },
];

const HowItWorks = () => (
  <section className="lp-section lp-section--light lp-hiw" id="how-it-works">
    <div className="lp-container">
      <div className="lp-head lp-head--center">
        <span className="lp-eyebrow lp-reveal">How it works</span>
        <h2 className="lp-h2 lp-reveal">
          Three taps. <span className="lp-accent">Done.</span>
        </h2>
        <p className="lp-lead lp-reveal">
          Stratos is the access layer. Your tools stay where they live: Canva, CapCut, Google Docs.
          Stratos just makes finding and using the right one fast.
        </p>
      </div>

      <ol className="lp-steps">
        <li className="lp-step lp-reveal">
          <div className="lp-step-copy">
            <span className="lp-step-num">01</span>
            <h3 className="lp-h3">Pick a category</h3>
            <p>Choose what you're working on: writing content, finding a design, planning strategy or sorting your brand.</p>
          </div>
          <div className="lp-step-ui">
            <ul className="lp-step-cats">
              {CATEGORIES.map((c) => (
                <li key={c.name} className={c.active ? 'is-active' : ''}>
                  <span className="lp-step-cat-name"><i aria-hidden="true" />{c.name}</span>
                  <span className="lp-step-cat-count">
                    {c.count} tools <LuChevronRight aria-hidden="true" />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </li>

        <li className="lp-step lp-reveal" style={{ '--lp-d': '100ms' }}>
          <div className="lp-step-copy">
            <span className="lp-step-num">02</span>
            <h3 className="lp-h3">Choose your tool</h3>
            <p>Browse tools by what you need. Every one shows a preview first, so you know exactly what you're getting.</p>
          </div>
          <div className="lp-step-ui">
            <div className="lp-step-tool">
              <span className="lp-step-tool-path">Content / Captions</span>
              <h4>Caption Vault</h4>
              <p>250+ ready-to-copy captions for Instagram, TikTok and X. Sorted by tone and niche.</p>
              <div className="lp-step-tool-tags">
                <span className="lp-platform">IG</span>
                <span className="lp-platform">TT</span>
                <span className="lp-platform">X</span>
              </div>
            </div>
          </div>
        </li>

        <li className="lp-step lp-reveal" style={{ '--lp-d': '200ms' }}>
          <div className="lp-step-copy">
            <span className="lp-step-num">03</span>
            <h3 className="lp-h3">Use it immediately</h3>
            <p>Copy it, download it, or open it straight in Canva, CapCut or Google Docs. No setup. No friction.</p>
          </div>
          <div className="lp-step-ui">
            <ul className="lp-step-actions">
              {ACTIONS.map(({ icon: Icon, label }) => (
                <li key={label}>
                  <span className="lp-step-action-icon"><Icon aria-hidden="true" /></span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </li>
      </ol>
    </div>
  </section>
);

export default HowItWorks;
