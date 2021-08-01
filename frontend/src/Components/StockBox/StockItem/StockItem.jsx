import React from "react";
import "./StockItem.css";

// stock_dict = {
//   'Name': str,
//   'Ticker': str,
//   'Sector': str,
//   'Size': str (Mega, Large, Mid, Small, Micro),
//   'Market_Cap': str,
//   'DailyChange': str,
//   'AnalystRecommendation': float (1=Strong buy, 5=Hard Sell),
// price? link?

const sizeColors = {
  micro: "orange",
  small: "purple",
  mid: "red",
  large: "green",
  mega: "yellow",
};

const StockItem = ({
  name,
  ticker,
  price,
  sector,
  size,
  marketCap,
  dailyChange,
  analystRec,
  link,
}) => {
  return (
    <a href={"https://" + link}>
      <div className="stockItem" style={{ backgroundColor: sizeColors[size] }}>
        <div className="stockName">{name}</div>
        <div className="stockPrice">
          ${price} + {dailyChange}
        </div>
        <div className="stockSize">Size: {size}</div>
        <div className="stockMarketCap">MarketCap: {marketCap}</div>
        <div className="stockSector">Sector: {sector}</div>
        <div className="stockTicker">Ticker: {ticker}</div>
        <div className="stockAnalystRec">
          Analyst Recommendation: {analystRec}
        </div>
        <div className="stockLink">{link}</div>
      </div>
    </a>
  );
};

export default StockItem;
