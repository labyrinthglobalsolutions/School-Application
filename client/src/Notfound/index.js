import React from "react";
import "./index.css";
import notfound from "../images/not-found.png";

export const NotFound = ({ text }) => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-text">{text}</h1>
      <img src={notfound} alt="No Bills Found" className="not-found-image" />
    </div>
  );
};
