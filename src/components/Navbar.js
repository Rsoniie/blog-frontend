// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">MyBlog</Link>
      <Link to="/login">Login</Link>
      <Link to="/profile">Profile</Link>
    </nav>
  );
};

export default Navbar;
