import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPages'; // Ensure the import is correct
import PostBlog from './pages/PostBlog';
import Login from './components/Login';
import Signup from './components/Signup';
import AllComments from './pages/AllComments';  // PascalCase updated
import AddCommentPage from './pages/AddCommentPage';  // Ensure this is correctly imported

function App() {
  const [isTokenValid, setIsTokenValid] = useState(false);

  // Function to verify token validity
  const verifyToken = (token) => {
    if (!token) return false;

    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // decode the payload part of JWT
      const currentTime = Date.now() / 1000; // current time in seconds
      return decodedToken.exp > currentTime; // return true if token hasn't expired
    } catch (error) {
      return false; // return false if token is invalid or expired
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (verifyToken(token)) {
      setIsTokenValid(true);
    } else {
      setIsTokenValid(false);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={isTokenValid ? "/landing" : "/login"} />} />
        <Route path="/login" element={isTokenValid ? <Navigate to="/landing" /> : <Login />} />
        <Route path="/landing" element={isTokenValid ? <LandingPage /> : <Navigate to="/login" />} />
        <Route path="/post-blog" element={isTokenValid ? <PostBlog /> : <Navigate to="/login" />} />
        <Route path="/signup" element={isTokenValid ? <Navigate to="/landing" /> : <Signup />} />
        <Route path="/all_comments" element={isTokenValid ? <AllComments /> : <Navigate to="/login" />} />
        <Route path="/add-comment" element={<AddCommentPage />} /> {/* Correct Route Definition */}
      </Routes>
    </Router>
  );
}

export default App;
