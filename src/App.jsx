import React from "react";
import ReactDOM from "react-dom";

import { Button } from "components/Button";
import "./index.css";

const App = () => (
  <div>
    <Button
      className="button-classic"
    >
      consumer
    </Button>
  </div>
);

ReactDOM.render(<App />, document.getElementById("app"));
