import React from 'react';
import {
  LuTrendingUp,
  LuSparkles,
  LuSmartphone,
  LuScale,
  LuAward,
  LuMapPin,
  LuPuzzle,
  LuWallet,
  LuCheck,
  LuMinus,
} from 'react-icons/lu';
import './WhyStratos.css';

const WHY_NOW = [
  { icon: LuTrendingUp, title: "Africa's creator economy is booming", text: 'More people than ever are building businesses and audiences online.' },
  { icon: LuSparkles, title: 'AI tools are complex', text: 'People want results, not another tool to learn. Simplicity wins.' },
  { icon: LuSmartphone, title: "Everyone's online, few grow right", text: 'Being on social media is easy. Growing a real brand there is not.' },
  { icon: LuScale, title: 'We level the playing field', text: 'Stratos puts agency-grade tools in your pocket, at a creator price.' },
];

const EDGE = [
  { icon: LuAward, title: 'Built by real marketers', text: 'Made by a team that scales brands every day, with that experience baked into every feature.' },
  { icon: LuMapPin, title: 'Local-first, for Africa', text: 'Designed around African creators, markets and the realities of building here.' },
  { icon: LuPuzzle, title: 'Works with what you use', text: 'Plugs into Canva, CapCut and WhatsApp. Nothing new to learn.' },
  { icon: LuWallet, title: 'Affordable for everyone', text: 'Plans that work for students, freelancers and small businesses.' },
];

const COLUMNS = ['Templates', 'Strategy', 'Mobile-first', 'Built for Africa', 'Price', 'Support'];

// true = has it, false = doesn't, 'best' = core strength. Strings render as-is.
const ROWS = [
  { name: 'Stratos', highlight: true, values: ['best', 'best', 'best', 'best', 'From free', 'best'] },
  { name: 'Canva', values: [true, false, false, false, 'Premium', false] },
  { name: 'CapCut', values: [true, false, true, false, 'Free', false] },
  { name: 'Buffer / Later', values: [false, true, false, false, 'Paid', false] },
  { name: 'Jasper / ChatGPT', values: [true, true, false, false, 'Premium', false] },
];

const Cell = ({ value }) => {
  if (value === 'best') {
    return (
      <span className="lp-cmp-mark lp-cmp-mark--best">
        <LuCheck aria-hidden="true" />
        <span className="lp-visually-hidden">Yes, built in</span>
      </span>
    );
  }
  if (value === true) {
    return (
      <span className="lp-cmp-mark lp-cmp-mark--yes">
        <LuCheck aria-hidden="true" />
        <span className="lp-visually-hidden">Yes</span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="lp-cmp-mark lp-cmp-mark--no">
        <LuMinus aria-hidden="true" />
        <span className="lp-visually-hidden">No</span>
      </span>
    );
  }
  return <span className="lp-cmp-text">{value}</span>;
};

const WhyStratos = () => (
  <section className="lp-section lp-section--light lp-why" id="why">
    <div className="lp-container">
      <div className="lp-head lp-head--center">
        <span className="lp-eyebrow lp-reveal">Why Stratos, why now</span>
        <h2 className="lp-h2 lp-reveal">
          The tools are everywhere. <span className="lp-accent">The guidance isn't.</span>
        </h2>
        <p className="lp-lead lp-reveal">
          Creators don't need more apps. They need the right asset, a clear plan and someone who's done
          it before. That's what Stratos is built on.
        </p>
      </div>

      <div className="lp-why-grid">
        <div className="lp-why-card lp-reveal">
          <p className="lp-why-card-label">Why now</p>
          <ul className="lp-why-list">
            {WHY_NOW.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <span className="lp-icon-tile"><Icon /></span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="lp-why-card lp-why-card--dark lp-on-dark lp-reveal" style={{ '--lp-d': '100ms' }}>
          <p className="lp-why-card-label">Our edge</p>
          <ul className="lp-why-list">
            {EDGE.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <span className="lp-icon-tile"><Icon /></span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="lp-cmp lp-reveal">
        <div className="lp-cmp-head">
          <h3>How Stratos compares</h3>
          <p>Most tools solve one piece. Stratos brings the whole workflow together.</p>
          <p className="lp-cmp-hint" aria-hidden="true">Swipe to compare →</p>
        </div>
        <div className="lp-cmp-scroll" role="region" aria-label="Comparison table" tabIndex={0}>
          <table className="lp-cmp-table">
            <thead>
              <tr>
                <th scope="col"><span className="lp-visually-hidden">Tool</span></th>
                {COLUMNS.map((c) => (
                  <th scope="col" key={c}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.name} className={row.highlight ? 'is-highlight' : ''}>
                  <th scope="row">
                    {row.highlight && <span className="lp-cmp-logo" aria-hidden="true">S</span>}
                    {row.name}
                  </th>
                  {row.values.map((v, i) => (
                    <td key={COLUMNS[i]}><Cell value={v} /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
);

export default WhyStratos;
