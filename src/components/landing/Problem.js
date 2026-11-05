import React from 'react';
import { LuClock, LuCompass, LuTrendingDown, LuWallet, LuArrowDown } from 'react-icons/lu';
import './Problem.css';

const PAINS = [
  {
    icon: LuClock,
    title: 'Content eats your week',
    text: 'Coming up with what to post, then making it look good, takes hours every single week.',
  },
  {
    icon: LuCompass,
    title: 'No real strategy',
    text: "You post and hope. No plan, no content pillars, no idea what's actually working.",
  },
  {
    icon: LuTrendingDown,
    title: 'Consistency slips',
    text: 'You start strong, then life happens and the page goes quiet for weeks.',
  },
  {
    icon: LuWallet,
    title: 'Agencies cost too much',
    text: 'Hiring an agency or building an in-house team is expensive and slow.',
  },
];

const STACK = [
  { name: 'Canva', job: 'design the visual', mark: 'C', tone: 'canva' },
  { name: 'CapCut', job: 'edit the video', mark: 'Cc', tone: 'capcut' },
  { name: 'ChatGPT', job: 'write the caption', mark: 'G', tone: 'gpt' },
  { name: 'Notion', job: 'track the plan', mark: 'N', tone: 'notion' },
  { name: 'Google Drive', job: 'store the assets', mark: 'D', tone: 'drive' },
];

const Problem = () => (
  <section className="lp-section lp-section--light lp-problem" id="problem">
    <div className="lp-container">
      <div className="lp-problem-grid">
        <div className="lp-problem-copy">
          <span className="lp-eyebrow lp-reveal">The problem</span>
          <h2 className="lp-h2 lp-reveal">
            Growing a brand online shouldn't feel this <span className="lp-accent">chaotic.</span>
          </h2>
          <p className="lp-lead lp-reveal">
            Most creators and small businesses across Africa have the ideas. What they don't have is the
            tools, the guidance or the budget to grow professionally online.
          </p>

          <ul className="lp-pains">
            {PAINS.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="lp-pain lp-reveal" style={{ '--lp-d': `${i * 70}ms` }}>
                <span className="lp-icon-tile"><Icon /></span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="lp-problem-visual lp-reveal" style={{ '--lp-d': '120ms' }}>
          <div className="lp-stack">
            <p className="lp-stack-title">What it takes to post one thing today</p>
            <ol className="lp-stack-list">
              {STACK.map((tool, i) => (
                <li key={tool.name}>
                  <span className="lp-stack-step">{i + 1}</span>
                  <span className={`lp-stack-mark lp-stack-mark--${tool.tone}`} aria-hidden="true">{tool.mark}</span>
                  <span className="lp-stack-name">{tool.name}</span>
                  <span className="lp-stack-job">{tool.job}</span>
                </li>
              ))}
            </ol>
            <div className="lp-stack-arrow" aria-hidden="true"><LuArrowDown /></div>
            <div className="lp-stack-result">
              <span className="lp-stack-result-mark" aria-hidden="true">S</span>
              <div>
                <strong>Stratos</strong>
                <span>Puts the right asset for every step in one place.</span>
              </div>
            </div>
          </div>

          <figure className="lp-quote">
            <blockquote>
              “I was using six different tools just to post once a week. Stratos replaced the chaos.”
            </blockquote>
            <figcaption>
              <span className="lp-quote-avatar" aria-hidden="true">F</span>
              <span>
                <strong>Fashion creator</strong>
                38K followers · Lagos
              </span>
            </figcaption>
          </figure>
        </div>
      </div>

      <div className="lp-problem-outcome lp-reveal">
        <p>
          <span>The result?</span> Creators get stuck, burn out, or give up.
        </p>
        <p className="lp-problem-outcome-kicker">
          It's not a lack of effort. It's a <em>broken system.</em>
        </p>
      </div>
    </div>
  </section>
);

export default Problem;
