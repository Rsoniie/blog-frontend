import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AllCommentsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Access comments from the state passed via navigation
  const { comments, blog_Id } = location.state || {};
  console.log(blog_Id);

  // Navigate to the AddCommentPage for adding a new comment
  const handleAddComment = () => {
    navigate("/add-comment", {state: {blog_Id}});
  };

  return (
    <div>
      <h1>All Comments</h1>
      {comments ? (
        <div>
          {comments.map((commentObj, index) => (
            <div key={index} style={styles.commentBox}>
              <h3 style={styles.commenterName}>{commentObj.user_name}</h3>
              <p>{commentObj.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No comments available</p>
      )}

      {/* Add Comment button in a fixed position */}
      <button 
        style={styles.fixedAddCommentButton} 
        onClick={handleAddComment}>
        Add Comment
      </button>
    </div>
  );
};

// Basic styles for the comment box and the floating button
const styles = {
  commentBox: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    margin: '10px 0',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  },
  commenterName: {
    margin: '0',
    fontWeight: 'bold',
  },
  fixedAddCommentButton: {
    position: 'fixed',
    bottom: '20px', // Adjust to top or bottom as needed
    right: '20px', // Adjust to move button from the right side
    padding: '10px 15px',
    borderRadius: '50%',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  },
};

export default AllCommentsPage;
