// src/components/Sidebar.js

import React, { useState } from "react";
import { AiOutlineHistory, AiOutlineClose } from "react-icons/ai"; // Import close icon
import "../CSS/Sidebar.css";

const Sidebar = ({ history }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar__header">
        <h2 className="sidebar__title">
          <AiOutlineHistory /> Scraped History
        </h2>
        <button className="sidebar__toggle-btn" onClick={toggleSidebar}>
          {isOpen ? (
            <AiOutlineClose />
          ) : (
            <div className="hamburger-icon" title="Open-sidebar">
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          )}
        </button>
      </div>
      <ul className="sidebar__list">
        {history.map((item, index) => (
          <li key={index} className="sidebar__list-item">
            <p>
              <strong>Content:</strong> {item.content.slice(0, 100)}...
            </p>
            <p>
              <strong>Summary:</strong> {item.summary}
            </p>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
