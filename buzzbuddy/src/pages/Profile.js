import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../components/profile/Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const userName = localStorage.getItem("loggedInUser") || "Bret";

  // States for Current Info display
  const [currDisplay, setCurrDisplay] = useState(userName);
  const [currEmail, setCurrEmail] = useState("leanne.graham@gmail.com");
  const [currPhone, setCurrPhone] = useState("123-123-1234");
  const [currZipcode, setCurrZipcode] = useState("12345");

  // Temporary states for Update Info form
  const [display, setDisplay] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordc, setPasswordc] = useState("");

  const handleUpdate = (event) => {
    event.preventDefault();
    let error = false;

    // Validation for display
    const displayName = display;
    const startsWithNumber = /^[0-9]/.test(displayName);
    const displayError = document.querySelector(".display .error");
    if (displayName && startsWithNumber) {
      error = true;
      displayError.style.display = "inline";
      displayError.textContent = "Display name may not start with a number.";
    } else {
      displayError.style.display = "none";
    }

    // Validation for email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailError = document.querySelector(".email .error");
    if (email && !email.match(emailRegex)) {
      error = true;
      emailError.style.display = "inline";
      emailError.textContent = "Please enter a valid email address.";
    } else {
      emailError.style.display = "none";
    }

    // Validation for phone
    const phoneRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    const phoneError = document.querySelector(".phone .error");
    if (phone && !phone.match(phoneRegex)) {
      error = true;
      phoneError.style.display = "inline";
      phoneError.textContent =
        "Please enter a valid phone number in the format 123-123-1234.";
    } else {
      phoneError.style.display = "none";
    }

    // Validation for zipcode
    const zipcodeError = document.querySelector(".zipcode .error");
    if ((zipcode && zipcode.length !== 5) || isNaN(zipcode)) {
      error = true;
      zipcodeError.style.display = "inline";
      zipcodeError.textContent = "Zipcodes should be 5 digits.";
    } else {
      zipcodeError.style.display = "none";
    }

    // Validation for password confirmation
    const passwordcError = document.querySelector(".passwordc .error");
    if (password !== passwordc) {
      error = true;
      passwordcError.style.display = "inline";
      passwordcError.textContent = "Passwords do not match.";
    } else {
      passwordcError.style.display = "none";
    }

    if (!error) {
      if (displayName) {
        setCurrDisplay(display);
      }
      if (email) {
        setCurrEmail(email);
      }
      if (phone) {
        setCurrPhone(phone);
      }
      if (zipcode) {
        setCurrZipcode(zipcode);
      }

      setDisplay("");
      setEmail("");
      setPhone("");
      setZipcode("");
      setPassword("");
      setPasswordc("");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-pic-container">
        <img
          src="https://picsum.photos/300/300?random=4"
          alt="User Profile"
          className="profile-pic"
        />
        <input type="file" ref={fileInputRef} />
        <button onClick={() => navigate("/main")}>Back to Main Page</button>
      </div>

      <div className="current-info-form">
        <div className="form-title">Current Info</div>
        <div className="display">Display Name: {currDisplay}</div>
        <div className="email">Email Address: {currEmail}</div>
        <div className="phone">Phone Number: {currPhone}</div>
        <div className="zipcode">Zipcode: {currZipcode}</div>
      </div>

      <div className="update-info-form">
        <div className="form-title">Update Info</div>
        <form>
          {/* <div className="display">
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
          </div> */}
          <div className="email">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span id="emailValue">{email}</span>
            <span className="updated"></span>
            <span className="error"></span>
          </div>
          <div className="phone">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              placeholder="123-123-1234"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <span id="phoneValue">{phone}</span>
            <span className="updated"></span>
            <span className="error"></span>
          </div>
          <div className="zipcode">
            <label htmlFor="zipcode">Zipcode</label>
            <input
              id="zipcode"
              name="zipcode"
              placeholder="12345"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
            />
            <span id="zipcodeValue">{zipcode}</span>
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
          <div className="passwordc">
            <label htmlFor="passwordc">Password Confirmation</label>
            <input
              id="passwordc"
              name="passwordc"
              type="password"
              placeholder="password confirmation"
              value={passwordc}
              onChange={(e) => setPasswordc(e.target.value)}
            />
            <span id="passwordcValue">{"*".repeat(passwordc.length)}</span>
            <span className="updated"></span>
            <span className="error"></span>
          </div>

          <button id="submit" type="submit" onClick={handleUpdate}>
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
