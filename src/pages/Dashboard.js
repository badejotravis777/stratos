import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuUsers, LuCirclePlay, LuPhoneCall } from "react-icons/lu";
import "./Dashboard.css";
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import ChatSidebar from '../components/ChatSidebar';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { getCurrentDay } from '../utils/planDay';
import { ToolTypeIcon, toolTag } from '../components/ToolTypeIcon';
import { COMMUNITY_LINK, STRATEGY_CALL_LINK } from '../lib/contact';

const QUICK_ACCESS = [
  { title: "Join the community", desc: "Live tips and wins, on WhatsApp", href: COMMUNITY_LINK, icon: LuUsers, external: true },
  { title: "How Stratos works", desc: "A quick walkthrough of the toolkit", to: "/#how-it-works", icon: LuCirclePlay },
  { title: "Book a strategy call", desc: "Free while you're in early access", href: STRATEGY_CALL_LINK, icon: LuPhoneCall, external: true },
];

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
);

// Today's linked tool first, then tools from the same category, then the rest.
const pickResources = (tools, linkedTool) => {
  const picked = linkedTool ? [linkedTool] : [];
  const rest = tools.filter((t) => t.id !== linkedTool?.id);
  const sameCategory = linkedTool ? rest.filter((t) => t.category === linkedTool.category) : [];
  const others = rest.filter((t) => !sameCategory.includes(t));
  return [...picked, ...sameCategory, ...others].slice(0, 3);
};

const CHECKLIST_STEPS = [
  "Pick a Canva template",
  "Write your caption",
  "Add a CTA",
  "Post today",
];

const Dashboard = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [resources, setResources] = useState([]);
  const [todayTask, setTodayTask] = useState(null);
  const [nextTask, setNextTask] = useState(null);
  const [checklist, setChecklist] = useState(CHECKLIST_STEPS.map(() => false));
  const [completedDays, setCompletedDays] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentDay = getCurrentDay(profile?.plan_start_date);
  const nicheId = profile?.niche_id;
  const userId = profile?.id;

  useEffect(() => {
    if (!userId) return;
    if (!nicheId) {
      setLoading(false);
      return;
    }

    const loadDashboard = async () => {
      setLoading(true);

      const { data: taskRow } = await supabase
        .from("daily_tasks")
        .select("*, tools(id, title, description, type, category)")
        .eq("niche_id", nicheId)
        .eq("day_number", currentDay)
        .maybeSingle();
      setTodayTask(taskRow);

      const { data: nicheTools } = await supabase
        .from("tools")
        .select("id, title, description, type, category")
        .eq("niche_id", nicheId)
        .order("title", { ascending: true });
      setResources(pickResources(nicheTools || [], taskRow?.tools || null));

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
  const todayToolId = todayTask?.tools?.id || todayTask?.tool_id;

  const startTask = () => navigate(todayToolId ? `/tool/${todayToolId}` : "/growth-plan");

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

          <button type="button" className="deal-check-promo" onClick={() => navigate("/deal-check")}>
            <span className="deal-check-promo-tag">New</span>
            <span className="deal-check-promo-text">
              <strong>Got a brand deal? Check it before you sign.</strong>
              <span>Deal Check spots red flags and scams, tells you what to charge, and writes your reply.</span>
            </span>
            <span className="deal-check-promo-cta">Check a deal &rarr;</span>
          </button>

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
                    <button className="start-task-btn" onClick={startTask}>
                      {todayToolId ? "Start task" : "Open plan"}
                    </button>
                    <button className="view-plan-btn" onClick={() => navigate("/growth-plan")}>View plan</button>
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
                  <Link to="/growth-plan" className="text-orange">View plan</Link>
                </div>
              </div>

              <button type="button" className="status-card stratos-guide" onClick={() => setIsChatOpen(true)}>
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
              </button>

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
              <Link to="/niche-toolkit" className="text-orange">See full toolkit &rarr;</Link>
            </div>
            {resources.length === 0 ? (
              <p className="resources-empty">Tools for your niche are on the way. Check the toolkit soon.</p>
            ) : (
              <div className="resources-grid">
                {resources.map((tool, i) => {
                  const tag = toolTag(tool.type);
                  const isToday = i === 0 && tool.id === todayToolId;
                  return (
                    <Link to={`/tool/${tool.id}`} className="resource-card" key={tool.id}>
                      <div className="card-top">
                        <div className="resource-icon-box"><ToolTypeIcon type={tool.type} /></div>
                        <div className="resource-tags">
                          {isToday && <span className="tag today">FOR TODAY</span>}
                          <span className={`tag ${tag.variant}`}>{tag.label}</span>
                        </div>
                      </div>
                      <div className="card-bottom"><h4>{tool.title}</h4><p>{tool.description}</p></div>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>

          <section className="section-block">
            <h3 className="section-title">QUICK ACCESS</h3>
            <div className="quick-access-grid">
              {QUICK_ACCESS.map(({ title, desc, href, to, icon: Icon, external }) => {
                const inner = (
                  <>
                    <div className="qa-icon"><Icon aria-hidden="true" /></div>
                    <div className="qa-text"><h4>{title}</h4><p>{desc}</p></div>
                    <div className="qa-arrow"><ArrowIcon /></div>
                  </>
                );
                return external ? (
                  <a key={title} className="qa-card" href={href} target="_blank" rel="noopener noreferrer">{inner}</a>
                ) : (
                  <Link key={title} className="qa-card" to={to}>{inner}</Link>
                );
              })}
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