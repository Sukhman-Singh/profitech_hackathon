import React, { useState, useEffect } from "react";
import StockItem from "./StockItem/StockItem";
import "./StockBox.css";
import { Button, Checkbox, FormControlLabel } from "@material-ui/core";

const StockBox = ({ stocks }) => {
  const [numStocks, setNumStocks] = useState(16);
  const [filteredStocks, setFilteredStocks] = useState(stocks);
  const [sizeFilters, setSizeFilters] = useState({
    micro: true,
    small: true,
    mid: true,
    large: true,
    mega: true,
  });

  const toggleSizeFilter = (e) => {
    setSizeFilters({
      ...sizeFilters,
      [e.target.value]: !sizeFilters[e.target.value],
    });
  };

  useEffect(() => {
    setFilteredStocks(stocks.filter((stock) => sizeFilters[stock.size]));
  }, [sizeFilters, stocks]);

  return (
    <div className="stockBoxPage">
      <div className="filterButtons">
        <FormControlLabel
          control={
            <Checkbox
              checked={sizeFilters.micro}
              onChange={toggleSizeFilter}
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
              onChange={toggleSizeFilter}
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
              onChange={toggleSizeFilter}
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
              onChange={toggleSizeFilter}
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
              onChange={toggleSizeFilter}
              value="mega"
              aria-label="mega"
            />
          }
          label="mega"
        />
      </div>
      <div className="stockBox">
        {filteredStocks
          .slice(0, Math.min(filteredStocks.length, numStocks))
          .map((stock, key) => (
            <StockItem key={key} {...stock} />
          ))}
      </div>

      <div className="pageButtons">
        {numStocks !== 64 ? (
          <Button
            className="buttons"
            style={{
              backgroundColor: "#D4A373",
              color: "#FFFFFF",
            }}
            color="primary"
            type="submit"
            onClick={() => setNumStocks(Math.min(64, numStocks + 16))}
          >
            Show More
          </Button>
        ) : (
          <Button className="buttons" disabled fullWidth>
            Show More
          </Button>
        )}
        {numStocks !== 16 ? (
          <Button
            className="buttons"
            style={{
              backgroundColor: "#D4A373",
              color: "#FFFFFF",
            }}
            color="primary"
            type="submit"
            onClick={() => setNumStocks(Math.max(16, numStocks - 16))}
          >
            Show Less
          </Button>
        ) : (
          <Button className="buttons" disabled fullWidth>
            Show Less
          </Button>
        )}
      </div>
    </div>
  );
};

export default StockBox;
