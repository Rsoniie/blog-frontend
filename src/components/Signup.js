// src/components/Signup.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link here
import axios from 'axios';
import '../styles/Login.css'; // Reuse the same styles as Login for simplicity

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/user/CreateUser', {
        username,
        password,
        email,
      });

      if (response.status === 201) {
        alert("Account created successfully!");
        navigate('/landing');
        window.location.reload();

      }
    } catch (err) {
      console.error("Signup failed:", err);
      setError(err.response?.data?.message || "An error occurred during signup");
    }
  };

  return (
    <div className="login">
      <h2>Signup</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p className="login-prompt">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Signup;
