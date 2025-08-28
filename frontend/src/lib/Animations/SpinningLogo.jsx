import React from "react";

// Images
import MainLogo from "../../assets/img/star_logo_electus.png";
import textLogo from "../../assets/img/texto_logo.png";

// Style
import styles from "./spinninglogo.module.css";

export default function SpinningLogo() {
  return (
    <>
      <img
        className={`img-fluid ${styles.logo} ${styles.mWidth50}`}
        alt="Logo"
        src={MainLogo}
      />
      <br />
      <img
        className={`img-fluid ${styles.mWidth60}`}
        alt="Logo"
        src={textLogo}
      />
    </>
  );
}
