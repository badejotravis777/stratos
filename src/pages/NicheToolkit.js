import React, { useState, useEffect } from 'react';
import './NicheToolkit.css';
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

const ICONS_BY_TYPE = {
  template: <TemplateIcon />,
  caption: <CaptionIcon />,
  guide: <GuideIcon />,
  script: <ScriptIcon />,
  calendar: <CalendarIcon />,
  prompt: <PromptIcon />,
};

const NicheToolkit = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [allTools, setAllTools] = useState([]);
  const [recentTools, setRecentTools] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const nicheId = profile?.niche_id;
  const userId = profile?.id;
  const nicheName = profile?.niches?.name || 'Fashion';

  useEffect(() => {
    if (!nicheId || !userId) return;

    const loadToolkit = async () => {
      setLoading(true);

      const { data: toolRows } = await supabase
        .from('tools')
        .select('*')
        .eq('niche_id', nicheId)
        .order('title', { ascending: true });
      setAllTools(toolRows || []);

      const { data: usageRows } = await supabase
        .from('user_tool_usage')
        .select('used_at, tools(id, title, description, type)')
        .eq('user_id', userId)
        .order('used_at', { ascending: false })
        .limit(3);
      setRecentTools((usageRows || []).filter((r) => r.tools));

      setLoading(false);
    };

    loadToolkit();
  }, [nicheId, userId]);

  const featuredTool = allTools.find((t) => t.title === 'GRWM Carousel Template') || allTools[0];

  const filteredTools = allTools.filter(
    (t) =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.description || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="layout-container">
        <Sidebar />
        <main className="main-content">
          <TopBar
            title="Niche Toolkit"
            niche={nicheName}
            isChatOpen={isChatOpen}
            onToggleChat={() => setIsChatOpen(!isChatOpen)}
          />
          <div className="main-content-inner">
            <p style={{ color: '#9CA3AF' }}>Loading your toolkit...</p>
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
          title="Niche Toolkit"
          niche={nicheName}
          isChatOpen={isChatOpen}
          onToggleChat={() => setIsChatOpen(!isChatOpen)}
        />

        <div className="main-content-inner">
          <section className="niche-toolkit-page">
            <div className="toolkit-section-header">
              <div>
                <h2>Toolkits</h2>
                <p className="toolkit-subtext">All tools · Free access</p>
              </div>
              <select className="toolkit-dropdown" disabled value={nicheName}>
                <option value={nicheName}>{nicheName}</option>
              </select>
            </div>

            <div className="toolkit-search-bar">
              <input
                type="text"
                placeholder="Search toolkits, brand kit, video scripts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {featuredTool && (
              <div className="featured-banner">
                <div className="featured-content">
                  <span className="featured-tag">FEATURED TOOL</span>
                  <h3>{featuredTool.title}</h3>
                  <p>{featuredTool.description}</p>
                  <button className="primary-btn" onClick={() => navigate(`/tool/${featuredTool.id}`)}>
                    Launch
                  </button>
                </div>
              </div>
            )}

            <div className="recently-used-section">
              <h4>Recently Used</h4>
              {recentTools.length === 0 ? (
                <p style={{ color: '#6B7280', fontSize: '13px' }}>
                  Nothing used yet — tools you open will show up here.
                </p>
              ) : (
                <div className="recent-cards-grid">
                  {recentTools.map((r, i) => (
                    <div
                      className="recent-card"
                      key={i}
                      onClick={() => navigate(`/tool/${r.tools.id}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="card-icon">
                        {ICONS_BY_TYPE[r.tools.type] || <TemplateIcon />}
                      </div>
                      <div>
                        <h5>{r.tools.title}</h5>
                        <p>{r.tools.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="all-tools-section">
              <h4>All Tools</h4>
              {filteredTools.length === 0 ? (
                <p style={{ color: '#6B7280', fontSize: '13px' }}>No tools match your search.</p>
              ) : (
                <div className="toolkit-tools-grid">
                  {filteredTools.map((tool) => (
                    <div className="toolkit-tool-card" key={tool.id}>
                      <div className="toolkit-tool-icon">
                        {ICONS_BY_TYPE[tool.type] || <TemplateIcon />}
                      </div>
                      <div className="toolkit-tool-body">
                        <div>
                          <span className="toolkit-tool-category">{tool.category}</span>
                          <h5>{tool.title}</h5>
                          <p>{tool.description}</p>
                        </div>
                        <a
                          href={`/tool/${tool.id}`}
                          className="toolkit-tool-link"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/tool/${tool.id}`);
                          }}
                        >
                          Get Templates &gt;
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      <ChatSidebar
        isOpen={isChatOpen}
        welcomeMessage={`Hey ${profile?.first_name || 'there'}! Looking for something specific in your ${nicheName} toolkit? Just ask.`}
        prompts={['Write caption', 'Content ideas', 'What to post', 'DM script']}
        specialist={`${nicheName} Specialist`}
      />
    </div>
  );
};

export default NicheToolkit;