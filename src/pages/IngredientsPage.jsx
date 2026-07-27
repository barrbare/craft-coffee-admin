import React, { useState } from "react";
import IngredientsTable from "../components/IngredientsTable/IngredientsTable";
import IngredientFormModal from "../components/IngredientFormModal/IngredientFormModal";
import styles from "./IngredientsPage.module.css";

const IngredientsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState(null);

  const handleOpenAdd = () => {
    setEditingIngredient(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (ingredient) => {
    setEditingIngredient(ingredient);
    setIsModalOpen(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Ingredients Management</h1>
        <button className={styles.addBtn} onClick={handleOpenAdd}>
          + Add Ingredient
        </button>
      </div>
      <IngredientsTable onEdit={handleOpenEdit} />
      <IngredientFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={editingIngredient}
      />
    </div>
  );
};

export default IngredientsPage;