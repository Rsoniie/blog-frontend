// src/pages/LandingPage.js
import React, { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';
import axios from 'axios';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch blogs from API or use sample data
    axios.get('/api/blogs').then(response => setBlogs(response.data)).catch(console.error);
  }, []);

  return (
    <div className="landing-page">
      <h1>Blogs</h1>
      <div className="blog-list">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
