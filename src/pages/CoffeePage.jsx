import React, { useState } from "react";
import CoffeeTable from "../components/CoffeeTable/CoffeeTable";
import CoffeeFormModal from "../components/CoffeeFormModal/CoffeeFormModal";
import styles from "./CoffeePage.module.css";

const CoffeePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoffee, setEditingCoffee] = useState(null);

  const handleOpenAdd = () => {
    setEditingCoffee(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (coffee) => {
    setEditingCoffee(coffee);
    setIsModalOpen(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Coffee Management</h1>
        <button className={styles.addBtn} onClick={handleOpenAdd}>
          + Add Coffee
        </button>
      </div>
      <CoffeeTable onEdit={handleOpenEdit} />
      <CoffeeFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={editingCoffee}
      />
    </div>
  );
};

export default CoffeePage;