import React, { useState } from "react";

function Article({ article, index, user }) {
  const userName = localStorage.getItem("loggedInUser") || "Unknown";
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="article-container">
      {article.hasImage && (
        <img
          className="article-image"
          src={`https://picsum.photos/300/300?random=${index}`}
          alt="Random for article"
        />
      )}
      <h3>{article.title}</h3>
      <p>By: {user ? user : userName}</p>
      <p>
        Date:{" "}
        {article.date
          ? article.date.toLocaleDateString()
          : article.randomDate.toLocaleDateString()}
      </p>
      <p>{article.body}</p>
      <span>
        <b>Comments</b>
      </span>
      <button className="toggle-comments" onClick={toggleComments}>
        {showComments ? "Hide" : "Show"}
      </button>
      <div
        className="comments"
        style={{ display: showComments ? "inline" : "none" }}
      >
        <p>
          <span>This is amazing! </span>
          <span style={{ fontSize: 10 + "px" }}>Gabrielle</span>
          <br />
          <span>So cool! </span>
          <span style={{ fontSize: 10 + "px" }}>Peter</span>
        </p>
      </div>
      <div>
        <button>Edit</button>
        <button>Comment</button>
      </div>
    </div>
  );
}

export default Article;
