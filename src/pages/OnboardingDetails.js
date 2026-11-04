import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";
import "./OnboardingDetails.css";

const OnboardingDetails = () => {
  const navigate = useNavigate();
  const { user, profile, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [liveNiches, setLiveNiches] = useState([]);
  const [nichesLoading, setNichesLoading] = useState(true);
  const [nicheFetchError, setNicheFetchError] = useState("");

  const [formData, setFormData] = useState({
    role: "",
    niche: "",
  });

  useEffect(() => {
    supabase
      .from("niches")
      .select("name, is_live")
      .then(({ data, error }) => {
        if (error) {
          setNicheFetchError(`Failed to load niches: ${error.message}`);
          setNichesLoading(false);
          return;
        }
        if (!data || data.length === 0) {
          setNicheFetchError("No niches found in the database at all.");
          setNichesLoading(false);
          return;
        }
        const live = data.filter((n) => n.is_live).map((n) => n.name);
        if (live.length === 0) {
          setNicheFetchError(`Found ${data.length} niche(s), but none are marked live.`);
        }
        setLiveNiches(live);
        if (live.length === 1) {
          setFormData((prev) => ({ ...prev, niche: live[0] }));
        }
        setNichesLoading(false);
      });
  }, []);

  const roles = [
    {
      id: "Creator",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
          <polygon points="10 11 15 14.5 10 18 10 11"></polygon>
        </svg>
      ),
      desc: "Video · Photo · Audio",
    },
    {
      id: "Business Owner",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      ),
      desc: "Scale · Sell · Grow",
    },
    {
      id: "Brand Manager",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
          <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
          <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
          <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
        </svg>
      ),
      desc: "Identity · Tone · Look",
    },
    {
      id: "Digital Marketer",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 12h.01"></path>
          <path d="M8 16a6 6 0 0 1 0-8"></path>
          <path d="M16 8a6 6 0 0 1 0 8"></path>
          <path d="M4 20a12 12 0 0 1 0-16"></path>
          <path d="M20 4a12 12 0 0 1 0 16"></path>
        </svg>
      ),
      desc: "Reach · Ads · Convert",
    },
    {
      id: "Freelancer",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="2" y1="20" x2="22" y2="20"></line>
        </svg>
      ),
      desc: "Clients · Projects · Ship",
    },
    {
      id: "Startup Team",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      desc: "Build · Launch · Iterate",
    },
  ];

  const handleRoleSelect = (roleId) => {
    setFormData({ ...formData, role: roleId });
  };

  const handleNicheSelect = (nicheName) => {
    if (!liveNiches.includes(nicheName)) return;
    setFormData({ ...formData, niche: nicheName });
  };

  const handleSubmit = async () => {
    if (!formData.role) {
      alert("Please pick a role before continuing.");
      return;
    }
    if (!formData.niche) {
      alert("We couldn't detect a niche for your account — this is a setup issue, not something you did. Please tell your developer.");
      return;
    }

    setLoading(true);

    const { data: nicheRow, error: nicheError } = await supabase
      .from("niches")
      .select("id")
      .eq("name", formData.niche)
      .single();

    if (nicheError || !nicheRow) {
      alert("Couldn't find that niche. Please try again.");
      setLoading(false);
      return;
    }

    const { error: updateError } = await supabase
      .from("users")
      .upsert(
        {
          id: user.id,
          email: user.email,
          role: formData.role,
          niche_id: nicheRow.id,
          onboarding_complete: true,
          plan_start_date: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

    if (updateError) {
      console.error(updateError);
      alert(`Failed to save your details: ${updateError.message}`);
      setLoading(false);
      return;
    }

    const { data: verifyRow, error: verifyError } = await supabase
      .from("users")
      .select("onboarding_complete")
      .eq("id", user.id)
      .maybeSingle();

    if (verifyError || !verifyRow || verifyRow.onboarding_complete !== true) {
      console.error("Verification failed:", verifyError, verifyRow);
      alert("We couldn't confirm your details saved. Please try again, or contact your developer.");
      setLoading(false);
      return;
    }

    await refreshProfile();
    setLoading(false);
    navigate("/ready");
  };

  const displayName = profile
    ? `${profile.first_name ?? ""} ${profile.last_name ?? ""}`.trim()
    : "";

  return (
    <div className="onboarding-details-layout">
      <div className="bg-clouds"></div>

      <div className="progress-container">
        <div className="step completed">
          <div className="step-circle">1</div>
          <span className="step-label">Welcome</span>
        </div>
        <div className="step-divider completed-divider"></div>
        <div className="step completed">
          <div className="step-circle">2</div>
          <span className="step-label">Features</span>
        </div>
        <div className="step-divider completed-divider"></div>
        <div className="step active">
          <div className="step-circle">3</div>
          <span className="step-label">Your Details</span>
        </div>
        <div className="step-divider"></div>
        <div className="step">
          <div className="step-circle">✓</div>
          <span className="step-label">Ready</span>
        </div>
      </div>

      <div className="content-wrapper">
        <div className="details-card">
          <h1 className="details-title">
            Tell us about <span className="text-orange">yourself</span>
          </h1>
          <p className="details-subtitle">We'll personalise your workspace around you.</p>

          <label className="section-label">WHO ARE YOU?</label>
          <div className="roles-grid">
            {roles.map((r) => (
              <div
                key={r.id}
                className={`role-card ${formData.role === r.id ? "active" : ""}`}
                onClick={() => handleRoleSelect(r.id)}
              >
                <div className="role-icon">{r.icon}</div>
                <h4>{r.id}</h4>
                <p>{r.desc}</p>
              </div>
            ))}
          </div>

          <label className="section-label">YOUR NICHE</label>

          {nicheFetchError && <p className="niche-debug-error">⚠ {nicheFetchError}</p>}

          {nichesLoading ? (
            <p className="niche-loading-text">Loading available niches...</p>
          ) : liveNiches.length === 1 ? (
            <div className="niche-locked-notice">
              <div className="niche-locked-badge">{liveNiches[0]}</div>
              <p>You're set up for {liveNiches[0]} — more niches launching soon.</p>
            </div>
          ) : liveNiches.length > 1 ? (
            <div className="niche-pills">
              {liveNiches.map((name) => (
                <button
                  key={name}
                  className={`niche-pill ${formData.niche === name ? "active" : ""}`}
                  onClick={() => handleNicheSelect(name)}
                >
                  {name}
                </button>
              ))}
            </div>
          ) : null}

          <button className="continue-btn" onClick={handleSubmit} disabled={loading || nichesLoading}>
            {loading ? "Saving..." : "Continue >"}
          </button>
        </div>

        <div className="live-preview-panel">
          <div className="preview-header">
            <span className="dot"></span> LIVE PREVIEW
          </div>
          <div className="preview-card">
            <div className="preview-profile">
              <div className="preview-avatar">
                {displayName ? displayName.charAt(0).toUpperCase() : "?"}
              </div>
              <div className="preview-info">
                <h4>{displayName || "Your name"}</h4>
                <p>{formData.role || "No role yet"}</p>
              </div>
            </div>
            <div className="preview-content-type">
              <p>CONTENT YOU'LL CREATE</p>
              <div className="niche-tag">{formData.niche || "Select a niche"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingDetails;