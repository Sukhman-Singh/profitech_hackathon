import React from "react";
import StockItem from "./StockItem/StockItem";

const StockBox = ({ stocks }) => {
  return (
    <div>
      {stocks.map((stock) => (
        <StockItem {...stock} />
      ))}
    </div>
  );
};

export default StockBox;
