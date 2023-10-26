import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

const LogIn = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [logInPassword, setLogInPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let error = false;

    // Validation for display
    const startsWithNumber = /^[0-9]/.test(userName);
    const userNameError = document.querySelector(".userName .error");
    if (startsWithNumber) {
      error = true;
      userNameError.style.display = "inline";
      userNameError.textContent = "User name may not start with a number.";
    } else {
      userNameError.style.display = "none";
    }

    const passwordError = document.querySelector(".logInPassword .error");

    if (!error) {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users?username=" + userName
      );
      const users = await response?.json();
      if (users?.length === 0) {
        setLoggedIn(false);
        localStorage.setItem("loggedInState", false);
        userNameError.style.display = "inline";
        userNameError.textContent = "User does not exist.";
      } else if (
        users?.length > 0 &&
        users[0]?.address.street !== logInPassword
      ) {
        setLoggedIn(false);
        localStorage.setItem("loggedInState", false);
        passwordError.style.display = "inline";
        passwordError.textContent = "Password is incorrect.";
      } else {
        setLoggedIn(true);
        localStorage.setItem("loggedInState", true);
        localStorage.setItem("loggedInUser", userName);
        navigate("/main");
        setUserName("");
        setLogInPassword("");
      }
    }
  };

  return (
    <form>
      <div className="form-title">Login</div>
      <div className="userName">
        <label htmlFor="userName">User Name</label>
        <input
          id="userName"
          name="userName"
          type="text"
          placeholder="your user name"
          data-testid="username-login"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <span id="userNameValue">{userName}</span>
        <span className="updated"></span>
        <span className="error" data-testid="username-error"></span>
      </div>
      <div className="logInPassword">
        <label htmlFor="logInPassword">Password</label>
        <input
          id="logInPassword"
          name="logInPassword"
          type="password"
          placeholder="Password"
          data-testid="password-login"
          value={logInPassword}
          onChange={(e) => setLogInPassword(e.target.value)}
        />
        <span id="logInPasswordValue">{"*".repeat(logInPassword.length)}</span>
        <span className="updated"></span>
        <span className="error" data-testid="password-error"></span>
      </div>
      <button
        data-testid="login-button"
        id="submit"
        type="submit"
        onClick={handleSubmit}
      >
        Login
      </button>
    </form>
  );
};

export default LogIn;
