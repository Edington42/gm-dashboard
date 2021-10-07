import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RollProvider } from "./RollContext";
import { RollLogProvider } from "./RollLogContext";

ReactDOM.render(
  <React.StrictMode>
    <RollLogProvider>
      <App />
    </RollLogProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
