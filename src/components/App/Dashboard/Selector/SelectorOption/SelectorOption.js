import React from "react";
import "./SelectorOption.css";

const SelectorOption = ({ value, func, selected, total }) => {
  return (
    <div
      className="SelectorOption"
      style={{
        color: value === selected ? "#ff5e54" : "#ffffff"
        // width: `${Math.floor(100 / total)}%`
      }}
      onClick={func}
    >
      {value}
    </div>
  );
};

export default SelectorOption;
