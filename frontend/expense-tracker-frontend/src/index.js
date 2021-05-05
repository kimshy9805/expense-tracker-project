import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import styled from "styled-components";
import { Provider } from "react-redux";
import store from "./services/store";
 
//3. after store.js
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
