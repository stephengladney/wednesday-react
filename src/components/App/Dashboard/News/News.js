import React from "react";
import "./News.css";

const News = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <h1 className="title">news</h1>
        <div
          className="newsApiWatermark"
          style={{
            margin: "13px 100px 0px 0px"
          }}
        >
          Powered by <a href="https://newsapi.org">NewsAPI.org</a>
        </div>
      </div>
    </div>
  );
};

export default News;
