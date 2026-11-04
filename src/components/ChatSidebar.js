import React from 'react';
import './Layout.css';

const ChatSidebar = ({ isOpen, welcomeMessage, prompts = [], specialist = "Fashion Specialist" }) => {
  if (!isOpen) return null;

  return (
    <aside className="chat-sidebar">
      <div className="chat-header">
        <div className="ai-robot-avatar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="9" cy="16" r="1"></circle><circle cx="15" cy="16" r="1"></circle><path d="M12 11V7"></path><path d="M9 7h6"></path></svg>
        </div>
        <div className="chat-title">
          <h3>Stratos Guide</h3>
          <p>Online · {specialist}</p>
        </div>
      </div>

      <div className="chat-body">
        <div className="chat-message">
          <div className="ai-robot-avatar small">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="9" cy="16" r="1"></circle><circle cx="15" cy="16" r="1"></circle><path d="M12 11V7"></path><path d="M9 7h6"></path></svg>
          </div>
          <div className="message-bubble">{welcomeMessage}</div>
        </div>
      </div>

      <div className="chat-footer">
        <div className="suggestion-chips">
          {prompts.map((prompt, i) => (
            <button className="chip" key={i}>{prompt}</button>
          ))}
        </div>
        <div className="chat-input-row">
          <div className="chat-input-wrapper">
            <input type="text" className="chat-input" placeholder="Ask anything..." />
          </div>
          <button className="send-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default ChatSidebar;