import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import styled from "styled-components";
import { Provider } from "react-redux";
import { store, persistor } from "./services/store";
import { PersistGate } from "redux-persist/integration/react";

//3. after store.js
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
