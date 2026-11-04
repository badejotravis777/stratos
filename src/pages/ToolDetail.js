import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './ToolDetail.css';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import ChatSidebar from '../components/ChatSidebar';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';

const CopyIcon = () => (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>);
const CheckIcon = () => (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>);
const DownloadIcon = () => (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>);
const ExternalIcon = () => (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>);
const BackIcon = () => (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>);
const BulbIcon = () => (<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"></path></svg>);
const ClockIcon = () => (<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>);
const WordFileIcon = () => (<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>);
const SlideFileIcon = () => (<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>);
const CanvaIcon = () => (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="4"></rect><path d="M8 12a4 4 0 1 0 8 0"></path></svg>);

const ACCENTS_BY_TYPE = {
  template: '#D97706',
  caption: '#DB2777',
  guide: '#2563EB',
  script: '#7C3AED',
  calendar: '#0D9488',
  prompt: '#EA580C',
};

const WHY_THIS_WORKS = {
  template: "A ready template turns editing from a blank-canvas decision into a short customization job. The hard creative choices — layout, spacing, hierarchy — are already made. You're personalizing, not designing from scratch.",
  caption: "The captions that get saved and shared usually do one thing well: open with a real hook, close with exactly one ask. Asking for saves, follows, and comments all in the same caption tends to get none of them.",
  guide: "A guide you read once and reuse beats reinventing your approach every time you sit down to post. The point isn't to read it twice — it's to apply it for weeks without thinking about it again.",
  script: "A script that sounds like an actual person talking will always outperform one that reads like a form message. Small, specific wording usually matters more than people expect.",
  calendar: "The biggest reason creators go inconsistent usually isn't a lack of ideas — it's the daily decision of what to post today. A plan removes that decision before it can stall you.",
  prompt: "A specific question gets a real reply. A generic 'ask me anything' rarely does — give people something concrete to react to.",
};

const parseBlocks = (text) => {
  if (!text) return [];
  return text.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean).map((block) => {
    const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
    const first = lines[0] || '';
    const numberedMatch = first.match(/^(\d+)\.\s*(.*)/);
    if (numberedMatch) return { type: 'numbered', number: numberedMatch[1], raw: block, lines: [numberedMatch[2], ...lines.slice(1)] };
    const isLabel = /:$/.test(first) || (first === first.toUpperCase() && first.length > 3 && lines.length > 1);
    if (isLabel) return { type: 'labeled', label: first.replace(/:$/, ''), raw: block, lines: lines.slice(1) };
    return { type: 'plain', raw: block, lines };
  });
};

const getFileKind = (url = '') => {
  if (url.endsWith('.pptx')) return { icon: <SlideFileIcon />, label: 'PowerPoint Presentation', openLabel: 'Open in PowerPoint' };
  if (url.endsWith('.docx')) return { icon: <WordFileIcon />, label: 'Word Document', openLabel: 'Open in Word' };
  return { icon: <WordFileIcon />, label: 'Downloadable File', openLabel: 'Open file' };
};

const useCountUp = (target) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (target == null) return;
    let start = null;
    const duration = 700;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target]);
  return value;
};

