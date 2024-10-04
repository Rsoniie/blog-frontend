// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPages';
import PostBlog from './pages/PostBlog';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        {/* Conditionally redirect to login or landing page on the root route */}
        <Route path="/" element={<Navigate to={token ? "/landing" : "/login"} />} />
        <Route path="/login" element={token ? <Navigate to="/landing" /> : <Login />} />
        <Route path="/landing" element={token ? <LandingPage /> : <Navigate to="/login" />} />
        <Route path="/post-blog" element={token ? <PostBlog /> : <Navigate to="/login" />} />
        <Route path="/signup" element={token ? <Navigate to="/landing" /> : <Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
