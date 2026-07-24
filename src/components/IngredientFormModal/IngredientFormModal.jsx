import React, { useState, useEffect } from "react";
import styles from "./IngredientFormModal.module.css";
import { useIngredients } from "../../context/IngredientsContext";

const IngredientFormModal = ({ isOpen, onClose, initialData }) => {
  const { addIngredient, updateIngredient } = useIngredients();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    strength: "",
    flavor: ""
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: "",
        price: "",
        description: "",
        strength: "",
        flavor: ""
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initialData) {
      updateIngredient(initialData.id, formData);
    } else {
      addIngredient(formData);
    }
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{initialData ? "Edit Ingredient" : "Add Ingredient"}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Price (GEL)</label>
            <input
              type="number"
              step="0.1"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Strength</label>
            <input
              name="strength"
              value={formData.strength}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Flavor</label>
            <input
              name="flavor"
              value={formData.flavor}
              onChange={handleChange}
            />
          </div>
          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IngredientFormModal;