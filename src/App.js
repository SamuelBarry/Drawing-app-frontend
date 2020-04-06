import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Join from "./components/join";
import Game from "./components/game";

const App = () => (
  <BrowserRouter>
    <Route path="/game" component={Game} />
    <Route path="/" exact component={Join} />
  </BrowserRouter>
);

export default App;
