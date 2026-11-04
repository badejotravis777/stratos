import React, { useState, useEffect } from 'react';
import './Profile.css';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import ChatSidebar from '../components/ChatSidebar';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';

const TemplateIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>);
const CaptionIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>);
const GuideIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>);
const ScriptIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"></path></svg>);
const CalendarIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>);
const PromptIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>);
const WhatsAppIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.6 6.3A8.9 8.9 0 0 0 12 4a8.9 8.9 0 0 0-7.9 13l-1 3.7 3.8-1A8.9 8.9 0 0 0 12 21a8.9 8.9 0 0 0 5.6-15.7zM12 19.4a7.4 7.4 0 0 1-3.8-1l-.3-.2-2.3.6.6-2.2-.2-.3A7.4 7.4 0 1 1 19.4 12 7.4 7.4 0 0 1 12 19.4zm4-5.5c-.2-.1-1.3-.6-1.5-.7s-.4-.1-.5.1-.5.7-.6.8-.3.1-.5 0a6 6 0 0 1-1.8-1.1 6.5 6.5 0 0 1-1.2-1.5c-.1-.2 0-.3.1-.4l.4-.4.2-.4a.4.4 0 0 0 0-.4c-.1-.1-.5-1.2-.7-1.7s-.4-.4-.5-.4h-.4a.9.9 0 0 0-.6.3 2.6 2.6 0 0 0-.8 1.9c0 1.1.8 2.2.9 2.4a9.6 9.6 0 0 0 3.7 3.4 5.5 5.5 0 0 0 2.2.7c.5.1 1-.1 1.4-.4a1.9 1.9 0 0 0 .4-1.1c0-.1-.1-.2-.3-.3z"/></svg>);
const MailIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z"></path><polyline points="22 6 12 13 2 6"></polyline></svg>);
const StarIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01z"/></svg>);

const ICONS_BY_TYPE = {
  template: <TemplateIcon />,
  caption: <CaptionIcon />,
  guide: <GuideIcon />,
  script: <ScriptIcon />,
  calendar: <CalendarIcon />,
  prompt: <PromptIcon />,
};

