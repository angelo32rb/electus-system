import React from "react";
import styles from "./buttons.module.css";

export default function Button({
  children,
  className = "",
  buttonStyle = "",
  ...props
}) {
  let btnStyle = "";

  switch (buttonStyle) {
    case "default":
      btnStyle = styles.btnDefault;
      break;
    case "info":
      btnStyle = styles.btnInfo;
      break;
    case "warning":
      btnStyle = styles.btnWarning;
      break;
    case "danger":
      btnStyle = styles.btnDanger;
      break;
    case "filled":
      btnStyle = styles.btnFilledDefault;
      break;
    case "filledInfo":
      btnStyle = styles.btnFilledInfo;
      break;
    case "filledWarning":
      btnStyle = styles.btnFilledWarning;
      break;
    case "filledDanger":
      btnStyle = styles.btnFilledDanger;
      break;
    default:
      btnStyle = styles.btnDefault;
  }

  return (
    <button className={`btn text-light ${btnStyle} ${className}`} {...props}>
      {children}
    </button>
  );
}
