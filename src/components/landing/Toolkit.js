import React from 'react';
import {
  LuPenLine,
  LuPalette,
  LuCompass,
  LuBriefcase,
  LuCalendarCheck,
  LuClapperboard,
  LuMegaphone,
  LuScanSearch,
  LuGraduationCap,
  LuLayers,
} from 'react-icons/lu';
import './Toolkit.css';

const VAULT = [
  { platform: 'IG', text: 'The secret to consistent posts? Steal this system from top creators.' },
  { platform: 'TT', text: 'Lagos creator starter pack. Save this before you need it.' },
  { platform: 'X', text: "You don't need more ideas. You need a system that doesn't break." },
];

const PLAN = [
  ['Mon', 'Reel'],
  ['Tue', ''],
  ['Wed', 'Post'],
  ['Thu', ''],
  ['Fri', 'Story'],
  ['Sat', 'Live'],
  ['Sun', ''],
];

const CAPABILITIES = [
  {
    icon: LuCalendarCheck,
    title: 'Plan & post content with ease',
    text: 'Calendars, prompts and captions that take you from blank page to published.',
  },
  {
    icon: LuPalette,
    title: 'Build your brand visuals',
    text: 'Canva-ready kits for carousels, stories, covers and full brand identities.',
  },
  {
    icon: LuClapperboard,
    title: 'Create Reels that travel',
    text: 'CapCut templates and hook scripts built for short-form video.',
  },
  {
    icon: LuMegaphone,
    title: 'Launch marketing campaigns',
    text: 'Proven campaign playbooks you can adapt to your product or offer.',
  },
  {
    icon: LuScanSearch,
    title: 'Audit your brand',
    text: "Simple frameworks to spot what's working, what isn't and what to fix first.",
  },
  {
    icon: LuGraduationCap,
    title: 'Learn from experts',
    text: 'Short learning videos and real support from marketers who do this daily.',
  },
];

