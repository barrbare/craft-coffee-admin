import React, { createContext, useContext, useState, useEffect } from "react";

const CoffeeContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1/resource";
const BYPASS_TOKEN = import.meta.env.VITE_BYPASS_TOKEN || "YXBpS2V5U2VjcmV0";

const headers = {
  "Content-Type": "application/json",
  "x-bypass-token": BYPASS_TOKEN,
};

export const CoffeeProvider = ({ children }) => {
  const [coffees, setCoffees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCoffees = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/craft_coffee_items`, { headers });
      if (res.ok) {
        const data = await res.json();
        setCoffees(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching coffees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoffees();
  }, []);

  const addCoffee = async (newCoffee) => {
    try {
      const res = await fetch(`${API_URL}/craft_coffee_items`, {
        method: "POST",
        headers,
        body: JSON.stringify({ data: [newCoffee] }),
      });
      if (res.ok) {
        await fetchCoffees();
      }
    } catch (error) {
      console.error("Error adding coffee:", error);
    }
  };

  const updateCoffee = async (id, updatedCoffee) => {
    try {
      const res = await fetch(`${API_URL}/craft_coffee_items/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ data: [updatedCoffee] }),
      });
      if (res.ok) {
        await fetchCoffees();
      }
    } catch (error) {
      console.error("Error updating coffee:", error);
    }
  };

  const deleteCoffee = async (id) => {
    try {
      const res = await fetch(`${API_URL}/craft_coffee_items/${id}`, {
        method: "DELETE",
        headers,
      });
      if (res.ok) {
        await fetchCoffees();
      }
    } catch (error) {
      console.error("Error deleting coffee:", error);
    }
  };

  return (
    <CoffeeContext.Provider
      value={{
        coffees,
        loading,
        addCoffee,
        updateCoffee,
        deleteCoffee,
        refreshCoffees: fetchCoffees,
      }}
    >
      {children}
    </CoffeeContext.Provider>
  );
};

export const useCoffee = () => useContext(CoffeeContext);