const Profile = () => {
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

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [activity, setActivity] = useState([]);
  const [activityLoading, setActivityLoading] = useState(true);

  const nicheName = profile?.niches?.name || 'Fashion';

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

    const loadActivity = async () => {
      setActivityLoading(true);
      const { data } = await supabase
        .from('user_tool_usage')
        .select('used_at, tools(title, type, category)')
        .eq('user_id', profile.id)
        .order('used_at', { ascending: false })
        .limit(5);
      setActivity((data || []).filter((r) => r.tools));
      setActivityLoading(false);
    };

    loadActivity();
  }, [profile?.id]);

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

  const handlePasswordChange = async () => {
    setPasswordError('');
    setPasswordSuccess('');

    if (!currentPassword || !newPassword) {
      setPasswordError('Fill in both fields.');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters.');
      return;
    }

    setPasswordLoading(true);

    const { error: verifyError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });

    if (verifyError) {
      setPasswordError('Current password is incorrect.');
      setPasswordLoading(false);
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });

    if (updateError) {
      setPasswordError(updateError.message);
      setPasswordLoading(false);
      return;
    }

    setPasswordSuccess('Password updated.');
    setCurrentPassword('');
    setNewPassword('');
    setPasswordLoading(false);
  };

  const displayName = `${firstName} ${lastName}`.trim() || 'Your name';
  const initial = firstName ? firstName.charAt(0).toUpperCase() : '?';

  return (
    <div className="layout-container">
      <Sidebar />

      <main className="main-content">
        <TopBar
          title="Profile"
          niche={nicheName}
          isChatOpen={isChatOpen}
          onToggleChat={() => setIsChatOpen(!isChatOpen)}
        />

        <div className="main-content-inner">
          <section className="profile-page">

            <div className="profile-header-card">
              <div className="profile-header-left">
                <div className="profile-avatar-lg">{initial}</div>
                <div>
                  <h3>{displayName}</h3>
                  <p className="profile-role">{profile?.role || 'Creator'}</p>
                  <span className="profile-badge"><StarIcon /> Early Access · All tools free</span>
                </div>
              </div>
              <button
                className="edit-profile-btn"
                onClick={() => document.getElementById('personal-details-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Edit
              </button>
            </div>

            <div className="profile-section">
              <h4>Your toolkit activity</h4>
              <p className="profile-section-subtext">
                {activityLoading
                  ? 'Loading...'
                  : activity.length === 0
                  ? "You haven't opened any tools yet."
                  : `Your ${activity.length} most recent tools.`}
              </p>

              {!activityLoading && activity.length > 0 && (
                <div className="activity-list">
                  {activity.map((item, i) => (
                    <div className="activity-row" key={i}>
                      <div className="activity-icon">{ICONS_BY_TYPE[item.tools.type] || <TemplateIcon />}</div>
                      <div className="activity-text">
                        <h5>{item.tools.title}</h5>
                        <p>{item.tools.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="profile-section" id="personal-details-section">
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
                  <label>Industry</label>
                  <input type="text" value={industry} onChange={(e) => setIndustry(e.target.value)} />
                </div>
              </div>
              <button className="save-changes-btn" onClick={savePersonal} disabled={personalSaving}>
                {personalSaving ? 'Saving...' : personalSaved ? 'Saved ✓' : 'Save changes'}
              </button>
            </div>

            <div className="profile-section">
              <h4>Social Media Details</h4>
              <div className="form-grid-1">
                <div className="form-field">
                  <label>Instagram</label>
                  <input type="text" placeholder="https://instagram.com/yourhandle" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
                </div>
                <div className="form-field">
                  <label>TikTok</label>
                  <input type="text" placeholder="https://tiktok.com/@yourhandle" value={tiktok} onChange={(e) => setTiktok(e.target.value)} />
                </div>
                <div className="form-field">
                  <label>LinkedIn</label>
                  <input type="text" placeholder="https://linkedin.com/in/yourhandle" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
                </div>
              </div>
              <button className="save-changes-btn" onClick={saveSocial} disabled={socialSaving}>
                {socialSaving ? 'Saving...' : socialSaved ? 'Saved ✓' : 'Save changes'}
              </button>
            </div>

            <div className="profile-section">
              <h4>Security Details</h4>
              {passwordError && <p className="form-error-text">{passwordError}</p>}
              {passwordSuccess && <p className="form-success-text">{passwordSuccess}</p>}
              <div className="form-grid-1">
                <div className="form-field">
                  <label>Current Password</label>
                  <input type="password" placeholder="••••••••••" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                </div>
                <div className="form-field">
                  <label>New Password</label>
                  <input type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
              </div>
              <button className="save-changes-btn" onClick={handlePasswordChange} disabled={passwordLoading}>
                {passwordLoading ? 'Updating...' : 'Save Changes'}
              </button>
            </div>

            <div className="profile-section">
              <h4>Need a hand?</h4>
              <div className="help-list">
                <a href="https://wa.me/2349128430714" target="_blank" rel="noopener noreferrer" className="help-row">
                  <div className="help-icon whatsapp"><WhatsAppIcon /></div>
                  <div className="help-text">
                    <h5>Chat on WhatsApp</h5>
                    <p>We usually reply within an hour</p>
                  </div>
                </a>
                <a href="mailto:hello@stratoshqapp.com" className="help-row">
                  <div className="help-icon mail"><MailIcon /></div>
                  <div className="help-text">
                    <h5>Email the team</h5>
                    <p>hello@stratoshqapp.com</p>
                  </div>
                </a>
              </div>
            </div>

          </section>
        </div>
      </main>

      <ChatSidebar
        isOpen={isChatOpen}
        welcomeMessage={`Hey ${profile?.first_name || 'there'}! Need help with your profile or your plan?`}
        prompts={['Write caption', 'Content ideas', 'What to post', 'DM script']}
        specialist={`${nicheName} Specialist`}
      />
    </div>
  );
};

export default Profile;