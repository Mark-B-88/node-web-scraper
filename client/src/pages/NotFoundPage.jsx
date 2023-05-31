import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  const pageStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    height: "100vh",
    width: "100vw",
    backgroundColor: "rgba(0, 0, 0, 1)",
    color: "#68a063",
  };

  return (
    <>
      <div style={pageStyles}>
        <div className="container p-5">
          <h1>Page Not Found!</h1>
          <p>The page you are looking for does not exist</p>
          <Link to="/" className="btn-node-green">
            Go Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
