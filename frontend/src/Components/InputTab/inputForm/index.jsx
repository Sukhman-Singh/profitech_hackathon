import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import "./inputForm.css";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { InputAdornment } from "@material-ui/core";

const validationSchema = yup.object({
  income: yup.number("Enter your income").required("Income is required"),
  investingAmount: yup
    .number("Enter your amount to invest")
    .lessThan(yup.ref("income"))
    .required("Investing amount is required"),
});

const InputForm = ({ requestStocks, setShowFilter }) => {
  const formik = useFormik({
    initialValues: {
      income: 10000,
      investingAmount: 5000,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      requestStocks(values);
    },
  });

  const requirePositive = (event) => {
    if (event.target.value < 0) event.target.value = 0;
    formik.handleChange(event);
  };

  return (
    <div className="inputForm">
      <div className="inputTabContainer">
        <div className="inputTabTitle">Filter</div>
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
      <div className="inputFormHideContainer">
        <div className="inputFormHide" onClick={() => setShowFilter(false)}>
          <ExpandLessIcon />
        </div>
      </div>
    </div>
  );
};
export default InputForm;
