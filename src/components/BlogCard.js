// src/components/BlogCard.js
import React from 'react';
import '../styles/BlogCard.css';

const BlogCard = ({ blog }) => {
  return (
    <div className="blog-card">
      <h3>{blog.title}</h3>
      <p>{blog.content.slice(0, 100)}...</p>
      <button>Read More</button>
    </div>
  );
};

export default BlogCard;
