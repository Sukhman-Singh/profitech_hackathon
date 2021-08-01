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
    <a href={"https://" + link}>
      <div className="stockItem" style={{ backgroundColor: sizeColors[size] }}>
        <div className="stockRow">
          <div className="stockCol">
            <div className="stockTicker">{ticker}</div>
          </div>
          <div className="stockCol">
            <div className="stockName">{name}</div>
            <div className="stockAnalystRec">{analyst_recommendation}</div>
          </div>
        </div>

        <div className="stockRow">
          <div className="stockCol">
            <div className="stockSector">{sector}</div>
          </div>
          <div className="stockCol">
            {/* <div className="stockMarketCap">MarketCap: {market_cap}</div> */}
            <div className="stockPrice">
              ${price} + {daily_change}
            </div>
          </div>
        </div>
        {/* 
        TODO add or keep?
        <div className="stockAnalystRec">
          Analyst Recommendation: {analyst_recommendation}
        </div> */}
      </div>
    </a>
  );
};

export default StockItem;
