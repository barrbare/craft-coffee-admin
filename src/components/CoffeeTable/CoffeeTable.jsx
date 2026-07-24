import React from "react";
import styles from "./CoffeeTable.module.css";
import { useCoffee } from "../../context/CoffeeContext";
import { useIngredients } from "../../context/IngredientsContext";

const CoffeeTable = ({ onEdit }) => {
  const { coffees, deleteCoffee } = useCoffee();
  const { ingredients } = useIngredients();

  const getIngredientNames = (ingredientIds = []) => {
    return ingredientIds
      .map((id) => ingredients.find((ing) => ing.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Title</th>
            <th>Ingredients</th>
            <th>Country</th>
            <th>Caffeine</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {coffees.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                No coffee items found.
              </td>
            </tr>
          ) : (
            coffees.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <img src={item.image} alt={item.title} className={styles.thumb} />
                </td>
                <td>
                  <strong>{item.title}</strong>
                </td>
                <td>{getIngredientNames(item.ingredients) || "None"}</td>
                <td>{item.country}</td>
                <td>{item.caffeine}</td>
                <td>
                  <span className={styles.priceBadge}>{item.totalPrice} ₾</span>
                </td>
                <td>
                  <button className={styles.editBtn} onClick={() => onEdit(item)}>
                    Edit
                  </button>
                  <button className={styles.deleteBtn} onClick={() => deleteCoffee(item.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CoffeeTable;