import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleScrapeClick = async () => {
    try {
      const response = await axios.post("/api/v1/scrape", { url });

      if (response.status === 200 && response.data.status === "success") {
        setSuccessMsg("File downloaded successfully!");
        navigate("/output");
      } else {
        console.error("Failed to scrape website");
        setErrorMsg("Failed to scrape website");
      }
    } catch (error) {
      console.error("Failed to scrape website", error);
    }
  };

  return (
    <>
      <div className="scraper-container">
        <div className="container">
          <div className="row justify-content-start align-items-center">
            <img
              src="https://nodejs.org/static/images/logo.svg"
              alt="node logo"
              className="node-logo mb-2"
            />
            <h1>Web Scraper</h1>
          </div>
          <div className="row justify-content-start align-items-center">
            <p className="text-white">
              Enter a URL of a website to scrape the results
            </p>
          </div>
          <div className="row justify-content-start align-items-center">
            <div className="d-flex flex-wrap justify-content-between align-items-center">
              <input
                type="text"
                className="form-control mb-3 mb-sm-0 input-width"
                placeholder="Enter URL"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button
                className="btn-node-green"
                id="scrape"
                onClick={handleScrapeClick}
              >
                Scrape
              </button>
            </div>
          </div>
          <div className="row justify-content-start align-items-center">
            <p className="mt-3">
              {successMsg && <p className="text-sucess">{successMsg}</p>}
              {errorMsg && <p className="text-danger">{errorMsg}</p>}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
