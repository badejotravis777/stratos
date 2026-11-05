import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuChevronRight } from 'react-icons/lu';
import './Categories.css';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import ChatSidebar from '../components/ChatSidebar';
import { GoalIcon } from '../components/ToolTypeIcon';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { GOALS, toolMatchesGoal } from '../lib/goals';
import { getCurrentDay } from '../utils/planDay';

const Categories = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [tools, setTools] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const nicheId = profile?.niche_id;
  const nicheName = profile?.niches?.name || 'Fashion';
  const currentDay = getCurrentDay(profile?.plan_start_date);

  useEffect(() => {
    if (!nicheId) return;
    const load = async () => {
      const { data } = await supabase
        .from('tools')
        .select('id, title, description, type, category')
        .eq('niche_id', nicheId);
      setTools(data || []);
      setLoaded(true);
    };
    load();
  }, [nicheId]);

  const counts = useMemo(
    () => Object.fromEntries(GOALS.map((g) => [g.id, tools.filter((t) => toolMatchesGoal(t, g)).length])),
    [tools]
  );

  return (
    <div className="layout-container">
      <Sidebar />

      <main className="main-content">
        <TopBar title="Categories" niche={nicheName} isChatOpen={isChatOpen} onToggleChat={() => setIsChatOpen(!isChatOpen)} />

        <div className="main-content-inner">
          <div className="goals-section">
            <div className="goals-header">
              <h2>What's your goal?</h2>
              <p>Pick a goal. We'll show you the right {nicheName} tools for it.</p>
            </div>

            <div className="goals-grid">
              {GOALS.map((goal) => {
                const count = counts[goal.id] || 0;
                return (
                  <button
                    type="button"
                    className="goal-card"
                    key={goal.id}
                    onClick={() => navigate(`/niche-toolkit?goal=${goal.id}`)}
                  >
                    <div className="goal-card-top">
                      <div className="goal-icon-wrapper"><GoalIcon goalId={goal.id} /></div>
                      {loaded && (
                        <span className={`goal-count${count === 0 ? ' is-empty' : ''}`}>
                          {count === 0 ? 'Coming soon' : `${count} tool${count === 1 ? '' : 's'}`}
                        </span>
                      )}
                    </div>
                    <h3>{goal.title}</h3>
                    <p>{goal.desc}</p>
                    <span className="goal-cta">
                      Show me the tools <LuChevronRight aria-hidden="true" />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <ChatSidebar
        isOpen={isChatOpen}
        welcomeMessage={`Hey ${profile?.first_name || 'there'}! You're on Day ${currentDay} of your ${nicheName} plan. Not sure which goal to pick? Tell me what you're stuck on.`}
        prompts={['Grow my reach', 'More engagement', 'Launch a product', 'Make money']}
        specialist={`${nicheName} Specialist`}
      />
    </div>
  );
};

export default Categories;
