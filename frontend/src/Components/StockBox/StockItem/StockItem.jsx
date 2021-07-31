import React from "react";

const StockItem = ({ name, price, riskLevel, link }) => {
  return (
    <div style={{ border: "2px solid black" }}>
      <div>{name}</div>
      <div>{price}</div>
      <div>{riskLevel}</div>
      <div>{link}</div>
    </div>
  );
};

export default StockItem;
