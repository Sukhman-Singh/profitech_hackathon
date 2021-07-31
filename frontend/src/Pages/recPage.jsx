import React, { useState } from "react";
import InputTab from "../Components/InputTab/InputTab";
import StockBox from "../Components/StockBox/StockBox";

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
    <div>
      <InputTab requestStocks={requestStocks} />
      <StockBox stocks={stocks} />
    </div>
  );
};

export default RecPage;
