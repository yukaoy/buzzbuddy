import React, { useState, useRef } from "react";

function ArticleInput({ newArticle, setNewArticle, setArticles }) {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const userName = localStorage.getItem("loggedInUser") || "Unknown";

  const clearImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="article-input">
      <textarea
        className="article-text-area"
        value={newArticle}
        onChange={(e) => setNewArticle(e.target.value)}
      />
      <div>
        <input type="file" ref={fileInputRef}/>
        <button
          onClick={() => {
            setArticles((prev) => [
              {
                title: newArticle,
                body: "",
                image: image,
                id: new Date().getTime(),
                username: userName,
                randomDate: new Date(),
                hasImage: false,
              },
              ...prev,
            ]);
            setNewArticle("");
            clearImage();
          }}
        >
          Post
        </button>

        <button
          onClick={() => {
            setNewArticle("");
            clearImage();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ArticleInput;
