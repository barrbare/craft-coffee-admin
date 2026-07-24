import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const CoffeeContext = createContext();

const initialCoffees = [
  {
    id: uuidv4(),
    title: "Classic Cappuccino",
    ingredients: [],
    description: "Classic Italian coffee with steamed milk foam",
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500",
    country: "Italy",
    caffeine: "150mg",
    totalPrice: 2.0
  }
];

export const CoffeeProvider = ({ children }) => {
  const [coffees, setCoffees] = useState(() => {
    const saved = localStorage.getItem("craft_coffee_items");
    return saved ? JSON.parse(saved) : initialCoffees;
  });

  useEffect(() => {
    localStorage.setItem("craft_coffee_items", JSON.stringify(coffees));
  }, [coffees]);

  const calculateTotalPrice = (selectedIngredientIds = [], allIngredients = []) => {
    const basePrice = 2;
    const ingredientsSum = selectedIngredientIds.reduce((sum, ingId) => {
      const found = allIngredients.find((i) => i.id === ingId);
      return sum + (found ? Number(found.price) : 0);
    }, 0);

    return Number((basePrice + ingredientsSum).toFixed(2));
  };

  const addCoffee = (newCoffee, ingredientsList) => {
    const calculatedPrice = calculateTotalPrice(newCoffee.ingredients, ingredientsList);
    const itemToAdd = {
      ...newCoffee,
      id: uuidv4(),
      totalPrice: calculatedPrice
    };
    setCoffees((prev) => [...prev, itemToAdd]);
  };

  const deleteCoffee = (id) => {
    setCoffees((prev) => prev.filter((item) => item.id !== id));
  };

  const updateCoffee = (id, updatedData, ingredientsList) => {
    const calculatedPrice = calculateTotalPrice(updatedData.ingredients, ingredientsList);
    setCoffees((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, ...updatedData, totalPrice: calculatedPrice }
          : item
      )
    );
  };

  return (
    <CoffeeContext.Provider
      value={{
        coffees,
        addCoffee,
        deleteCoffee,
        updateCoffee
      }}
    >
      {children}
    </CoffeeContext.Provider>
  );
};

export const useCoffee = () => {
  const context = useContext(CoffeeContext);
  if (!context) {
    throw new Error("useCoffee must be used within a CoffeeProvider");
  }
  return context;
};