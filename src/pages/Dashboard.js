import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import ChatSidebar from '../components/ChatSidebar';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { getCurrentDay } from '../utils/planDay';

const CHECKLIST_STEPS = [
  "Pick a Canva template",
  "Write your caption",
  "Add a CTA",
  "Post today",
];

const Dashboard = () => {
  const { profile } = useAuth();
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [todayTask, setTodayTask] = useState(null);
  const [nextTask, setNextTask] = useState(null);
  const [checklist, setChecklist] = useState(CHECKLIST_STEPS.map(() => false));
  const [completedDays, setCompletedDays] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentDay = getCurrentDay(profile?.plan_start_date);
  const nicheId = profile?.niche_id;
  const userId = profile?.id;

  useEffect(() => {
    if (!nicheId || !userId) return;

    const loadDashboard = async () => {
      setLoading(true);

      const { data: taskRow } = await supabase
        .from("daily_tasks")
        .select("*, tools(title, description)")
        .eq("niche_id", nicheId)
        .eq("day_number", currentDay)
        .maybeSingle();
      setTodayTask(taskRow);

      const { data: upNextRow } = await supabase
        .from("daily_tasks")
        .select("day_number, title, description")
        .eq("niche_id", nicheId)
        .eq("day_number", currentDay + 1)
        .maybeSingle();
      setNextTask(upNextRow);

      const { data: progressRows } = await supabase
        .from("user_progress")
        .select("day_number, completed_at")
        .eq("user_id", userId)
        .not("completed_at", "is", null);
      setCompletedDays((progressRows || []).map((r) => r.day_number));

      const isDayDone = (progressRows || []).some((r) => r.day_number === currentDay);
      setChecklist(CHECKLIST_STEPS.map(() => isDayDone));

      setLoading(false);
    };

    loadDashboard();
  }, [nicheId, userId, currentDay]);

  const toggleStep = (index) => {
    setChecklist((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const completedCount = checklist.filter(Boolean).length;
  const allDone = completedCount === CHECKLIST_STEPS.length;

  useEffect(() => {
    if (!allDone || !userId) return;

    const markComplete = async () => {
      await supabase
        .from("user_progress")
        .upsert(
          { user_id: userId, day_number: currentDay, completed_at: new Date().toISOString() },
          { onConflict: "user_id,day_number" }
        );
      setCompletedDays((prev) => (prev.includes(currentDay) ? prev : [...prev, currentDay]));
    };

    markComplete();
  }, [allDone, userId, currentDay]);

  // Week strip: group into weeks of 7 relative to Day 1, not calendar weekdays
  const weekStart = Math.floor((currentDay - 1) / 7) * 7 + 1;
  const weekDays = Array.from({ length: 7 }, (_, i) => weekStart + i).filter((d) => d <= 30);
  const daysDoneThisWeek = weekDays.filter((d) => completedDays.includes(d)).length;

  const firstName = profile?.first_name || "there";
  const streak = completedDays.length;

  if (loading) {
    return (
      <div className="layout-container">
        <Sidebar />
        <main className="main-content">
          <TopBar title="Dashboard" niche={profile?.niches?.name || "Fashion"} isChatOpen={isChatOpen} onToggleChat={() => setIsChatOpen(!isChatOpen)} />
          <div className="main-content-inner">
            <p style={{ color: "#9CA3AF" }}>Loading your plan...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="layout-container">
      <Sidebar />

      <main className="main-content">
        <TopBar title="Dashboard" niche={profile?.niches?.name || "Fashion"} isChatOpen={isChatOpen} onToggleChat={() => setIsChatOpen(!isChatOpen)} />

        <div className="main-content-inner">
          <div className="welcome-area">
            <div className="welcome-text">
              <h1>Good to see you, <span className="text-orange">{firstName}.</span></h1>
              <p className="subtitle">Here's what to do today.</p>
              <div className="progress-dot-text">
                <span className="dot"></span> {daysDoneThisWeek} of {weekDays.length} days done this week.
              </div>
            </div>
            <div className="streak-badge">
              <span className="streak-number">{streak}</span>
              <svg className="streak-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
          </div>

          <div className="content-grid">
            <div className="task-card">
              {todayTask ? (
                <>
                  <p className="task-kicker text-orange">
                    TODAY'S GROWTH STEP • DAY {currentDay} OF 30 • {(profile?.niches?.name || "FASHION").toUpperCase()} PLAN
                  </p>
                  <h2 className="task-title">{todayTask.title}</h2>
                  <p className="task-desc">{todayTask.description}</p>
                </>
              ) : (
                <>
                  <p className="task-kicker text-orange">DAY {currentDay} OF 30</p>
                  <h2 className="task-title">No task found for today</h2>
                  <p className="task-desc">This day hasn't been set up yet for your niche.</p>
                </>
              )}

              <div className="task-list-container">
                <div className="task-list">
                  {CHECKLIST_STEPS.map((step, i) => (
                    <label key={i} className={`task-item ${checklist[i] ? 'completed' : ''}`}>
                      <input type="checkbox" checked={checklist[i]} onChange={() => toggleStep(i)} />
                      <span className="custom-checkbox"></span>
                      {step}
                    </label>
                  ))}
                </div>

                <div className="task-progress-box">
                  <div className="progress-header">
                    <span>Progress</span>
                    <span className="text-orange">{completedCount} / {CHECKLIST_STEPS.length} done</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${(completedCount / CHECKLIST_STEPS.length) * 100}%` }}></div>
                  </div>
                  <div className="task-actions">
                    <button className="start-task-btn">Start task</button>
                    <button className="view-plan-btn">View plan</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="status-column">
              <div className="status-card this-week">
                <div className="week-header"><h3>THIS WEEK</h3></div>
                <div className="days-row">
                  {weekDays.map((d) => (
                    <div key={d} className={`day ${completedDays.includes(d) ? 'completed' : d === currentDay ? 'active' : ''}`}>
                      <div className="circle">
                        {completedDays.includes(d) ? (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        ) : d}
                      </div>
                      <span>Day {d}</span>
                    </div>
                  ))}
                </div>
                <div className="week-footer">
                  <p>{daysDoneThisWeek} of {weekDays.length} days done</p>
                  <a href="/growth-plan" className="text-orange">View plan</a>
                </div>
              </div>

              <div className="status-card stratos-guide">
                <div className="guide-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                </div>
                <div className="guide-text">
                  <h4>Stratos Guide</h4>
                  <p>Ask anything about your growth plan</p>
                </div>
                <div className="arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </div>
              </div>

              {nextTask && (
                <div className="status-card up-next">
                  <p className="kicker">UP NEXT · DAY {nextTask.day_number}</p>
                  <h4>{nextTask.title}</h4>
                  <p>{nextTask.description}</p>
                </div>
              )}
            </div>
          </div>

          <section className="section-block">
            <div className="section-header">
              <h3>Today's Resources</h3>
              <a href="/niche-toolkit" className="text-orange">See full toolkit &rarr;</a>
            </div>
            <div className="resources-grid">
              <div className="resource-card">
                <div className="card-top"><div className="resource-icon-box"></div><span className="tag template">TEMPLATE</span></div>
                <div className="card-bottom"><h4>GRWM Carousel Template</h4><p>9-slide Canva template built for fashion carousels. Just add your photos.</p></div>
              </div>
              <div className="resource-card">
                <div className="card-top"><div className="resource-icon-box"></div><span className="tag copy">COPY</span></div>
                <div className="card-bottom"><h4>Caption Starter Pack</h4><p>3 ready-to-use captions for GRWM posts. Pick one, make it yours.</p></div>
              </div>
              <div className="resource-card">
                <div className="card-top"><div className="resource-icon-box"></div><span className="tag guide">GUIDE</span></div>
                <div className="card-bottom"><h4>Posting CTA Guide</h4><p>What to say at the end of your post to drive saves, follows, and DMs.</p></div>
              </div>
            </div>
          </section>

          <section className="section-block">
            <h3 className="section-title">QUICK ACCESS</h3>
            <div className="quick-access-grid">
              <div className="qa-card"><div className="qa-icon"></div><div className="qa-text"><h4>Join the community</h4><p>Live tips and wins, on WhatsApp</p></div><div className="qa-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div></div>
              <div className="qa-card"><div className="qa-icon"></div><div className="qa-text"><h4>How Stratos works</h4><p>A 2-minute walkthrough</p></div><div className="qa-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div></div>
              <div className="qa-card"><div className="qa-icon"></div><div className="qa-text"><h4>Book a strategy call</h4><p>Free while you're in early access</p></div><div className="qa-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div></div>
            </div>
          </section>
        </div>
      </main>

      <ChatSidebar
        isOpen={isChatOpen}
        welcomeMessage={todayTask ? `Hey ${firstName}! You're on Day ${currentDay} of your plan. Today's task is "${todayTask.title}". Want help with it?` : `Hey ${firstName}! Ask me anything about your growth plan.`}
        prompts={["Write caption", "Content ideas", "What to post", "DM script"]}
      />
    </div>
  );
};

export default Dashboard;