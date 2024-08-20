import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ShopProvider } from "./context/ShopContext";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <ShopProvider>
    <App />
  </ShopProvider>
);
