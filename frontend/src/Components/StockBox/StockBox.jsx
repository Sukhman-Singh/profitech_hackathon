import React, { useState, useEffect } from "react";
import StockItem from "./StockItem/StockItem";
import "./StockBox.css";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
} from "@material-ui/core";

const StockBox = ({ stocks, isLoading }) => {
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
              disabled={isLoading}
              onChange={toggleSizeFilter}
              value="micro"
              aria-label="micro"
              style={{
                color: "#C3F292",
              }}
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
              disabled={isLoading}
              style={{
                color: "#A2CCE2",
              }}
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
              disabled={isLoading}
              style={{
                color: "#FEA485",
              }}
            />
          }
          label="mid"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={sizeFilters.large}
              disabled={isLoading}
              onChange={toggleSizeFilter}
              value="large"
              aria-label="large"
              style={{
                color: "#CFB4C7",
              }}
            />
          }
          label="large"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={sizeFilters.mega}
              disabled={isLoading}
              onChange={toggleSizeFilter}
              value="mega"
              aria-label="mega"
              style={{
                color: "#B6B8CE",
              }}
            />
          }
          label="mega"
        />
      </div>

      <div className="stonks">
        {isLoading ? (
          <div className="memeClass">
            <CircularProgress
              style={{
                backgroundColor: "#D4A373",
                height: "100px",
                width: "100px",
                color: "transparent",
              }}
            />
          </div>
        ) : filteredStocks.length ? (
          <div className="stockBox">
            {filteredStocks
              .slice(0, Math.min(filteredStocks.length, numStocks))
              .map((stock, key) => (
                <StockItem key={key} {...stock} />
              ))}
          </div>
        ) : (
          <div>no stonks for you (adjust filters accordingly)</div>
        )}
      </div>
      <div className="pageButtons">
        {numStocks !== 64 && !isLoading ? (
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
          <Button className="buttons" disabled>
            Show More
          </Button>
        )}
        {numStocks !== 16 && !isLoading ? (
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
          <Button className="buttons" disabled>
            Show Less
          </Button>
        )}
      </div>
    </div>
  );
};

export default StockBox;
