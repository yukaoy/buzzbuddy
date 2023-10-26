import React from "react";
import Registration from "../components/landing/Registration";
import LogIn from "../components/landing/LogIn";

const Landing = () => {
  return (
    <div>
      <div className="welcome-title">Welcome to BuzzBuddy</div>
      <div className="registration-container">
        <div className="registration-form">
          <Registration />
        </div>
        <div className="login-form">
          <LogIn />
        </div>
      </div>
    </div>
  );
};

export default Landing;
