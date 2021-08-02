import React, { useState } from "react";
import StockItem from "./StockItem/StockItem";
import "./StockBox.css";
import { Checkbox, FormControlLabel } from "@material-ui/core";

const StockBox = ({ stocks }) => {
  const [numStocks, setNumStocks] = useState(16);
  const [sizeFilters, setSizeFilters] = useState({
    micro: false,
    small: false,
    mid: false,
    large: false,
    mega: false,
  });

  const handleSizeChange = (e) => {
    console.log(sizeFilters);
    setSizeFilters({
      ...sizeFilters,
      [e.target.value]: !sizeFilters[e.target.value],
    });
  };

  return (
    <div className="stockBoxPage">
      <div className="filterButtons">
        <FormControlLabel
          control={
            <Checkbox
              checked={sizeFilters.micro}
              onChange={handleSizeChange}
              value="micro"
              aria-label="micro"
            />
          }
          label="micro"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={sizeFilters.small}
              onChange={handleSizeChange}
              value="small"
              aria-label="small"
            />
          }
          label="small"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={sizeFilters.mid}
              onChange={handleSizeChange}
              value="mid"
              aria-label="mid"
            />
          }
          label="mid"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={sizeFilters.large}
              onChange={handleSizeChange}
              value="large"
              aria-label="large"
            />
          }
          label="large"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={sizeFilters.mega}
              onChange={handleSizeChange}
              value="mega"
              aria-label="mega"
            />
          }
          label="mega"
        />
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
