import React, { useState, useEffect } from "react";
import styles from "./CoffeeFormModal.module.css";
import { useCoffee } from "../../context/CoffeeContext";
import { useIngredients } from "../../context/IngredientsContext";

const CoffeeFormModal = ({ isOpen, onClose, initialData }) => {
  const { addCoffee, updateCoffee } = useCoffee();
  const { ingredients } = useIngredients();

  const [formData, setFormData] = useState({
    title: "",
    ingredients: [],
    description: "",
    image: "",
    country: "",
    caffeine: ""
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        title: "",
        ingredients: [],
        description: "",
        image: "",
        country: "",
        caffeine: ""
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleIngredientChange = (id) => {
    setFormData((prev) => {
      const exists = prev.ingredients.includes(id);
      const updated = exists
        ? prev.ingredients.filter((item) => item !== id)
        : [...prev.ingredients, id];
      return { ...prev, ingredients: updated };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initialData) {
      updateCoffee(initialData.id, formData, ingredients);
    } else {
      addCoffee(formData, ingredients);
    }
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{initialData ? "Edit Coffee" : "Add Coffee"}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Select Ingredients</label>
            <div className={styles.checkboxGroup}>
              {ingredients.map((ing) => (
                <label key={ing.id} className={styles.checkboxItem}>
                  <input
                    type="checkbox"
                    checked={formData.ingredients.includes(ing.id)}
                    onChange={() => handleIngredientChange(ing.id)}
                  />
                  {ing.name} ({ing.price} ₾)
                </label>
              ))}
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>Image URL</label>
            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Country</label>
            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Caffeine</label>
            <input
              name="caffeine"
              value={formData.caffeine}
              onChange={handleChange}
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

export default CoffeeFormModal;