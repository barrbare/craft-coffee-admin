import React, { createContext, useContext, useState, useEffect } from "react";

const IngredientsContext = createContext();

const initialIngredients = [
  {
    id: "1",
    name: "Espresso Shot",
    price: 1.5,
    description: "Dark and rich espresso shot",
    strength: "High",
    flavor: "Bitter"
  },
  {
    id: "2",
    name: "Steamed Milk",
    price: 1.0,
    description: "Creamy fresh whole milk",
    strength: "Low",
    flavor: "Sweet/Creamy"
  },
  {
    id: "3",
    name: "Vanilla Syrup",
    price: 0.8,
    description: "Sweet Madagascar vanilla flavor",
    strength: "None",
    flavor: "Sweet"
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
      id: Date.now().toString(),
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