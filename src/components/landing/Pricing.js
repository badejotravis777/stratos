import React from 'react';
import { Link } from 'react-router-dom';
import { LuCheck, LuArrowRight, LuBuilding2 } from 'react-icons/lu';
import './Pricing.css';

const PLANS = [
  {
    name: 'Starter',
    price: 'Free',
    period: '',
    blurb: 'Try Stratos and learn the basics.',
    features: ['5 basic tools', 'Step-by-step tutorials', 'Mobile-first access'],
    cta: 'Join the waitlist',
  },
  {
    name: 'Pro',
    price: '₦15,000',
    period: '/month',
    blurb: 'For creators who post every week.',
    features: ['All features unlocked', 'Full template & script library', 'Strategy tools & 30-day plans'],
    cta: 'Join the waitlist',
    featured: true,
  },
  {
    name: 'Elite',
    price: '₦30,000',
    period: '/month',
    blurb: 'For brands that want expert guidance.',
    features: ['Everything in Pro', '1:1 strategy call', 'Chat support'],
    cta: 'Join the waitlist',
  },
  {
    name: 'Agency',
    price: '₦50,000',
    period: '/month',
    blurb: 'Done for you, start to finish.',
    features: ['We manage your brand for 1 month', 'Done-for-you service', 'Delivered by Novalith Marketing'],
    cta: 'Join the waitlist',
  },
];

const Pricing = () => (
  <section className="lp-section lp-section--dark lp-pricing" id="pricing">
    <div className="lp-container">
      <div className="lp-head lp-head--center">
        <span className="lp-eyebrow lp-reveal">Pricing</span>
        <h2 className="lp-h2 lp-reveal">
          Simple plans. <span className="lp-accent">Serious growth.</span>
        </h2>
        <p className="lp-lead lp-reveal">
          Start free and upgrade when you're ready. Join the waitlist now to lock in founding-member pricing.
        </p>
      </div>

      <ul className="lp-plans">
        {PLANS.map((plan, i) => (
          <li
            key={plan.name}
            className={`lp-plan lp-reveal${plan.featured ? ' lp-plan--featured' : ''}`}
            style={{ '--lp-d': `${i * 70}ms` }}
          >
            {plan.featured && <span className="lp-plan-badge">Most popular</span>}
            <h3 className="lp-plan-name">{plan.name}</h3>
            <p className="lp-plan-blurb">{plan.blurb}</p>
            <p className="lp-plan-price">
              <strong>{plan.price}</strong>
              {plan.period && <span>{plan.period}</span>}
            </p>
            <Link
              to="/waitlist"
              className={`lp-btn lp-btn--block ${plan.featured ? 'lp-btn--primary' : 'lp-btn--ghost'}`}
            >
              {plan.cta}
            </Link>
            <ul className="lp-plan-features">
              {plan.features.map((f) => (
                <li key={f}>
                  <LuCheck aria-hidden="true" /> {f}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <div className="lp-enterprise lp-reveal">
        <span className="lp-icon-tile"><LuBuilding2 /></span>
        <div className="lp-enterprise-copy">
          <h3>Enterprise plans for hubs, schools &amp; teams</h3>
          <p>Bring Stratos to your digital hub, training centre or university.</p>
        </div>
        <a href="mailto:hello@stratoshqapp.com?subject=Stratos%20Enterprise" className="lp-btn lp-btn--ghost lp-btn--sm">
          Talk to us <LuArrowRight className="lp-btn-arrow" aria-hidden="true" />
        </a>
      </div>
    </div>
  </section>
);

export default Pricing;
