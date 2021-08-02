import React, { useState, useEffect } from "react";
import InputTab from "../Components/InputTab";
import StockBox from "../Components/StockBox/StockBox";
import { useParams, useHistory } from "react-router-dom";
import "./recPage.css";
import logo from "./logo.png";

const RecPage = () => {
  const params = useParams();
  const history = useHistory();
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    // check that the params in the url are valid
    if (isNaN(+params.income) || isNaN(+params.investment_amount)) {
      alert("Please input valid numbers for income and investment amount");
    } else {
      setStocks([]);
      fetch("/stocks", {
        method: "GET",
        income: params.income,
        investment_amount: params.investment_amount,
      })
        .then((res) => res.json())
        .then((data) => {
          setStocks(data.stocks);
        });
    }
  }, [params]);

  const requestStocks = (values) => {
    history.push("/stockRecs/" + values.income + "/" + values.investingAmount);
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
