


import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/LandingPage.css';


function LandingPage() {
  const [blogs, setBlogs] = useState([]);
  const [expandedBlogId, setExpandedBlogId] = useState(null);
  const [error, setError] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const response = await axios.get('http://localhost:8080/blog/blogs', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlogs(Array.isArray(response.data.allblogs) ? response.data.allblogs : []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("An error occurred while fetching blogs.");
      }
    };

    fetchBlogs();
  }, []);

  const toggleMenu = () => setShowMenu(!showMenu);

  // const handleLogout = async () => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     await axios.get('http://localhost:8080/user/LogoutUser', {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  
  //     localStorage.removeItem('token');
  //     navigate('/login');
  //   } catch (err) {
  //     console.error("Error logging out:", err);
  //     setError("Failed to log out. Please try again.");
  //   }
  // };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/user/LogoutUser', {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.status === 200 || response.status === 204) {
        // Logout successful: clear token, then refresh to go to login screen
        localStorage.removeItem('token');
        navigate('/login');
        window.location.reload(); // Refresh page to ensure redirection to login
      } else {
        console.error("Unexpected response:", response);
        setError("Failed to log out. Please try again.");
      }
    } catch (err) {
      console.error("Error logging out:", err);
      setError("Failed to log out. Please try again.");
    }
  };

  const handleLike = async (blogId) => {
    try {
      console.log(blogId);
      const token = localStorage.getItem('token');
      console.log(token);
  
      const response = await axios.get(
        `http://localhost:8080/blog/like/${blogId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // window.location.reload();
  
      console.log(response);
  
      // Check if the response was successful
      if (response.status === 200) { 
        // Update the likes count in the local state
        console.log(response.data.updatedLikes);
        setBlogs(blogs.map((blog) => 
          blog._id === blogId ? { ...blog, likes: response.data.updatedLikes } : blog
        ));
      }
    } catch (err) {
      // Check if the error status is 400 and show popup message
      if (err.response && err.response.status === 400) {
        alert("You have already liked this blog.");
      } else {
        console.error("Error liking the blog:", err);
        setError("Failed to like the blog. Please try again.");
      }
    }
  };


  const handleComment = async (blog_Id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log("Authorization error, no token found");
      }
      
      const response = await axios.get(
        `http://localhost:8080/blog/all_comments/${blog_Id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      const comments = response.data.net_comments;
      console.log(comments);
      
      // Navigate and pass comments via state
      navigate("/all_comments", { state: { comments, blog_Id } });
      
    } catch (error) {
      console.log("This is error while fetching data", error);
    }
  };
  

  const renderBlogs = () => {
    return blogs.map((blog) => (
      <div key={blog._id} className={`blog-item ${expandedBlogId === blog._id ? "expanded" : ""}`}>
        <div className="user-info">
          <h4>{blog.user}</h4>
          <p>Posted on {new Date(blog.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="blog-header">
          <h3>{blog.blog_heading}</h3>
        </div>
        <div className="blog-body">
          <p>
            {expandedBlogId === blog._id ? blog.blog_body : blog.blog_body.split(" ").slice(0, 50).join(" ")}
          </p>
          {blog.blog_body.split(" ").length > 50 && (
            <button className="read-more" onClick={() => setExpandedBlogId(expandedBlogId === blog._id ? null : blog._id)}>
              {expandedBlogId === blog._id ? "Read Less" : "Read More"}
            </button>
          )}
        </div>
        <div className="blog-footer">
          <button onClick={() => handleLike(blog._id)}>Likes: {blog.likes}</button>
          <button onClick={() => handleComment(blog._id)}>Comments: {blog.comments.length}</button>
        </div>
      </div>
    ));
  };

  return (
    <div>
      {/* Header with Three-Dot Menu */}
      <header className="header">
        <h1>Blogging Platform</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/post-blog">Post</Link>
          <button className="menu-button" onClick={toggleMenu}>⋮</button>
          {showMenu && (
            <div className="dropdown-menu">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main>
        {error && <p>{error}</p>}
        <div className="blog-list">{renderBlogs()}</div>
      </main>
    </div>
  );
}

export default LandingPage;
