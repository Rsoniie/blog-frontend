
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import '../styles/LandingPage.css';

// // function LandingPage() {
// //   const [blogs, setBlogs] = useState([]);
// //   const [expandedBlogId, setExpandedBlogId] = useState(null); // Track expanded blog
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchBlogs = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:8080/blog/blogs', {
// //           headers: {
// //             Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmZmODQyYjhmNDVkZGFlZWEyN2QzOTQiLCJpYXQiOjE3MjgwMzc3OTgsImV4cCI6MTcyODA0MTM5OH0.Yo7t_2aIZB4pbFCSevYYVd6IvoQ5xyPjjfRVlbH3P9E',
// //           },
// //         });

// //         if (Array.isArray(response.data.allblogs)) {
// //           setBlogs(response.data.allblogs);
// //         } else {
// //           setError("No Blogs found");
// //         }
// //       } catch (err) {
// //         console.error("Error fetching blogs:", err);
// //         setError("An error occurred while fetching blogs.");
// //       }
// //     };

// //     fetchBlogs();
// //   }, []);

// //   const toggleReadMore = (blogId) => {
// //     setExpandedBlogId(expandedBlogId === blogId ? null : blogId); // Toggle expand
// //   };

// // //   const renderBlogs = () => {
// // //     return blogs.map((blog) => (
// // //       <div key={blog._id} className={`blog-item ${expandedBlogId === blog._id ? "expanded" : ""}`}>
// // //         {/* User Introduction */}
// // //         <div className="user-info">
// // //           <h4>{blog.user_name}</h4>
// // //           <p>Posted on {new Date(blog.createdAt).toLocaleDateString()}</p>
// // //         </div>

// // //         {/* Blog Header */}
// // //         <div className="blog-header">
// // //           <h3>{blog.blog_heading}</h3>
// // //         </div>

// // //         {/* Blog Body with Read More Option */}
// // //         <div className="blog-body">
// // //           <p>
// // //             {expandedBlogId === blog._id ? blog.blog_body : blog.blog_body.split(" ").slice(0, 50).join(" ")}{/* Show 50 words */}
// // //           </p>
// // //           {blog.blog_body.split(" ").length > 50 && (
// // //             <button className="read-more" onClick={() => toggleReadMore(blog._id)}>
// // //               {expandedBlogId === blog._id ? "Read Less" : "Read More"}
// // //             </button>
// // //           )}
// // //         </div>

// // //         {/* Blog Footer */}
// // //         <div className="blog-footer">
// // //           <span>Likes: {blog.likes}</span>
// // //           <span>Comments: {blog.comments.length}</span>
// // //         </div>
// // //       </div>
// // //     ));
// // //   };
// // const renderBlogs = () => {
// //     return blogs.map((blog) => (
// //       <div key={blog._id} className={`blog-item ${expandedBlogId === blog._id ? "expanded" : ""}`}>
        
// //         {/* Blog Header */}
// //         <div className="blog-header">
// //           <h3>{blog.blog_heading}</h3>
// //         </div>
  
// //         {/* Blog Body with Read More Option */}
// //         <div className="blog-body">
// //           <p>
// //             {expandedBlogId === blog._id ? blog.blog_body : blog.blog_body.split(" ").slice(0, 50).join(" ")}
// //           </p>
// //           {blog.blog_body.split(" ").length > 50 && (
// //             <button className="read-more" onClick={() => toggleReadMore(blog._id)}>
// //               {expandedBlogId === blog._id ? "Read Less" : "Read More"}
// //             </button>
// //           )}
// //         </div>
  
// //         {/* Blog Footer */}
// //         <div className="blog-footer">
// //           <span>Likes: {blog.likes}</span>
// //           <span>Comments: {blog.comments.length}</span>
// //         </div>
// //       </div>
// //     ));
// //   };
  

