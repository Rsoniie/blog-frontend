import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AddCommentPage = () => {
  const [newComment, setNewComment] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  
  const { blog_Id } = location.state || {};

  // Handle input change for the new comment
  console.log("blog id from addcomment page", blog_Id);
  const handleInputChange = (e) => {
    setNewComment(e.target.value);
  };

  // Handle form submission and API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulate API call to submit comment for the specific commentId
    try {

        const token =  localStorage.getItem('token');
        console.log(token);
        // API Calling...

        const response = await axios.post(`http://localhost:8080/blog/comment/${blog_Id}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        console.log(response);
      navigate('/all_comments', { state: { message: 'Comment added successfully' } });
    //   window.location.reload();
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div>
      <h1>Add Comment</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your comment..."
          value={newComment}
          onChange={handleInputChange}
          style={styles.textarea}
        />
        <button type="submit" style={styles.submitButton}>Submit Comment</button>
      </form>
    </div>
  );
};

// Basic styles for textarea and button
const styles = {
  textarea: {
    width: '100%',
    height: '100px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  },
  submitButton: {
    padding: '10px 15px',
    borderRadius: '5px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
};

export default AddCommentPage;