const Toolkit = () => (
  <section className="lp-section lp-section--dark lp-toolkit" id="toolkit">
    <div className="lp-container">
      <div className="lp-head lp-head--split">
        <div>
          <span className="lp-eyebrow lp-reveal"><LuLayers aria-hidden="true" /> The solution</span>
          <h2 className="lp-h2 lp-reveal">
            Introducing Stratos. The <span className="lp-accent lp-nowrap">plug-and-play</span> brand toolkit.
          </h2>
        </div>
        <div className="lp-reveal" style={{ '--lp-d': '100ms' }}>
          <p className="lp-lead">
            A mobile app for creators, business owners and marketers. Ready-made templates, content
            scripts, design kits and strategy decks, organised by what you're doing. Strategy meets
            design, not just pretty templates.
          </p>
          <ul className="lp-toolkit-promises">
            <li>No stress.</li>
            <li>No guesswork.</li>
            <li>No expensive agencies.</li>
          </ul>
        </div>
      </div>

      <div className="lp-bento">
        {/* Content */}
        <article className="lp-bento-card lp-bento-card--wide lp-reveal">
          <div className="lp-bento-body">
            <span className="lp-bento-cat"><LuPenLine aria-hidden="true" /> Content</span>
            <h3 className="lp-bento-title">Write it once. Use it everywhere.</h3>
            <p className="lp-bento-text">
              Captions, hooks, DM scripts and thread starters written for African creators. Copy and go.
            </p>
            <ul className="lp-bento-pills">
              <li>Caption Vault</li><li>Hook Library</li><li>DM Scripts</li><li>Thread Starters</li><li>Story Prompts</li>
            </ul>
          </div>
          <div className="lp-bento-panel">
            <p className="lp-bento-panel-label">From the vault</p>
            <ul className="lp-vault">
              {VAULT.map((v) => (
                <li key={v.text}>
                  <span className="lp-platform">{v.platform}</span>
                  <span>{v.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>

        {/* Design */}
        <article className="lp-bento-card lp-reveal" style={{ '--lp-d': '80ms' }}>
          <div className="lp-bento-body">
            <span className="lp-bento-cat"><LuPalette aria-hidden="true" /> Design</span>
            <h3 className="lp-bento-title">Templates that do the work.</h3>
            <p className="lp-bento-text">
              Canva templates organised by niche: carousels, stories, reel covers and brand kits.
            </p>
            <ul className="lp-bento-pills">
              <li>Carousels</li><li>Story Layouts</li><li>Reel Covers</li><li>Brand Kits</li>
            </ul>
          </div>
          <div className="lp-bento-panel lp-templates" aria-hidden="true">
            <div className="lp-tpl lp-tpl--a">
              <span className="lp-tpl-tag">01</span>
              <span className="lp-tpl-line lp-tpl-line--lg" />
              <span className="lp-tpl-line" />
            </div>
            <div className="lp-tpl lp-tpl--b">
              <span className="lp-tpl-circle" />
              <span className="lp-tpl-line lp-tpl-line--lg" />
              <span className="lp-tpl-line lp-tpl-line--sm" />
            </div>
            <div className="lp-tpl lp-tpl--c">
              <span className="lp-tpl-line lp-tpl-line--lg" />
              <span className="lp-tpl-block" />
            </div>
          </div>
        </article>

        {/* Strategy */}
        <article className="lp-bento-card lp-reveal">
          <div className="lp-bento-body">
            <span className="lp-bento-cat"><LuCompass aria-hidden="true" /> Strategy</span>
            <h3 className="lp-bento-title">Know what to post. And when.</h3>
            <p className="lp-bento-text">
              Content calendars, 30-day plans and competitor research frameworks. No more guessing.
            </p>
            <ul className="lp-bento-pills">
              <li>30-Day Plans</li><li>Content Pillars</li><li>Competitor Sheet</li>
            </ul>
          </div>
          <div className="lp-bento-panel">
            <p className="lp-bento-panel-label">This week's plan</p>
            <ul className="lp-week">
              {PLAN.map(([day, type]) => (
                <li key={day} className={type ? 'has-post' : ''}>
                  <span className="lp-week-day">{day}</span>
                  <span className="lp-week-slot">{type || '·'}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>

        {/* Brand & Business */}
        <article className="lp-bento-card lp-bento-card--wide lp-reveal" style={{ '--lp-d': '80ms' }}>
          <div className="lp-bento-body">
            <span className="lp-bento-cat"><LuBriefcase aria-hidden="true" /> Brand &amp; Business</span>
            <h3 className="lp-bento-title">Look the part. Run the business.</h3>
            <p className="lp-bento-text">
              Rate cards, pitch decks, invoice templates and brand brief guides. The paperwork side of
              being a creator, sorted.
            </p>
            <ul className="lp-bento-pills">
              <li>Rate Card</li><li>Pitch Deck</li><li>Invoice Template</li><li>Brand Brief Guide</li>
            </ul>
          </div>
          <div className="lp-bento-panel lp-brandkit">
            <div className="lp-swatches">
              <div className="lp-swatch">
                <span style={{ background: '#F97316' }} />
                <div><small>Primary</small><strong>#F97316</strong></div>
              </div>
              <div className="lp-swatch">
                <span style={{ background: '#1A1A1A', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.12)' }} />
                <div><small>Dark</small><strong>#1A1A1A</strong></div>
              </div>
            </div>
            <dl className="lp-rates">
              <div><dt>Story post (sponsored)</dt><dd>₦65,000</dd></div>
              <div><dt>Reel + usage rights</dt><dd>₦210,000</dd></div>
            </dl>
          </div>
        </article>
      </div>

      <div className="lp-capabilities">
        <div className="lp-capabilities-head lp-reveal">
          <h3>What you can do with Stratos</h3>
          <span aria-hidden="true" />
        </div>
        <ol className="lp-capabilities-grid">
          {CAPABILITIES.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="lp-capability lp-reveal" style={{ '--lp-d': `${(i % 3) * 80}ms` }}>
              <div className="lp-capability-top">
                <span className="lp-icon-tile"><Icon /></span>
                <span className="lp-capability-num">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h4>{title}</h4>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);

export default Toolkit;
