/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState } from "react";
import "./ToggleButton.css";


const ToggleButton = ({ enabled, onToggle }) => {
  const [toggle, setToggle] = useState(enabled || false);

  const handleClick = () => {
    setToggle(!toggle);
    onToggle(!toggle);
  };

  return (
    <button type="button" className={`toggle-button ${toggle ? "selected" : ""}`} onClick={handleClick}>{`${toggle ? "True" : "False"}`}</button>
  );
};

export default ToggleButton;
