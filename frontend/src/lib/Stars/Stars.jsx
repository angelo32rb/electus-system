import React, { useEffect, useRef } from "react";
import styles from "./stars.module.css";

export default function Stars() {
  const starContainerRef = useRef(null);

  useEffect(() => {
    const filters = [
      styles.filter_red,
      styles.filter_purple,
      styles.filter_yellow,
      styles.filter_cyan,
      styles.filter_blue,
      styles.filter_orange,
    ];
    const starContainer = starContainerRef.current;
    function createStar() {
      const star = document.createElement("span");
      star.textContent = "★";

      const randomFilter = filters[Math.floor(Math.random() * filters.length)];

      star.className = `${styles.star} ${randomFilter}`;
      const size = Math.random() * 8 + 8 + "px";
      const posX = Math.random() * window.innerWidth;
      const posY = Math.random() * window.innerHeight;

      star.style.left = `${posX}px`;
      star.style.top = `${posY}px`;
      star.style.fontSize = size;

      starContainer.appendChild(star);
      setTimeout(() => {
        star.remove();
      }, 3000);
    }

    const intervals = [setInterval(createStar, 200)];

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <div
      ref={starContainerRef}
      className={`position-absolute top-0 start-0 w-100 h-100 ${styles.stars} z-0`}
    />
  );
}
