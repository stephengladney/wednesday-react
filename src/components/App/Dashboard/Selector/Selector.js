import React from "react";
import "./Selector.css";

const Selector = props => {
  return (
    <div className="SelectorContainer">
      <div className="Selector">{props.children}</div>
    </div>
  );
};

export default Selector;
