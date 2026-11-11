import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Waitlist from "./pages/Waitlist";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import OnboardingFeatures from "./pages/OnboardingFeatures";
import OnboardingDetails from "./pages/OnboardingDetails";
import OnboardingReady from "./pages/OnboardingReady";
import Dashboard from "./pages/Dashboard";
import GrowthPlan from "./pages/GrowthPlan";
import Categories from "./pages/Categories";
import NicheToolkit from "./pages/NicheToolkit";
import Resources from "./pages/Resources";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ToolDetail from './pages/ToolDetail';
import DealCheck from './pages/DealCheck';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/waitlist" element={<Waitlist />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Onboarding needs login, but not full onboarding completion */}
          <Route path="/onboarding" element={<ProtectedRoute requireOnboarded={false}><Onboarding /></ProtectedRoute>} />
          <Route path="/onboarding-features" element={<ProtectedRoute requireOnboarded={false}><OnboardingFeatures /></ProtectedRoute>} />
          <Route path="/onboarding-details" element={<ProtectedRoute requireOnboarded={false}><OnboardingDetails /></ProtectedRoute>} />
          <Route path="/ready" element={<ProtectedRoute requireOnboarded={false}><OnboardingReady /></ProtectedRoute>} />

          {/* Everything else requires full onboarding */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/growth-plan" element={<ProtectedRoute><GrowthPlan /></ProtectedRoute>} />
          <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
          <Route path="/niche-toolkit" element={<ProtectedRoute><NicheToolkit /></ProtectedRoute>} />
          <Route path="/Resources" element={<ProtectedRoute><Resources /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/tool/:toolId" element={<ProtectedRoute><ToolDetail /></ProtectedRoute>} />
          <Route path="/deal-check" element={<ProtectedRoute><DealCheck /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;