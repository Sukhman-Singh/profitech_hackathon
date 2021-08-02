import React, { useState } from "react";
import StockItem from "./StockItem/StockItem";
import "./StockBox.css";

const StockBox = ({ stocks }) => {
  const [numStocks, setNumStocks] = useState(16);
  const [filteredStocks, setFilteredStocks] = useState(stocks);
  const [selectedFilters, setSelectedFilters] = useState([]);

  // function filterStocks(selectedSize) {
  //   switch (selectedSize) {
  //     case "micro":
  //       setFilteredStocks();
  //       break;
  //     case "small":
  //       // code block
  //       break;
  //     case "mid":
  //       // code block
  //       break;
  //     case "large":
  //       // code block
  //       break;
  //     case "mega":
  //       // code block
  //       break;
  //     default:
  //     // code block
  //   }
  // }

  return (
    <div className="stockBoxPage">
      <div className="filterButtons">
        <button className="microButton">Micro</button>
        <button className="smallButton">Small</button>
        <button className="midButton">Mid</button>
        <button className="largeButton">Large</button>
        <button className="megaButton">Mega</button>
      </div>
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
