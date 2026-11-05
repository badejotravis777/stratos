import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LuRotateCcw } from 'react-icons/lu';
import { FunctionsHttpError } from '@supabase/supabase-js';
import './Layout.css';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import { whatsappLink } from '../lib/contact';

const BotIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="9" cy="16" r="1"></circle><circle cx="15" cy="16" r="1"></circle><path d="M12 11V7"></path><path d="M9 7h6"></path></svg>
);

// Prompt chips are short labels; send the guide a fuller question.
const CHIP_PROMPTS = {
  'Write caption': "Write me a caption for today's post.",
  'Content ideas': 'Give me 3 content ideas for this week.',
  'What to post': 'What should I post today?',
  'DM script': 'Write a short DM I can send to a potential client or brand.',
  'Grow my reach': 'How do I grow my reach this month?',
  'More engagement': 'My posts get low engagement. What should I change first?',
  'Launch a product': 'Help me plan content for a product launch.',
  'Make money': 'How can I start making money from my audience?',
  'Find pitch decks': 'Which Stratos tools help me pitch to brands?',
  'Growth guides': 'Which guide should I read first to grow faster?',
  'Content planners': 'Help me plan my content for the next 7 days.',
  'Video hooks': 'Give me 5 hooks for my next Reel or TikTok.',
};

const PAGE_NAMES = {
  dashboard: 'Dashboard',
  'growth-plan': 'Growth Plan',
  categories: 'Categories',
  'niche-toolkit': 'Niche Toolkit',
  resources: 'Resources',
  tool: 'Tool',
  profile: 'Profile',
  settings: 'Settings',
};

const HELP_LINK = whatsappLink('Hi Stratos! I have a question.');

const storageKey = (userId) => `stratos-guide:${userId || 'anon'}`;

const loadHistory = (userId) => {
  try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey(userId)) || '[]');
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

async function describeError(error) {
  if (error instanceof FunctionsHttpError) {
    const status = error.context?.status;
    if (status === 404) return { text: "Stratos Guide isn't switched on yet.", offline: true };
    try {
      const body = await error.context.json();
      if (body?.error) return { text: body.error, offline: status >= 500 };
    } catch {
      /* fall through */
    }
  }
  return { text: "I can't reach Stratos Guide right now.", offline: true };
}

const ChatSidebar = ({ isOpen, welcomeMessage, prompts = [], specialist = 'Fashion Specialist' }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [messages, setMessages] = useState(() => loadHistory(user?.id));
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  const page = PAGE_NAMES[location.pathname.split('/')[1]?.toLowerCase()] || null;

  useEffect(() => {
    try {
      sessionStorage.setItem(storageKey(user?.id), JSON.stringify(messages.slice(-40)));
    } catch {
      /* storage unavailable: chat still works for this page */
    }
  }, [messages, user?.id]);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, sending, isOpen]);

  if (!isOpen) return null;

  const send = async (text) => {
    const content = text.trim();
    if (!content || sending) return;

    const history = [...messages, { role: 'user', content }];
    setMessages(history);
    setInput('');
    setSending(true);

    const { data, error } = await supabase.functions.invoke('stratos-guide', {
      body: {
        page,
        // Error notices are UI-only; never send them back as conversation.
        messages: history.filter((m) => !m.isError).map(({ role, content: c }) => ({ role, content: c })),
      },
    });

    if (error || !data?.reply) {
      const { text: errorText, offline } = error
        ? await describeError(error)
        : { text: "I didn't get a reply. Please try again.", offline: false };
      setMessages((prev) => [...prev, { role: 'assistant', content: errorText, isError: true, offline }]);
    } else {
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    }

    setSending(false);
    inputRef.current?.focus();
  };

  const hasConversation = messages.some((m) => m.role === 'user');

  return (
    <aside className="chat-sidebar" aria-label="Stratos Guide chat">
      <div className="chat-header">
        <div className="ai-robot-avatar"><BotIcon /></div>
        <div className="chat-title">
          <h3>Stratos Guide</h3>
          <p>Online · {specialist}</p>
        </div>
        {hasConversation && (
          <button
            type="button"
            className="chat-reset-btn"
            onClick={() => setMessages([])}
            title="Start a new chat"
            aria-label="Start a new chat"
            disabled={sending}
          >
            <LuRotateCcw aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="chat-body" ref={bodyRef} aria-live="polite">
        <div className="chat-message">
          <div className="ai-robot-avatar small"><BotIcon /></div>
          <div className="message-bubble">{welcomeMessage}</div>
        </div>

        {messages.map((m, i) =>
          m.role === 'user' ? (
            <div className="chat-message user" key={i}>
              <div className="message-bubble user">{m.content}</div>
            </div>
          ) : (
            <div className="chat-message" key={i}>
              <div className="ai-robot-avatar small"><BotIcon /></div>
              <div className={`message-bubble${m.isError ? ' error' : ''}`}>
                {m.content}
                {m.isError && m.offline && (
                  <>
                    {' '}
                    <a href={HELP_LINK} target="_blank" rel="noopener noreferrer">Chat with the team on WhatsApp</a>
                  </>
                )}
              </div>
            </div>
          )
        )}

        {sending && (
          <div className="chat-message">
            <div className="ai-robot-avatar small"><BotIcon /></div>
            <div className="message-bubble typing" aria-label="Stratos Guide is typing">
              <span /><span /><span />
            </div>
          </div>
        )}
      </div>

      <div className="chat-footer">
        {!hasConversation && prompts.length > 0 && (
          <div className="suggestion-chips">
            {prompts.map((prompt) => (
              <button
                type="button"
                className="chip"
                key={prompt}
                onClick={() => send(CHIP_PROMPTS[prompt] || prompt)}
                disabled={sending}
              >
                {prompt}
              </button>
            ))}
          </div>
        )}
        <form
          className="chat-input-row"
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <div className="chat-input-wrapper">
            <input
              ref={inputRef}
              type="text"
              className="chat-input"
              placeholder="Ask anything..."
              aria-label="Message Stratos Guide"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={4000}
            />
          </div>
          <button type="submit" className="send-btn" disabled={sending || !input.trim()} aria-label="Send message">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </form>
      </div>
    </aside>
  );
};

export default ChatSidebar;
