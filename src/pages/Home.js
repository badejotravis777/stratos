import React, { useEffect, useRef } from 'react';
import '../components/landing/landing.css';
import useReveal from '../components/landing/useReveal';
import LandingNav from '../components/landing/LandingNav';
import Hero from '../components/landing/Hero';
import Problem from '../components/landing/Problem';
import Toolkit from '../components/landing/Toolkit';
import HowItWorks from '../components/landing/HowItWorks';
import Audience from '../components/landing/Audience';
import WhyStratos from '../components/landing/WhyStratos';
import Pricing from '../components/landing/Pricing';
import Story from '../components/landing/Story';
import Roadmap from '../components/landing/Roadmap';
import WaitlistCTA from '../components/landing/WaitlistCTA';
import LandingFooter from '../components/landing/LandingFooter';

/**
 * Marketing landing page. Each section lives in its own component under
 * src/components/landing so it can be iterated on independently.
 *
 * Page flow (mirrors the pitch deck):
 * Hero → Problem → Solution/Toolkit → How it works → Who it's for →
 * Why now & our edge → Pricing → Story & team → Roadmap → Waitlist
 */
const Home = () => {
  const rootRef = useRef(null);
  useReveal(rootRef);

  // Smooth in-page anchor scrolling while on the landing page only.
  useEffect(() => {
    const html = document.documentElement;
    const previous = html.style.scrollBehavior;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion) html.style.scrollBehavior = 'smooth';

    // Honour deep links like /#pricing once the sections have rendered.
    if (window.location.hash) {
      const target = document.getElementById(window.location.hash.slice(1));
      if (target) requestAnimationFrame(() => target.scrollIntoView());
    }

    return () => {
      html.style.scrollBehavior = previous;
    };
  }, []);

  return (
    <div className="lp" ref={rootRef}>
      <LandingNav />
      <main>
        <Hero />
        <Problem />
        <Toolkit />
        <HowItWorks />
        <Audience />
        <WhyStratos />
        <Pricing />
        <Story />
        <Roadmap />
        <WaitlistCTA />
      </main>
      <LandingFooter />
    </div>
  );
};

export default Home;
