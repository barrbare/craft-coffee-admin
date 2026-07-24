import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const IngredientsContext = createContext();

const initialIngredients = [
  {
    id: uuidv4(),
    name: "Espresso Shot",
    price: 1.5,
    description: "Dark and rich espresso shot",
    strength: "High",
    flavor: "Bitter"
  },
  {
    id: uuidv4(),
    name: "Steamed Milk",
    price: 1.0,
    description: "Creamy fresh whole milk",
    strength: "Low",
    flavor: "Sweet/Creamy"
  }
];

export const IngredientsProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState(() => {
    const saved = localStorage.getItem("craft_coffee_ingredients");
    return saved ? JSON.parse(saved) : initialIngredients;
  });

  useEffect(() => {
    localStorage.setItem("craft_coffee_ingredients", JSON.stringify(ingredients));
  }, [ingredients]);

  const addIngredient = (newIngredient) => {
    const itemToAdd = {
      ...newIngredient,
      id: uuidv4(),
      price: Number(newIngredient.price)
    };
    setIngredients((prev) => [...prev, itemToAdd]);
  };

  const deleteIngredient = (id) => {
    setIngredients((prev) => prev.filter((item) => item.id !== id));
  };

  const updateIngredient = (id, updatedData) => {
    setIngredients((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, ...updatedData, price: Number(updatedData.price) }
          : item
      )
    );
  };

  return (
    <IngredientsContext.Provider
      value={{
        ingredients,
        addIngredient,
        deleteIngredient,
        updateIngredient
      }}
    >
      {children}
    </IngredientsContext.Provider>
  );
};

export const useIngredients = () => {
  const context = useContext(IngredientsContext);
  if (!context) {
    throw new Error("useIngredients must be used within an IngredientsProvider");
  }
  return context;
};