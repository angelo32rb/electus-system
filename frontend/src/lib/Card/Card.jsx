import styles from "./card.module.css";

export function Card({ children, className }) {
  return (
    <div className={`p-relative rounded ${styles.electusCard} ${className}`}>
      {children}
    </div>
  );
}
