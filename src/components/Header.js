// src/components/Header.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setShowMenu((prev) => !prev);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    try {
      await fetch('http://localhost:8080/user/LogoutUser', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="header">
      <h1 onClick={() => navigate('/')}>Blogging Platform</h1>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/post-blog">Post</Link>
      </nav>
      <button className="menu-button" onClick={toggleMenu}>⋮</button>
      
      {showMenu && (
        <div className="dropdown-menu">
          <button onClick={() => navigate('/profile')}>Profile</button>
          <button onClick={() => navigate('/post-blog')}>Post Blog</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </header>
  );
};

export default Header;
