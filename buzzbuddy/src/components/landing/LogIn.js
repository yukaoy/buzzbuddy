import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate;
  const [display, setDisplay] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let error = false;

    // Validation for display
    const displayName = display;
    const startsWithNumber = /^[0-9]/.test(displayName);
    const displayError = document.querySelector(".display .error");
    if (startsWithNumber) {
      error = true;
      displayError.style.display = "inline";
      displayError.textContent = "Display name may not start with a number.";
    } else {
      displayError.style.display = "none";
    }

    // Submit the form if there is no error
    if (!error) {
      // Submit logic here
      console.log("Form submitted successfully.");
      // Reset values
      setDisplay("");
      setPassword("");
      navigate("/main");
    }
  };

  return (
    <form>
      <div className="display">
        <label htmlFor="display">Display Name</label>
        <input
          id="display"
          name="display"
          type="text"
          placeholder="your display name"
          value={display}
          onChange={(e) => setDisplay(e.target.value)}
        />
        <span id="displayValue">{display}</span>
        <span className="updated"></span>
        <span className="error"></span>
      </div>
      <div className="password">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span id="passwordValue">{"*".repeat(password.length)}</span>
        <span className="updated"></span>
        <span className="error"></span>
      </div>
      <button id="submit" type="submit" onClick={handleSubmit}>
        Login
      </button>
    </form>
  );
};

export default LogIn;
