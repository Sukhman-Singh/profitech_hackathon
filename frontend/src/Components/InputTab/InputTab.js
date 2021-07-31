import React, { useEffect, useState } from "react";

const InputTab = () => {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch("/time")
      .then((res) => res.json())
      .then((data) => {
        setCurrentTime(data.time);
      });
  }, []);

  return (
    <div>
      <input placeholder="Income Amount" />
      <input placeholder="Amount to be Invested" />

      <p>The current time is {currentTime}.</p>
    </div>
  );
};

export default InputTab;
