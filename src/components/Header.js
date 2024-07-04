// src/components/Header.js

import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/chat-bot_9733185.png";
import "../CSS/Header.css";

const Header = ({ user, setUser }) => {
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <header className="header">
      <img src={logo} alt="Logo" className="logo" />
      <h1>AI-Powered Content Summarizer</h1>

      <nav>
        <Link to="/">Home</Link>
        {user ? (
          <>
            <span>Welcome, {user.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