// //   return (
// //     <div>
// //       {/* Header */}
// //       <header className="header">
// //         <h1>Blogging Platform</h1>
// //         <nav>
// //           <a href="/">Home</a>
// //           <a href="/profile">Profile</a>
// //           <a href="/settings">Settings</a>
// //           <button className="mode-toggle">Toggle Mode</button>
// //         </nav>
// //       </header>

// //       {/* Main Content */}
// //       <main>
// //         {error && <p>{error}</p>}
// //         <div className="blog-list">{renderBlogs()}</div>
// //       </main>
// //     </div>
// //   );
// // }

// // export default LandingPage;




// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../styles/LandingPage.css';

// function LandingPage() {
//   const [blogs, setBlogs] = useState([]);
//   const [expandedBlogId, setExpandedBlogId] = useState(null);
//   const [error, setError] = useState(null);
//   const [showMenu, setShowMenu] = useState(false); // State for showing/hiding menu
//   const navigate = useNavigate();


//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         console.log(token);
        
//         const response = await axios.get('http://localhost:8080/blog/blogs', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setBlogs(Array.isArray(response.data.allblogs) ? response.data.allblogs : []);
//       } catch (err) {
//         console.error("Error fetching blogs:", err);
//         setError("An error occurred while fetching blogs.");
//       }
//     };

//     fetchBlogs();
//   }, []);

//   const toggleMenu = () => setShowMenu(!showMenu);

//   const handleLogout = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       console.log("Token for logout:", token); // Debugging line
//       await axios.get('http://localhost:8080/user/LogoutUser', {}, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
  
//       localStorage.removeItem('token');
//       navigate('/login');
//     } catch (err) {
//       console.error("Error logging out:", err);
//       setError("Failed to log out. Please try again.");
//     }
//   };
  
//   const renderBlogs = () => {
//     return blogs.map((blog) => (
//       <div key={blog._id} className={`blog-item ${expandedBlogId === blog._id ? "expanded" : ""}`}>
//         <div className="user-info">
//           <h4>{blog.user}</h4>
//           <p>Posted on {new Date(blog.createdAt).toLocaleDateString()}</p>
//         </div>
//         <div className="blog-header">
//           <h3>{blog.blog_heading}</h3>
//         </div>
//         <div className="blog-body">
//           <p>
//             {expandedBlogId === blog._id ? blog.blog_body : blog.blog_body.split(" ").slice(0, 50).join(" ")}
//           </p>
//           {blog.blog_body.split(" ").length > 50 && (
//             <button className="read-more" onClick={() => setExpandedBlogId(expandedBlogId === blog._id ? null : blog._id)}>
//               {expandedBlogId === blog._id ? "Read Less" : "Read More"}
//             </button>
//           )}
//         </div>
//         <div className="blog-footer">
//           <span>Likes: {blog.likes}</span>
//           <span>Comments: {blog.comments.length}</span>
//         </div>
//       </div>
//     ));
//   };

//   return (
//     <div>
//       {/* Header with Three-Dot Menu */}
//       <header className="header">
//         <h1>Blogging Platform</h1>
//         <nav>
//           <a href="/">Home</a>
//           <a href="/profile">Profile</a>
//           <a href="/PostBlog">Post</a>
//           <button className="menu-button" onClick={toggleMenu}>⋮</button>
//           {showMenu && (
//             <div className="dropdown-menu">
//               <button onClick={handleLogout}>Logout</button>
//             </div>
//           )}
//         </nav>
//       </header>

//       {/* Main Content */}
//       <main>
//         {error && <p>{error}</p>}
//         <div className="blog-list">{renderBlogs()}</div>
//       </main>
//     </div>
//   );
// }

// export default LandingPage;



import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
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

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.get('http://localhost:8080/user/LogoutUser', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      localStorage.removeItem('token');
      navigate('/login');
    } catch (err) {
      console.error("Error logging out:", err);
      setError("Failed to log out. Please try again.");
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
          <span>Likes: {blog.likes}</span>
          <span>Comments: {blog.comments.length}</span>
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
          <Link to="/post-blog">Post</Link> {/* Updated to use Link */}
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
