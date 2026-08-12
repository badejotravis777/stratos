// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Waitlist from "./pages/Waitlist";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/waitlist" element={<Waitlist />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </Router>
  );
}

export default App;