const ToolDetail = () => {
  const { toolId } = useParams();
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [tool, setTool] = useState(null);
  const [usageCount, setUsageCount] = useState(null);
  const [relatedTools, setRelatedTools] = useState([]);
  const [planDay, setPlanDay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const userId = profile?.id;
  const nicheName = profile?.niches?.name || 'Fashion';
  const animatedCount = useCountUp(usageCount);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const { data: toolRow } = await supabase.from('tools').select('*').eq('id', toolId).maybeSingle();
      setTool(toolRow);

      if (toolRow) {
        const { data: countData } = await supabase.rpc('get_tool_usage_count', { tool_id_param: toolId });
        setUsageCount(countData ?? 0);

        const { data: related } = await supabase
          .from('tools')
          .select('id, title, type, category')
          .eq('niche_id', toolRow.niche_id)
          .eq('category', toolRow.category)
          .neq('id', toolId)
          .limit(3);
        setRelatedTools(related || []);

        const { data: taskRow } = await supabase
          .from('daily_tasks')
          .select('day_number, title')
          .eq('tool_id', toolId)
          .maybeSingle();
        setPlanDay(taskRow || null);

        if (userId) {
          await supabase.from('user_tool_usage').insert({ user_id: userId, tool_id: toolId, source: 'tool_detail' });
        }
      }

      setLoading(false);
    };

    load();
  }, [toolId, userId]);

  const blocks = parseBlocks(tool?.content_text);
  const fileKind = tool?.asset_url ? getFileKind(tool.asset_url) : null;
  const accent = ACCENTS_BY_TYPE[tool?.type] || '#EA580C';

  const copyBlock = (raw, index) => {
    navigator.clipboard.writeText(raw);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(tool.content_text || '');
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1800);
  };

  if (loading) {
    return (
      <div className="layout-container">
        <Sidebar />
        <main className="main-content">
          <TopBar title="Loading..." niche={nicheName} isChatOpen={isChatOpen} onToggleChat={() => setIsChatOpen(!isChatOpen)} />
          <div className="main-content-inner"><p style={{ color: '#9CA3AF' }}>Loading tool...</p></div>
        </main>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="layout-container">
        <Sidebar />
        <main className="main-content">
          <TopBar title="Not found" niche={nicheName} isChatOpen={isChatOpen} onToggleChat={() => setIsChatOpen(!isChatOpen)} />
          <div className="main-content-inner">
            <p style={{ color: '#9CA3AF' }}>This tool doesn't exist or was removed.</p>
            <button className="td-back-link" onClick={() => navigate(-1)}><BackIcon /> Go back</button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="layout-container">
      <Sidebar />

      <main className="main-content">
        <TopBar title={tool.title} niche={nicheName} isChatOpen={isChatOpen} onToggleChat={() => setIsChatOpen(!isChatOpen)} />

        <div className="main-content-inner">
          <button className="td-back-link" onClick={() => navigate(-1)}>
            <BackIcon /> Back to toolkit
          </button>

          {/* HERO */}
          <div className="td-hero" style={{ '--accent': accent }}>
            <div className="td-hero-glow" />
            <div className="td-hero-content">
              <span className="td-eyebrow">
                <span className="td-eyebrow-dot" /> {tool.category} · {tool.type}
              </span>
              <h1>{tool.title}</h1>
              <p className="td-hero-desc">{tool.description}</p>

              <div className="td-hero-stats">
                <div className="td-stat">
                  <span className="td-stat-num">{animatedCount}</span>
                  <span className="td-stat-label">{animatedCount === 1 ? 'time opened' : 'times opened'}</span>
                </div>
                {planDay && (
                  <Link to="/growth-plan" className="td-stat td-stat-link">
                    <ClockIcon />
                    <span className="td-stat-label">Day {planDay.day_number} of your plan</span>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* PRIMARY ACTIONS */}
          <div className="td-actions">
            {tool.content_text && (
              <button className="td-action-btn" onClick={copyAll} style={{ '--btn-accent': accent }}>
                <span className="td-action-icon">{copiedAll ? <CheckIcon /> : <CopyIcon />}</span>
                {copiedAll ? 'Copied to clipboard' : 'Copy all to clipboard'}
              </button>
            )}
            {tool.asset_url && (
              <>
                <a href={tool.asset_url} download className="td-action-btn" style={{ '--btn-accent': accent }}>
                  <span className="td-action-icon"><DownloadIcon /></span>
                  Download the file
                </a>
                <a href={tool.asset_url} target="_blank" rel="noopener noreferrer" className="td-action-btn" style={{ '--btn-accent': accent }}>
                  <span className="td-action-icon"><ExternalIcon /></span>
                  {fileKind.openLabel}
                </a>
              </>
            )}
            {!tool.asset_url && tool.type === 'template' && (
              <a href="https://www.canva.com" target="_blank" rel="noopener noreferrer" className="td-action-btn" style={{ '--btn-accent': accent }}>
                <span className="td-action-icon"><CanvaIcon /></span>
                Open Canva to design this
              </a>
            )}
          </div>

          {/* WHY THIS WORKS */}
          {WHY_THIS_WORKS[tool.type] && (
            <div className="td-why" style={{ '--accent': accent }}>
              <div className="td-why-icon"><BulbIcon /></div>
              <div>
                <h4>Why this works</h4>
                <p>{WHY_THIS_WORKS[tool.type]}</p>
              </div>
            </div>
          )}

          {/* FILE PREVIEW CARD */}
          {tool.asset_url && (
            <a href={tool.asset_url} target="_blank" rel="noopener noreferrer" className="td-file-card" style={{ '--accent': accent }}>
              <div className="td-file-icon">{fileKind.icon}</div>
              <div className="td-file-info">
                <h5>{tool.title}</h5>
                <p>{fileKind.label}</p>
              </div>
              <ExternalIcon />
            </a>
          )}

          {/* CONTENT BLOCKS */}
          {blocks.length > 0 && (
            <div className="td-content-section">
              <h4 className="td-section-title">What's inside</h4>
              <div className="td-blocks">
                {blocks.map((block, i) => (
                  <div className="td-block" key={i} style={{ animationDelay: `${i * 40}ms` }}>
                    <button className="td-block-copy" onClick={() => copyBlock(block.raw, i)}>
                      {copiedIndex === i ? <CheckIcon /> : <CopyIcon />}
                    </button>
                    {block.type === 'numbered' && (
                      <div className="td-block-numbered">
                        <span className="td-block-num" style={{ '--accent': accent }}>{block.number}</span>
                        <div className="td-block-text">{block.lines.map((l, j) => <p key={j}>{l}</p>)}</div>
                      </div>
                    )}
                    {block.type === 'labeled' && (
                      <div>
                        <span className="td-block-label" style={{ '--accent': accent }}>{block.label}</span>
                        <div className="td-block-text">{block.lines.map((l, j) => <p key={j}>{l}</p>)}</div>
                      </div>
                    )}
                    {block.type === 'plain' && (
                      <div className="td-block-text">{block.lines.map((l, j) => <p key={j}>{l}</p>)}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RELATED TOOLS */}
          {relatedTools.length > 0 && (
            <div className="td-related-section">
              <h4 className="td-section-title">More in {tool.category}</h4>
              <div className="td-related-grid">
                {relatedTools.map((rt) => (
                  <div key={rt.id} className="td-related-card" onClick={() => navigate(`/tool/${rt.id}`)}>
                    <span className="td-related-type">{rt.type}</span>
                    <h5>{rt.title}</h5>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <ChatSidebar
        isOpen={isChatOpen}
        welcomeMessage={`Want help using "${tool.title}"? Just ask.`}
        prompts={['Write caption', 'Content ideas', 'What to post', 'DM script']}
        specialist={`${nicheName} Specialist`}
      />
    </div>
  );
};

export default ToolDetail;