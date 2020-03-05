/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState } from "react";

const ToggleButton = ({ buttonText, enabled, onToggle }) => {
  const [toggle, setToggle] = useState(enabled || false);

  const handleClick = () => {
    setToggle(!toggle);
    onToggle(!toggle);
  };

  return (
    <button type="button" className="ToggleButton" onClick={handleClick}>{`${buttonText}: ${toggle ? "True" : "False"}`}</button>
  );
};

export default ToggleButton;
