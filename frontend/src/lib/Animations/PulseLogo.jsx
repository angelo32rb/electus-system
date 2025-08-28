import React from "react";

// Images
import Logo from "../../assets/img/electus-ia-logo.png";

// Style
import styles from "./pulselogo.module.css";

export default function PulseLogo() {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <img src={Logo} alt="Logo" className={`img-fluid ${styles.logo}`} />
    </div>
  );
}
