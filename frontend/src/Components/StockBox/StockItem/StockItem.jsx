import React from "react";
import "./StockItem.css";

const riskLevelColors = ["red", "purple", "orange"];

const StockItem = ({ name, price, riskLevel, link }) => {
  return (
    <a href={"https://" + link}>
      <div
        className="stockItem"
        style={{ backgroundColor: riskLevelColors[riskLevel] }}
      >
        <div className="stockName">{name}</div>
        <div className="stockPrice">${price}</div>
        <div className="stockRiskLevel">Risk: {riskLevel}</div>
        <div className="stockLink">{link}</div>
      </div>
    </a>
  );
};

export default StockItem;
