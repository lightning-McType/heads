import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import DispatchCtx from "./context/DispatchCtx.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <DispatchCtx>
        <App />
      </DispatchCtx>
    </Provider>
  </React.StrictMode>
);
