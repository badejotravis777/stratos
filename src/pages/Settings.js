import React, { useState, useEffect } from 'react';
import './Settings.css';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import ChatSidebar from '../components/ChatSidebar';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { getCurrentDay } from '../utils/planDay';

const ChevronRight = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>);
const ClockIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>);
const RefreshIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>);
const CompassIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>);

const notificationPrefs = [
  { id: 'daily', field: 'notify_daily', title: 'Daily task reminders', desc: 'A nudge when your daily step is ready' },
  { id: 'weekly', field: 'notify_weekly', title: 'Weekly progress recap', desc: 'A summary of your week every Sunday' },
  { id: 'tools', field: 'notify_tools', title: 'New tool alerts', desc: 'When a new template or guide drops for your niche' },
  { id: 'community', field: 'notify_community', title: 'Community updates', desc: 'What is happening in the WhatsApp group' },
];

const NUDGE_TIMES = ['7am', '10am', '8pm'];

const Settings = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [isChatOpen, setIsChatOpen] = useState(true);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [industry, setIndustry] = useState('');
  const [instagram, setInstagram] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [linkedin, setLinkedin] = useState('');

  const [personalSaving, setPersonalSaving] = useState(false);
  const [personalSaved, setPersonalSaved] = useState(false);
  const [socialSaving, setSocialSaving] = useState(false);
  const [socialSaved, setSocialSaved] = useState(false);

  const [nudgeTime, setNudgeTime] = useState('7am');
  const [toggles, setToggles] = useState({ notify_daily: true, notify_weekly: true, notify_tools: false, notify_community: false });
  const [settingsLoaded, setSettingsLoaded] = useState(false);

  const nicheName = profile?.niches?.name || 'Fashion';
  const currentDay = getCurrentDay(profile?.plan_start_date);

  useEffect(() => {
    if (!profile) return;
    setFirstName(profile.first_name || '');
    setLastName(profile.last_name || '');
    setIndustry(profile.industry || '');
    setInstagram(profile.instagram || '');
    setTiktok(profile.tiktok || '');
    setLinkedin(profile.linkedin || '');
  }, [profile]);

  useEffect(() => {
    if (!profile?.id) return;

    const loadSettings = async () => {
      const { data } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', profile.id)
        .maybeSingle();

      if (data) {
        setNudgeTime(data.nudge_time || '7am');
        setToggles({
          notify_daily: data.notify_daily,
          notify_weekly: data.notify_weekly,
          notify_tools: data.notify_tools,
          notify_community: data.notify_community,
        });
      }
      setSettingsLoaded(true);
    };

    loadSettings();
  }, [profile?.id]);

  const upsertSettings = async (patch) => {
    await supabase.from('user_settings').upsert(
      { user_id: profile.id, nudge_time: nudgeTime, ...toggles, ...patch },
      { onConflict: 'user_id' }
    );
  };

  const savePersonal = async () => {
    setPersonalSaving(true);
    setPersonalSaved(false);
    const { error } = await supabase
      .from('users')
      .update({ first_name: firstName, last_name: lastName, industry })
      .eq('id', profile.id);

    if (!error) {
      await refreshProfile();
      setPersonalSaved(true);
      setTimeout(() => setPersonalSaved(false), 2000);
    }
    setPersonalSaving(false);
  };

  const saveSocial = async () => {
    setSocialSaving(true);
    setSocialSaved(false);
    const { error } = await supabase
      .from('users')
      .update({ instagram, tiktok, linkedin })
      .eq('id', profile.id);

    if (!error) {
      await refreshProfile();
      setSocialSaved(true);
      setTimeout(() => setSocialSaved(false), 2000);
    }
    setSocialSaving(false);
  };

  const handleNudgeChange = async (time) => {
    setNudgeTime(time);
    await upsertSettings({ nudge_time: time });
  };

  const toggleSwitch = async (field) => {
    const updated = { ...toggles, [field]: !toggles[field] };
    setToggles(updated);
    await upsertSettings(updated);
  };

  const handleResetPlan = async () => {
    if (!window.confirm('This resets your progress back to Day 1. Your history stays, but your streak restarts. Continue?')) return;

    await supabase.from('user_progress').delete().eq('user_id', profile.id);
    await supabase.from('users').update({ plan_start_date: new Date().toISOString() }).eq('id', profile.id);
    await refreshProfile();
    alert("Done — you're back on Day 1.");
  };

  return (
    <div className="layout-container">
      <Sidebar />

      <main className="main-content">
        <TopBar
          title="Settings"
          niche={nicheName}
          isChatOpen={isChatOpen}
          onToggleChat={() => setIsChatOpen(!isChatOpen)}
        />

        <div className="main-content-inner">
          <section className="settings-page">

            <div className="settings-intro">
              <h2>Your account, your plan, and what we tell you about.</h2>
            </div>

            <div className="settings-section">
              <h4>Personal Details</h4>
              <div className="form-grid-2">
                <div className="form-field">
                  <label>First Name</label>
                  <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="form-field">
                  <label>Last Name</label>
                  <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="form-field">
                  <label>Email</label>
                  <input type="email" value={user?.email || ''} disabled title="Contact support to change your email" />
                </div>
                <div className="form-field">
                  <label>What you do</label>
                  <input type="text" value={industry} onChange={(e) => setIndustry(e.target.value)} />
                </div>
              </div>
              <button className="save-changes-btn" onClick={savePersonal} disabled={personalSaving}>
                {personalSaving ? 'Saving...' : personalSaved ? 'Saved ✓' : 'Save changes'}
              </button>
            </div>

            <div className="settings-section">
              <h4>Where people find you</h4>
              <p className="settings-section-subtext">We use these to tailor your plan. Add the ones you actually post on.</p>
              <div className="form-grid-1">
                <div className="form-field">
                  <label>Instagram</label>
                  <input type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="instagram.com/yourhandle" />
                </div>
                <div className="form-field">
                  <label>TikTok</label>
                  <input type="text" value={tiktok} onChange={(e) => setTiktok(e.target.value)} placeholder="tiktok.com/@yourhandle" />
                </div>
                <div className="form-field">
                  <label>LinkedIn</label>
                  <input type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="Add your LinkedIn" />
                </div>
              </div>
              <button className="save-changes-btn" onClick={saveSocial} disabled={socialSaving}>
                {socialSaving ? 'Saving...' : socialSaved ? 'Saved ✓' : 'Save changes'}
              </button>
            </div>

            <div className="settings-section">
              <h4>Your plan</h4>
              <p className="settings-section-subtext">You're on Day {currentDay} of 30.</p>

              <div className="plan-row">
                <div className="plan-row-left">
                  <div className="plan-row-icon"><CompassIcon /></div>
                  <div>
                    <h5>Your niche</h5>
                    <p>Everything in Stratos is built around this</p>
                  </div>
                </div>
                <span className="plan-row-value" title="More niches launching soon">{nicheName}</span>
              </div>

              <div className="plan-row">
                <div className="plan-row-left">
                  <div className="plan-row-icon"><ClockIcon /></div>
                  <div>
                    <h5>When we nudge you</h5>
                    <p>The time your daily nudge lands</p>
                  </div>
                </div>
                <div className="time-chip-group">
                  {NUDGE_TIMES.map((t) => (
                    <button
                      key={t}
                      className={`time-chip ${nudgeTime === t ? 'active' : ''}`}
                      onClick={() => handleNudgeChange(t)}
                      disabled={!settingsLoaded}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="plan-row">
                <div className="plan-row-left">
                  <div className="plan-row-icon"><RefreshIcon /></div>
                  <div>
                    <h5>Start the 30 days again</h5>
                    <p>Reset your streak and progress back to Day 1</p>
                  </div>
                </div>
                <span className="plan-row-value plan-row-clickable" onClick={handleResetPlan}>
                  Reset <ChevronRight />
                </span>
              </div>
            </div>

            <div className="settings-section">
              <h4>What we tell you about</h4>
              <p className="settings-section-subtext">Pick what's worth interrupting you for. Everything else stays quiet.</p>

              <div className="toggle-list">
                {notificationPrefs.map((pref) => (
                  <div className="toggle-row" key={pref.id}>
                    <div>
                      <h5>{pref.title}</h5>
                      <p>{pref.desc}</p>
                    </div>
                    <button
                      className={`toggle-switch ${toggles[pref.field] ? 'on' : ''}`}
                      onClick={() => toggleSwitch(pref.field)}
                      disabled={!settingsLoaded}
                      aria-label={`Toggle ${pref.title}`}
                    >
                      <span className="toggle-knob" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </section>
        </div>
      </main>

      <ChatSidebar
        isOpen={isChatOpen}
        welcomeMessage={`Hey ${profile?.first_name || 'there'}! Need help with your settings or your plan?`}
        prompts={['Write caption', 'Content ideas', 'What to post', 'DM script']}
        specialist={`${nicheName} Specialist`}
      />
    </div>
  );
};

export default Settings;