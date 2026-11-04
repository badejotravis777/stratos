import React, { useState } from "react";
import "./Categories.css";
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import ChatSidebar from '../components/ChatSidebar';

const Categories = () => {
  const [isChatOpen, setIsChatOpen] = useState(true);

  const categoriesData = [
    { title: "Want to post daily?", desc: "Stay consistent with ready-to-use caption templates", icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg> },
    { title: "Shooting Videos?", desc: "Scripts and hooks for Reels, TikToks, and YouTube shorts", icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg> },
    { title: "Growing Fast?", desc: "Hooks, CTAs, and formats that drive follows and reach", icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg> },
    { title: "Low Engagement?", desc: "Captions and questions that start real conversations", icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg> },
    { title: "Launching a product?", desc: "Pre-launch, launch-day, and post-launch content", icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg> },
    { title: "SEO & searchability", desc: "Hashtag strategy and keyword-led content approaches", icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg> },
    { title: "Monetise your audience", desc: "Affiliate, product, and service promotion templates", icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg> },
    { title: "Repurpose content", desc: "Turn one post into five across Instagram, TikTok, and LinkedIn", icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg> }
  ];

  return (
    <div className="layout-container">
      <Sidebar />

      <main className="main-content">
      <TopBar title="Categories" niche="Fashion" isChatOpen={isChatOpen} onToggleChat={() => setIsChatOpen(!isChatOpen)} />

        <div className="main-content-inner">
          <div className="goals-section">
            <div className="goals-header">
              <h2>What's your goal</h2>
              <p>Pick a goal. We'll show you the right tools.</p>
            </div>

            <div className="goals-grid">
              {categoriesData.map((category, index) => (
                <div className="goal-card" key={index}>
                  <div className="goal-icon-wrapper">{category.icon}</div>
                  <h3>{category.title}</h3>
                  <p>{category.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <ChatSidebar
        isOpen={isChatOpen}
        welcomeMessage="Hey Nathaniel! You're on Day 3 of your Fashion plan. Today's task is the GRWM carousel. Want help writing the caption for it?"
        prompts={["Write caption", "Content ideas", "What to post", "DM script"]}
      />
    </div>
  );
};

export default Categories;