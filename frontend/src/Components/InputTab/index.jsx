import React, { useState } from "react";
import "./inputTab.css";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import InputForm from "./inputForm";

const InputTab = ({ requestStocks }) => {
  const [showFilter, setShowFilter] = useState(false);
  return (
    <div className="inputTab">
      {showFilter ? (
        <InputForm
          requestStocks={requestStocks}
          setShowFilter={setShowFilter}
        />
      ) : (
        <div className="inputToggler" onClick={() => setShowFilter(true)}>
          <ExpandLessIcon />
        </div>
      )}
    </div>
  );
};

export default InputTab;
