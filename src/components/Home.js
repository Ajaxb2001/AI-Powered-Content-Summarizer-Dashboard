// src/components/Home.js

import React, { useState } from "react";
import axios from "axios";
import { AiOutlineSend, AiOutlineCloudDownload } from "react-icons/ai";
import Results from "./Results";
import LoadingSpinner from "./LoadingSpinner";
import "../CSS/Home.css";

const Home = () => {
  const [inputType, setInputType] = useState("text");
  const [inputContent, setInputContent] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (value) => {
    setInputContent(value);
    setError(null);
  };

  const handleSummarize = async () => {
    setIsLoading(true);
    try {
      const mockSummarizeAPI = (text) => {
        if (text.length > 100) {
          return "This is a summary of the long content.";
        }
        return "This is a short summary.";
      };
      const generatedSummary = mockSummarizeAPI(inputContent);
      setSummary(generatedSummary);
    } catch (error) {
      console.error("Error summarizing:", error);
      setError("Error summarizing content.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetchContent = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(inputContent);
      const parser = new DOMParser();
      const doc = parser.parseFromString(response.data, "text/html");
      const textContent = Array.from(doc.querySelectorAll("p, article"))
        .map((el) => el.textContent)
        .join(" ");
      setInputContent(textContent);
      setError(null);
    } catch (error) {
      console.error("Error fetching content:", error);
      setError("Error fetching content.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchInputType = (type) => {
    setInputType(type);
    setInputContent("");
    setError(null);
  };

  return (
    <div className="main-layout">
      <main className="main-content">
        <div className="input-type-switcher">
          <button
            className={inputType === "text" ? "active" : ""}
            onClick={() => handleSwitchInputType("text")}
          >
            Text Input
          </button>
          <button
            className={inputType === "url" ? "active" : ""}
            onClick={() => handleSwitchInputType("url")}
          >
            URL Input
          </button>
        </div>
        {inputType === "text" ? (
          <textarea
            className="input-field"
            value={inputContent}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Paste or type your long-form content here"
            rows="10"
            aria-label="Text input field"
          ></textarea>
        ) : (
          <div className="url-input-container">
            <input
              className="url-input"
              type="text"
              value={inputContent}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Enter URL to scrape content"
              aria-label="URL input field"
            />
            <button className="fetch-button" onClick={handleFetchContent}>
              Fetch Content <AiOutlineCloudDownload />
            </button>
          </div>
        )}
        <button className="summarize-button" onClick={handleSummarize}>
          Summarize <AiOutlineSend />
        </button>
        {error && <p className="error-message">{error}</p>}
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Results content={inputContent} summary={summary} />
        )}
      </main>
    </div>
  );
};

export default Home;
