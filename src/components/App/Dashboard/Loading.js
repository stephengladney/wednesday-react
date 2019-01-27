import React from "react";
import { randomWednesdayQuote } from "../../../wednesday";

const Loading = () => {
  return (
    <div className="ui segment" style={{ height: "100%" }}>
      <div className="ui active dimmer" style={{ height: "100%" }}>
        <div
          className="ui text loader huge"
          style={{ left: "48%", top: "48%" }}
        >
          {randomWednesdayQuote()}
        </div>
      </div>
    </div>
  );
};
export default Loading;
