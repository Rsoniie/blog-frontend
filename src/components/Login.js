
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    // If token exists, navigate to the landing page directly
    if (token) {
      navigate('/landing');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/user/LoginUser', {
        username,
        password,
      });

      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.user);
        navigate('/landing');
        window.location.reload();
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.response?.data?.message || "An error occurred during login");
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>
      <p className="signup-prompt">
        Don’t have an account? <Link to="/signup">Create one here</Link>
      </p>
    </div>
  );
};

export default Login;
