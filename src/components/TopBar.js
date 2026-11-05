import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Layout.css';

const TopBar = ({ title, niche = "Fashion", isChatOpen, onToggleChat }) => {
  const navigate = useNavigate();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationsRef = useRef(null);

  useEffect(() => {
    if (!notificationsOpen) return undefined;
    const onPointerDown = (e) => {
      if (!notificationsRef.current?.contains(e.target)) setNotificationsOpen(false);
    };
    const onKey = (e) => e.key === 'Escape' && setNotificationsOpen(false);
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [notificationsOpen]);

  return (
    <header className="top-nav">
      <h2 className="nav-title">{title}</h2>
      <div className="nav-actions">
        <div className="niche-badge">
          <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.38 3.46L16 2 12 5 8 2 3.62 3.46a2 2 0 00-1.35 2.22l1.41 7.44C4.06 15.11 5.86 16 8 16h8c2.14 0 3.94-.89 4.32-2.88l1.41-7.44a2 2 0 00-1.35-2.22z"></path>
            <path d="M12 5v11"></path>
          </svg>
          {niche}
        </div>

        <button className="icon-btn" title="Settings" aria-label="Settings" onClick={() => navigate('/settings')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        </button>

        <div className="notifications" ref={notificationsRef}>
          <button
            className={`icon-btn ${notificationsOpen ? 'active' : ''}`}
            title="Notifications"
            aria-label="Notifications"
            aria-expanded={notificationsOpen}
            aria-haspopup="dialog"
            onClick={() => setNotificationsOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          </button>
          {notificationsOpen && (
            <div className="notifications-panel" role="dialog" aria-label="Notifications">
              <h4>Notifications</h4>
              <p>You're all caught up.</p>
              <Link to="/settings" onClick={() => setNotificationsOpen(false)}>
                Choose what we tell you about &rarr;
              </Link>
            </div>
          )}
        </div>

        <button
          className={`icon-btn ${isChatOpen ? 'active' : ''}`}
          onClick={onToggleChat}
          title="Toggle Stratos Guide"
          aria-label="Toggle Stratos Guide"
          aria-pressed={isChatOpen}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="9" cy="16" r="1"></circle><circle cx="15" cy="16" r="1"></circle><path d="M12 11V7"></path><path d="M9 7h6"></path></svg>
        </button>
      </div>
    </header>
  );
};

export default TopBar;
