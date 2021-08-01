import "./App.css";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import RecPage from "./Pages/recPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={RecPage} />
        <Route path="/">
          <div>Error 404</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
