import React, { useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import "../CSS/Results.css";

const Results = ({ content, summary }) => {
  const [summaryLength, setSummaryLength] = useState("medium"); // Initial summary length

  // Function to handle radio button change and set summary length
  const handleRadioChange = (event) => {
    setSummaryLength(event.target.value);
  };

  // Function to export summary text as a file
  const handleExportText = () => {
    const element = document.createElement("a");
    const file = new Blob([summary], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "summary.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="results-container">
      <div className="radio-text">Select Summary Length:</div>
      <div className="radio-buttons">
        <input
          type="radio"
          id="short"
          name="summaryLength"
          value="short"
          checked={summaryLength === "short"}
          onChange={handleRadioChange}
        />
        <label htmlFor="short">Short</label>

        <input
          type="radio"
          id="medium"
          name="summaryLength"
          value="medium"
          checked={summaryLength === "medium"}
          onChange={handleRadioChange}
        />
        <label htmlFor="medium">Medium</label>

        <input
          type="radio"
          id="long"
          name="summaryLength"
          value="long"
          checked={summaryLength === "long"}
          onChange={handleRadioChange}
        />
        <label htmlFor="long">Long</label>
      </div>
      <div className="content-section">
        <h2>Original Content</h2>
        <div className="content-box">
          {content ? (
            <p>{content}</p>
          ) : (
            <p className="placeholder">No content available.</p>
          )}
        </div>
      </div>
      <div className="summary-section">
        <h2>AI-Generated Summary ({summaryLength})</h2>
        <div className="content-box">
          {summary ? (
            <p>{summary}</p>
          ) : (
            <p className="placeholder">No summary available.</p>
          )}
        </div>
        <div className="button-section">
          <button onClick={handleExportText}>
            Export as Text <AiOutlineDownload />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
