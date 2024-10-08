
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../styles/PostBlog.css';

// const PostBlog = () => {
//   const [blog_heading, setBlogHeading] = useState('');
//   const [blog_body, setBlogBody] = useState('');
//   const [blog_keywords, setBlogKeywords] = useState('');
//   const [blog_description, setBlogDescription] = useState('');
//   const [error, setError] = useState(null);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State for showing the success popup
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!blog_heading || !blog_body) {
//       setError('Blog Heading and Blog Body are required.');
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post(
//         'http://localhost:8080/user/PostBlog', // API endpoint for posting a blog
//         {
//           blog_heading,
//           blog_body,
//           blog_keywords,
//           blog_description,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (response.status === 200) {
//         setShowSuccessPopup(true); // Show success popup after successful post
//       }
//     } catch (err) {
//       console.error("Error posting blog:", err);
//       setError("An error occurred while posting the blog.");
//     }
//   };

//   const handleClosePopup = () => {
//     setShowSuccessPopup(false);
//     navigate('/'); // Redirect to landing page after closing the popup
//   };

//   return (
//     <div className="post-blog">
//       <h2>Post a New Blog</h2>
//       {error && <p className="error-message">{error}</p>}
      
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Blog Heading"
//           value={blog_heading}
//           onChange={(e) => setBlogHeading(e.target.value)}
//           required
//         />
//         <textarea
//           placeholder="Blog Body"
//           value={blog_body}
//           onChange={(e) => setBlogBody(e.target.value)}
//           required
//         ></textarea>
//         <input
//           type="text"
//           placeholder="Blog Keywords"
//           value={blog_keywords}
//           onChange={(e) => setBlogKeywords(e.target.value)}
//         />
//         <textarea
//           placeholder="Blog Description"
//           value={blog_description}
//           onChange={(e) => setBlogDescription(e.target.value)}
//         ></textarea>
//         <button type="submit">Submit Blog</button>
//       </form>

//       {/* Success Popup */}
//       {showSuccessPopup && (
//         <div className="popup">
//           <div className="popup-content">
//             <p>Blog successfully uploaded!</p>
//             <button onClick={handleClosePopup}>OK</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PostBlog;



// src/pages/PostBlog.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header'; // Import Header component
import '../styles/PostBlog.css';

const PostBlog = () => {
  const [blog_heading, setBlogHeading] = useState('');
  const [blog_body, setBlogBody] = useState('');
  const [blog_keywords, setBlogKeywords] = useState('');
  const [blog_description, setBlogDescription] = useState('');
  const [error, setError] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!blog_heading || !blog_body) {
      setError('Blog Heading and Blog Body are required.');
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'http://localhost:8080/user/PostBlog',
        { blog_heading, blog_body, blog_keywords, blog_description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) setShowSuccessPopup(true);
    } catch (err) {
      console.error("Error posting blog:", err);
      setError("An error occurred while posting the blog.");
    }
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
    navigate('/'); // Redirect to landing page after closing the popup
  };

  return (
    <div className="post-blog">
      <Header /> {/* Use the Header component */}
      <h2>Post a New Blog</h2>
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Blog Heading"
          value={blog_heading}
          onChange={(e) => setBlogHeading(e.target.value)}
          required
        />
        <textarea
          placeholder="Blog Body"
          value={blog_body}
          onChange={(e) => setBlogBody(e.target.value)}
          required
        ></textarea>
        <input
          type="text"
          placeholder="Blog Keywords"
          value={blog_keywords}
          onChange={(e) => setBlogKeywords(e.target.value)}
        />
        <textarea
          placeholder="Blog Description"
          value={blog_description}
          onChange={(e) => setBlogDescription(e.target.value)}
        ></textarea>
        <button type="submit">Submit Blog</button>
      </form>

      {showSuccessPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Blog successfully uploaded!</p>
            <button onClick={handleClosePopup}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostBlog;
