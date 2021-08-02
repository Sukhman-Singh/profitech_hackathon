import React, { useEffect, useState } from "react";

const InputTab = ({ requestStocks }) => {
  const [currentTime, setCurrentTime] = useState(0);

  return (
    <div>
      <input placeholder="Income Amount" />
      <input placeholder="Amount to be Invested" />

      <button onClick={() => requestStocks("hello")}>Ree</button>
    </div>
  );
};

export default InputTab;
