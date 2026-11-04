import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import './Signup.css';
import { supabase } from '../lib/supabaseClient';

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);
const CameraIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#f7931a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
);

const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [industry, setIndustry] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  
    if (!agreed) {
      setError('Please agree to the terms to continue.');
      return;
    }
  
    setLoading(true);
  
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });
  
    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }
  
    // Row already exists from the trigger — just fill in the extra details
    const { error: profileError } = await supabase
      .from('users')
      .update({
        first_name: firstName,
        last_name: lastName,
        industry,
      })
      .eq('id', data.user.id);
  
    if (profileError) {
      setError(profileError.message);
      setLoading(false);
      return;
    }
  
    setSuccess('Account created! Redirecting...');
    setTimeout(() => navigate('/onboarding'), 1000);
  };

  return (
    <div className="signup-page">
      <div className="signup-left">
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="title-section">
            <h2>Create your account</h2>
            <p className="subtitle">Let's get your Stratos toolkit set up.</p>
          </div>

          <label className="upload-icon" htmlFor="avatar-upload" style={{ display: 'flex' }}>
            {avatarPreview ? <img src={avatarPreview} alt="Avatar preview" /> : <CameraIcon />}
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="upload-input"
            onChange={handleAvatarChange}
          />

          {error && <p className="error-msg">{error}</p>}
          {success && <p className="success-msg">{success}</p>}

          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              <span className="password-icon"><EyeIcon /></span>
            </span>
          </div>

          <label>Industry</label>
          <div className="select-wrapper">
            <select value={industry} onChange={(e) => setIndustry(e.target.value)} required>
              <option value="">Select your industry</option>
              <option value="Fashion">Fashion</option>
              <option value="Fitness">Fitness</option>
              <option value="Beauty">Beauty</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="checkbox-row">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <p className="terms-label">
              I agree to the <span>Terms of Service</span> and <span>Privacy Policy</span>
            </p>
          </div>

          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

          <p className="login-text">
            Already have an account? <NavLink to="/login">Log in</NavLink>
          </p>
        </form>
      </div>

      <div className="signup-right">
        <img src="/signup-visual.jpg" alt="Stratos HQ" />
      </div>
    </div>
  );
};

export default Signup;