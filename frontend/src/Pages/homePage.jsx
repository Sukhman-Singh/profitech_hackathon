import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { InputAdornment } from "@material-ui/core";
import logo from "./logo.png";
import { useFormik } from "formik";
import "./homePage.css";

const validationSchema = yup.object({
  income: yup.number("Enter your income").required("Income is required"),
  investingAmount: yup
    .number("Enter your amount to invest")
    .lessThan(yup.ref("income"))
    .required("Investing amount is required"),
});

const HomePage = ({ requestStocks, setShowFilter }) => {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      income: 10000,
      investingAmount: 5000,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      history.push(
        "/stockRecs/" + values.income + "/" + values.investingAmount
      );
      requestStocks(values);
    },
  });

  const requirePositive = (event) => {
    if (event.target.value < 0) event.target.value = 0;
    formik.handleChange(event);
  };

  return (
    <div className="homePage">
      <div className="logoAndName">
        <img src={logo} alt="logo" height="200px"></img>
        <div className="name">Stock Box</div>
      </div>

      <div className="inputForm">
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            className="inputTabFilter"
            variant="outlined"
            id="income"
            name="income"
            label="Income"
            value={formik.values.income}
            onChange={requirePositive}
            error={formik.touched.income && Boolean(formik.errors.income)}
            helperText={formik.touched.income && formik.errors.income}
            type="number"
          />
          <TextField
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            className="inputTabFilter"
            id="investingAmount"
            name="investingAmount"
            label="Amount To Invest"
            type="number"
            value={formik.values.investingAmount}
            onChange={requirePositive}
            error={
              formik.touched.investingAmount &&
              Boolean(formik.errors.investingAmount)
            }
            helperText={
              formik.touched.investingAmount && formik.errors.investingAmount
            }
          />
          <Button
            className="inputTabButton"
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
          >
            Generate
          </Button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
