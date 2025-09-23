// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About'; 
import Pricing from './pages/Pricing';
import HIW from './pages/HowItWorks';
import Features from './pages/Features';
import Waitlist from "./pages/Waitlist";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/how-it-works" element={<HIW/>} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/waitlist" element={<Waitlist />} />
      </Routes>
    </Router>
  );
}

export default App;
