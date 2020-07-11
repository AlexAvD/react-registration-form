import React from "react";
import icons from "./icons";
import "./style.scss";

const Icon = ({ type }) => {
  const CurrentIcon = icons[type];
  return (
    <span className="icon">
      <CurrentIcon />
    </span>
  );
};

export default Icon;
