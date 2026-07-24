import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { IngredientsProvider } from "./context/IngredientsContext.jsx";
import { CoffeeProvider } from "./context/CoffeeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <IngredientsProvider>
      <CoffeeProvider>
        <App />
      </CoffeeProvider>
    </IngredientsProvider>
  </React.StrictMode>
);