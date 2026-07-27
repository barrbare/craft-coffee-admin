import React, { createContext, useContext, useState, useEffect } from "react";

const IngredientsContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1/resource";
const BYPASS_TOKEN = import.meta.env.VITE_BYPASS_TOKEN || "YXBpS2V5U2VjcmV0";

const headers = {
  "Content-Type": "application/json",
  "x-bypass-token": BYPASS_TOKEN,
};

export const IngredientsProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchIngredients = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/craft_coffee_ingredients`, { headers });
      if (res.ok) {
        const data = await res.json();
        setIngredients(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  const addIngredient = async (newIng) => {
    try {
      const res = await fetch(`${API_URL}/craft_coffee_ingredients`, {
        method: "POST",
        headers,
        body: JSON.stringify({ data: [newIng] }),
      });
      if (res.ok) {
        await fetchIngredients();
      }
    } catch (error) {
      console.error("Error adding ingredient:", error);
    }
  };

  const updateIngredient = async (id, updatedIng) => {
    try {
      const res = await fetch(`${API_URL}/craft_coffee_ingredients/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ data: [updatedIng] }),
      });
      if (res.ok) {
        await fetchIngredients();
      }
    } catch (error) {
      console.error("Error updating ingredient:", error);
    }
  };

  const deleteIngredient = async (id) => {
    try {
      const res = await fetch(`${API_URL}/craft_coffee_ingredients/${id}`, {
        method: "DELETE",
        headers,
      });
      if (res.ok) {
        await fetchIngredients();
      }
    } catch (error) {
      console.error("Error deleting ingredient:", error);
    }
  };

  return (
    <IngredientsContext.Provider
      value={{
        ingredients,
        loading,
        addIngredient,
        updateIngredient,
        deleteIngredient,
        refreshIngredients: fetchIngredients,
      }}
    >
      {children}
    </IngredientsContext.Provider>
  );
};

export const useIngredients = () => useContext(IngredientsContext);