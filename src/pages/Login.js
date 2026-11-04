import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import './Signup.css';
import { supabase } from '../lib/supabaseClient';

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    navigate('/dashboard');
  };

  return (
    <div className="signup-page">
      <div className="signup-left">
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="title-section">
            <h2>Welcome back</h2>
            <p className="subtitle">Log in to your Stratos toolkit.</p>
          </div>

          {error && <p className="error-msg">{error}</p>}

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
            />
            <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              <span className="password-icon"><EyeIcon /></span>
            </span>
          </div>

          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>

          <p className="login-text">
            Don't have an account? <NavLink to="/signup">Sign up</NavLink>
          </p>
        </form>
      </div>

      <div className="signup-right">
        <img src="/signup-visual.jpg" alt="Stratos HQ" />
      </div>
    </div>
  );
};

export default Login;