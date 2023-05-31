import React, { useEffect, useState } from "react";
import axios from "axios";

const OutputPage = () => {
  const [html, setHtml] = useState("");

  useEffect(() => {
    const getScrapedData = async () => {
      try {
        const response = await axios.get("/api/v1/uploads/output.html");
        setHtml(response.data);
      } catch (error) {
        console.error("Error fetching scraped data", error);
      }
    };

    getScrapedData();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "inherit !important",
        color: "inherit !important",
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default OutputPage;
