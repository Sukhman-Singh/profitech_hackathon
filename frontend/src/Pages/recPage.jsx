import React, { useState } from "react";
import InputTab from "../Components/InputTab/InputTab";
import StockBox from "../Components/StockBox/StockBox";
import "./recPage.css";
import logo from "./logo.png";

const RecPage = () => {
  const [stocks, setStocks] = useState([]);
  const requestStocks = (values) => {
    fetch("/stocks")
      .then((res) => res.json())
      .then((data) => {
        setStocks(data.stocks);
      });
  };
  return (
    // TODO change class name
    <div className="test">
      <div className="logoAndName">
        <img src={logo} alt="logo" height="200px"></img>
        <div className="name">Stock Box</div>
      </div>
      <InputTab requestStocks={requestStocks} />
      <StockBox stocks={stocks} />
    </div>
  );
};

export default RecPage;
