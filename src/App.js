// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPages';
import PostBlog from './pages/PostBlog'; // Import PostBlog component
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post-blog" element={<PostBlog />} /> {/* Route for PostBlog */}
      </Routes>
    </Router>
  );
}

export default App;
