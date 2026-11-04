import React, { useState, useEffect } from 'react';
import './ToolModal.css';

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const CopyIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
);
const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
);
const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
);
const WordFileIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
);
const SlideFileIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
);

const parseBlocks = (text) => {
  if (!text) return [];
  return text
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean)
    .map((block) => {
      const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
      const first = lines[0] || '';

      const numberedMatch = first.match(/^(\d+)\.\s*(.*)/);
      if (numberedMatch) {
        return { type: 'numbered', number: numberedMatch[1], raw: block, lines: [numberedMatch[2], ...lines.slice(1)] };
      }

      const isLabel = /:$/.test(first) || (first === first.toUpperCase() && first.length > 3 && lines.length > 1);
      if (isLabel) {
        return { type: 'labeled', label: first.replace(/:$/, ''), raw: block, lines: lines.slice(1) };
      }

      return { type: 'plain', raw: block, lines };
    });
};

const getFileKind = (url = '') => {
  if (url.endsWith('.pptx')) return { icon: <SlideFileIcon />, label: 'PowerPoint Presentation', openLabel: 'Open in PowerPoint', accent: '#D97706' };
  if (url.endsWith('.docx')) return { icon: <WordFileIcon />, label: 'Word Document', openLabel: 'Open in Word', accent: '#2563EB' };
  return { icon: <WordFileIcon />, label: 'Downloadable File', openLabel: 'Open file', accent: '#EA580C' };
};

const ToolModal = ({ tool, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (tool) requestAnimationFrame(() => setVisible(true));
    else setVisible(false);
  }, [tool]);

  if (!tool) return null;

  const blocks = parseBlocks(tool.content_text);
  const fileKind = tool.asset_url ? getFileKind(tool.asset_url) : null;

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

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 150);
  };

  return (
    <div className={`tool-modal-overlay ${visible ? 'visible' : ''}`} onClick={handleClose}>
      <div className={`tool-modal ${visible ? 'visible' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="tool-modal-header">
          <div className="tool-modal-heading">
            {tool.category && (
              <span className="tool-modal-eyebrow">
                <span className="tool-modal-eyebrow-dot" />
                {tool.category}{tool.type ? ` / ${tool.type}` : ''}
              </span>
            )}
            <h3>{tool.title}</h3>
            {tool.description && <p className="tool-modal-desc">{tool.description}</p>}
          </div>
          <button className="tool-modal-close" onClick={handleClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>

        {/* Primary action row — the "use it immediately" pills */}
        <div className="tool-action-row">
          {tool.content_text && (
            <button className="tool-action-btn" onClick={copyAll}>
              <span className="tool-action-icon">
                {copiedAll ? <CheckIcon /> : <CopyIcon />}
              </span>
              <span className="tool-action-label">
                {copiedAll ? 'Copied to clipboard' : 'Copy all to clipboard'}
              </span>
            </button>
          )}

          {tool.asset_url && (
            <>
              <a href={tool.asset_url} download className="tool-action-btn" onClick={(e) => e.stopPropagation()}>
                <span className="tool-action-icon" style={{ '--icon-accent': fileKind.accent }}>
                  <DownloadIcon />
                </span>
                <span className="tool-action-label">Download the file</span>
              </a>
              <a href={tool.asset_url} target="_blank" rel="noopener noreferrer" className="tool-action-btn" onClick={(e) => e.stopPropagation()}>
                <span className="tool-action-icon" style={{ '--icon-accent': fileKind.accent }}>
                  <ExternalIcon />
                </span>
                <span className="tool-action-label">{fileKind.openLabel}</span>
              </a>
            </>
          )}
        </div>

        <div className="tool-modal-body">
          {tool.asset_url && (
            <a
              href={tool.asset_url}
              target="_blank"
              rel="noopener noreferrer"
              className="tool-file-card"
              style={{ '--file-accent': fileKind.accent }}
            >
              <div className="tool-file-icon">{fileKind.icon}</div>
              <div className="tool-file-info">
                <h5>{tool.title}</h5>
                <p>{fileKind.label}</p>
              </div>
              <div className="tool-file-chevron">
                <ExternalIcon />
              </div>
            </a>
          )}

          {blocks.length > 0 && (
            <div className="tool-modal-blocks">
              {blocks.map((block, i) => (
                <div className="tool-block" key={i} style={{ animationDelay: `${i * 35}ms` }}>
                  <button
                    className="tool-block-copy"
                    onClick={() => copyBlock(block.raw, i)}
                    aria-label="Copy this"
                  >
                    {copiedIndex === i ? <CheckIcon /> : <CopyIcon />}
                  </button>

                  {block.type === 'numbered' && (
                    <div className="tool-block-numbered">
                      <span className="tool-block-num">{block.number}</span>
                      <div className="tool-block-text">
                        {block.lines.map((l, j) => <p key={j}>{l}</p>)}
                      </div>
                    </div>
                  )}

                  {block.type === 'labeled' && (
                    <div>
                      <span className="tool-block-label">{block.label}</span>
                      <div className="tool-block-text">
                        {block.lines.map((l, j) => <p key={j}>{l}</p>)}
                      </div>
                    </div>
                  )}

                  {block.type === 'plain' && (
                    <div className="tool-block-text">
                      {block.lines.map((l, j) => <p key={j}>{l}</p>)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {!tool.content_text && !tool.asset_url && (
            <div className="tool-modal-empty">
              <p>This template isn't uploaded yet — check back soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolModal;