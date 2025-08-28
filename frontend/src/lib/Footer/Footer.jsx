import React from "react";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={`mt-auto p-2 text-center ${styles.electusFooter}`}>
      <strong className={`${styles.electusBrand}`}>&copy; ElectusIA</strong>
    </footer>
  );
}
