import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Craft Coffee Admin</div>
      <div className={styles.links}>
        <NavLink
          to="/ingredients"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.activeLink}` : styles.link
          }
        >
          Ingredients
        </NavLink>
        <NavLink
          to="/coffees"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.activeLink}` : styles.link
          }
        >
          Coffees
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;