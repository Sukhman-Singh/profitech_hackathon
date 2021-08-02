import "./App.css";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import RecPage from "./Pages/recPage";
import HomePage from "./Pages/homePage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route
          path="/stockRecs/:income/:investment_amount"
          exact
          component={RecPage}
        />
        <Route path="/">
          <div>Error 404</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
