import React, { useState } from "react";
import StockItem from "./StockItem/StockItem";
import "./StockBox.css";

const StockBox = ({ stocks }) => {
  const [numStocks, setNumStocks] = useState(16);

  return (
    <div>
      <div className="stockBox">
        {stocks
          .slice(0, Math.min(stocks.length, numStocks))
          .map((stock, key) => (
            <StockItem key={key} {...stock} />
          ))}
      </div>

      <div>
        <button onClick={() => setNumStocks(Math.min(64, numStocks + 16))}>
          Show More
        </button>
        <button onClick={() => setNumStocks(Math.max(0, numStocks - 16))}>
          Show less
        </button>

        <div>{numStocks}</div>
      </div>
    </div>
  );
};

export default StockBox;
