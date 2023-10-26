import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MiniProfile({ user }) {
  const navigate = useNavigate();
  const [statusHeadline, setStatusHeadline] = useState("Excited");
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    const savedHeadline = JSON.parse(localStorage.getItem("headline"));
    if (savedHeadline) {
      setStatusHeadline(savedHeadline);
    } else if (user && user.company) {
      //json login users
      setStatusHeadline(user.company.catchPhrase);
      localStorage.setItem(
        "headline",
        JSON.stringify(user.company.catchPhrase)
      );
      setInputValue(user.company.catchPhrase);
    }
  }, [user]);

  const handleUpdateStatus = () => {
    setStatusHeadline(inputValue);
    localStorage.setItem("headline", JSON.stringify(inputValue));
  };

  const userName = localStorage.getItem("loggedInUser") || "";

  const handleLogout = () => {
    setStatusHeadline("");
    localStorage.removeItem("headline");
    localStorage.removeItem("loggedInUser");
    localStorage.setItem("loggedInState", false);
    navigate("/");
  };

  return (
    <div className="user-info">
      <button onClick={() => (window.location.href = "/profile")}>
        Profile
      </button>
      <button data-testid="logout-button" onClick={handleLogout}>Logout</button>
      <div>
        <img src="https://picsum.photos/150/150?random=4" alt="User profile" />
        <h2>{userName}</h2>
        <p>{statusHeadline}</p>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleUpdateStatus}>Update</button>
      </div>
    </div>
  );
}

export default MiniProfile;
