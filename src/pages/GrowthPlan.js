import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./GrowthPlan.css";
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import ChatSidebar from '../components/ChatSidebar';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { getCurrentDay } from '../utils/planDay';

const overviewItems = [
  "30 daily tasks",
  "Niche-specific content",
  "Templates included per task",
  "Captions pre-written",
  "Progresses automatically",
];

const GrowthPlan = () => {
  const { profile } = useAuth();
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [completedDays, setCompletedDays] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentDay = getCurrentDay(profile?.plan_start_date);
  const nicheId = profile?.niche_id;
  const userId = profile?.id;
  const nicheName = profile?.niches?.name || "Fashion";

  useEffect(() => {
    if (!nicheId || !userId) return;

    const loadPlan = async () => {
      setLoading(true);

      const { data: taskRows } = await supabase
        .from("daily_tasks")
        .select("day_number, title, description, tool_id, tools(title)")
        .eq("niche_id", nicheId)
        .order("day_number", { ascending: true });
      setTasks(taskRows || []);

      const { data: progressRows } = await supabase
        .from("user_progress")
        .select("day_number")
        .eq("user_id", userId)
        .not("completed_at", "is", null);
      setCompletedDays((progressRows || []).map((r) => r.day_number));

      setLoading(false);
    };

    loadPlan();
  }, [nicheId, userId]);

  const totalDays = 30;
  const percentComplete = Math.round((completedDays.length / totalDays) * 100);

  const getStatus = (dayNumber) => {
    if (completedDays.includes(dayNumber)) return "completed";
    if (dayNumber === currentDay) return "active";
    return "pending";
  };

  if (loading) {
    return (
      <div className="layout-container">
        <Sidebar />
        <main className="main-content">
          <TopBar title="Growth Plan" niche={nicheName} isChatOpen={isChatOpen} onToggleChat={() => setIsChatOpen(!isChatOpen)} />
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
        <TopBar title="Growth Plan" niche={nicheName} isChatOpen={isChatOpen} onToggleChat={() => setIsChatOpen(!isChatOpen)} />

        <div className="main-content-inner">
          <div className="page-header">
            <h1>Growth Plan</h1>
            <p className="subtitle">Your 30-day {nicheName} content roadmap</p>
          </div>

          <div className="plan-grid">
            <div className="tasks-column">
              <div className="plan-banner">
                <h3>{nicheName} Creator Plan · 30 days</h3>
                <p>Daily tasks that build your audience, consistency, and brand systematically.</p>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${percentComplete}%` }}></div>
                </div>
                <div className="progress-labels">
                  <span>Day {currentDay} of {totalDays}</span>
                  <span>{percentComplete}% complete</span>
                </div>
              </div>

              <div className="roadmap-list">
                {tasks.length === 0 ? (
                  <p style={{ color: "#9CA3AF", fontSize: "13px" }}>
                    No tasks have been set up for {nicheName} yet.
                  </p>
                ) : (
                  tasks.map((task) => {
                    const status = getStatus(task.day_number);
                    return (
                      <div key={task.day_number} className={`roadmap-item ${status}`}>
                        <div className="task-icon-wrapper">
                          {status === "completed" ? (
                            <div className="icon-completed">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                          ) : (
                            <div className={`icon-number ${status === "active" ? "active" : ""}`}>
                              {task.day_number}
                            </div>
                          )}
                        </div>
                        <div className="task-details">
                          <h4>
                            {task.title}
                            {status === "active" && <span className="today-pill">Today</span>}
                          </h4>
                          <p>{task.description}</p>
                          {task.tool_id && (
                            <Link to={`/tool/${task.tool_id}`} className="task-tool-link">
                              Open {task.tools?.title || "the tool"} &rarr;
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="meta-column">
              <div className="meta-card">
                <h3 className="meta-title">Plan overview</h3>
                <ul className="overview-list">
                  {overviewItems.map((item, index) => (
                    <li key={index}>
                      <svg className="check-icon-plain" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="meta-card progress-card">
                <h3 className="meta-title">Your progress</h3>
                <div className="progress-center">
                  <div className="progress-large">
                    <span className="current">{completedDays.length}</span>
                    <span className="total">/ {totalDays}</span>
                  </div>
                  <p className="progress-sub">days completed</p>
                  <p className="progress-status">
                    {completedDays.length === 0
                      ? "Let's get started on Day 1."
                      : currentDay > totalDays
                      ? "You've reached the end of your 30 days."
                      : "You're on track. Today's step is ready."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ChatSidebar
        isOpen={isChatOpen}
        welcomeMessage={`Hey ${profile?.first_name || "there"}! You're on Day ${currentDay} of your ${nicheName} plan. Want help with today's task?`}
        prompts={["Write caption", "Content ideas", "What to post", "DM script"]}
      />
    </div>
  );
};

export default GrowthPlan;