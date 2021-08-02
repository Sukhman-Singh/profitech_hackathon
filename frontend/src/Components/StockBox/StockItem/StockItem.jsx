import React from "react";
import "./StockItem.css";

const sizeColors = {
  micro: "orange",
  small: "purple",
  mid: "red",
  large: "blue",
  mega: "yellow",
};

const StockItem = ({
  name,
  ticker,
  price,
  sector,
  size,
  market_cap,
  daily_change,
  analyst_recommendation,
  link,
}) => {
  return (
    <a href={link}>
      <div className="stockItem" style={{ backgroundColor: sizeColors[size] }}>
        <div className="stockRow">
          <div className="stockCol">
            <div className="stockTicker">{ticker}</div>
          </div>
          <div className="stockCol">
            <div className="stockName">{name}</div>
            <div className="stockAnalystRec">
              Analyst Rating: {analyst_recommendation}
            </div>
            <div>
              Price: <span className="stockPrice">${price}</span>
            </div>
          </div>
        </div>
        <div className="stockRow bottom">
          <div className="stockCol">
            <div className="stockMarketCap">Market Cap: {market_cap}</div>
            <div className="stockSector">{sector}</div>
          </div>
          <div className="stockCol">
            <div className="stockDailyChange">{daily_change}%</div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default StockItem;
