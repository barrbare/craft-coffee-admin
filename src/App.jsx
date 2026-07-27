import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import IngredientsPage from "./pages/IngredientsPage";
import CoffeePage from "./pages/CoffeePage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/ingredients" replace />} />
        <Route path="/ingredients" element={<IngredientsPage />} />
        <Route path="/coffees" element={<CoffeePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;