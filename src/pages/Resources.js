import React, { useState, useEffect } from 'react';
import './Resources.css';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import ChatSidebar from '../components/ChatSidebar';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

const TemplateIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"></rect>
    <line x1="9" y1="3" x2="9" y2="21"></line>
  </svg>
);
const CaptionIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);
const GuideIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
  </svg>
);
const ScriptIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"></path>
  </svg>
);
const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);
const PromptIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);
const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

const ICONS_BY_TYPE = {
  template: <TemplateIcon />,
  caption: <CaptionIcon />,
  guide: <GuideIcon />,
  script: <ScriptIcon />,
  calendar: <CalendarIcon />,
  prompt: <PromptIcon />,
};

const Resources = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [allTools, setAllTools] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(true);

  const nicheId = profile?.niche_id;
  const nicheName = profile?.niches?.name || 'Fashion';

  useEffect(() => {
    if (!nicheId) return;

    const loadResources = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('tools')
        .select('*')
        .eq('niche_id', nicheId)
        .order('title', { ascending: true });
      setAllTools(data || []);
      setLoading(false);
    };

    loadResources();
  }, [nicheId]);

  const categories = ['All', ...Array.from(new Set(allTools.map((t) => t.category).filter(Boolean)))];

  const filteredTools = activeTab === 'All'
    ? allTools
    : allTools.filter((t) => t.category === activeTab);

  if (loading) {
    return (
      <div className="layout-container">
        <Sidebar />
        <main className="main-content">
          <TopBar
            title="Resources"
            niche={nicheName}
            isChatOpen={isChatOpen}
            onToggleChat={() => setIsChatOpen(!isChatOpen)}
          />
          <div className="main-content-inner">
            <p style={{ color: '#9CA3AF' }}>Loading resources...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="layout-container">
      <Sidebar />

      <main className="main-content">
        <TopBar
          title="Resources"
          niche={nicheName}
          isChatOpen={isChatOpen}
          onToggleChat={() => setIsChatOpen(!isChatOpen)}
        />

        <div className="main-content-inner">
          <section className="resources-page">
            <div className="resources-section-header">
              <h2>Resources</h2>
              <p className="resources-subtext">Guides, templates, and scripts — everything in one place.</p>
            </div>

            <div className="pinned-kit-banner">
              <span className="pinned-label">PINNED · START HERE</span>
              <h3>{nicheName} Creator Starter Kit</h3>
              <p>The tools that set up your first 7 days — templates, captions, and a posting guide.</p>
              <button className="get-kit-btn">Get the Kit</button>
            </div>

            <div className="resource-tabs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`resource-tab ${activeTab === cat ? 'active' : ''}`}
                  onClick={() => setActiveTab(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="resources-list">
              {filteredTools.length === 0 ? (
                <p style={{ color: '#6B7280', fontSize: '13px', padding: '16px 4px' }}>
                  No resources in this category yet.
                </p>
              ) : (
                filteredTools.map((tool) => (
                  <div
                    className="resource-row"
                    key={tool.id}
                    onClick={() => navigate(`/tool/${tool.id}`)}
                  >
                    <div className="resource-row-icon">
                      {ICONS_BY_TYPE[tool.type] || <TemplateIcon />}
                    </div>
                    <div className="resource-row-text">
                      <h5>{tool.title}</h5>
                      <p>{tool.description}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="community-row">
              <div className="community-row-left">
                <div className="community-icon"><ChatIcon /></div>
                <div>
                  <h5>Join the creator community</h5>
                  <p>Live tips, early access, and wins — on WhatsApp.</p>
                </div>
              </div>
              <button className="join-now-btn">Join Now</button>
            </div>
          </section>
        </div>
      </main>

      <ChatSidebar
        isOpen={isChatOpen}
        welcomeMessage={`Hey ${profile?.first_name || 'there'}! Looking for something specific? I can point you to the best guides or templates for your ${nicheName} plan.`}
        prompts={['Find pitch decks', 'Growth guides', 'Content planners', 'Video hooks']}
        specialist={`${nicheName} Specialist`}
      />
    </div>
  );
};

export default Resources;