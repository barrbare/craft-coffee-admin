import React from "react";
import styles from "./IngredientsTable.module.css";
import { useIngredients } from "../../context/IngredientsContext";

const IngredientsTable = ({ onEdit }) => {
  const { ingredients, deleteIngredient } = useIngredients();

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Strength</th>
            <th>Flavor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No ingredients found.
              </td>
            </tr>
          ) : (
            ingredients.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <strong>{item.name}</strong>
                </td>
                <td>{item.price} ₾</td>
                <td>{item.description}</td>
                <td>{item.strength}</td>
                <td>{item.flavor}</td>
                <td>
                  <button className={styles.editBtn} onClick={() => onEdit(item)}>
                    Edit
                  </button>
                  <button className={styles.deleteBtn} onClick={() => deleteIngredient(item.id)}>
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

export default IngredientsTable;