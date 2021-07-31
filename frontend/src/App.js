import "./App.css";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import InputTab from "../src/Components/InputTab/InputTab";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <InputTab />
        </Route>
        <Route path="/">
          <div>Error 404</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
