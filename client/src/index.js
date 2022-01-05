import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import "./index.css";
import { StateProvider } from "./StateProvider";

ReactDOM.render(
  <StateProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </StateProvider>,
  document.getElementById("root")
);
