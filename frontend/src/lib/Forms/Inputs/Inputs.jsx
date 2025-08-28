import { useRef, useState, useEffect } from "react";

import Alerts from "../../../lib/Alerts/Alerts";

import styles from "./inputs.module.css";
import { FaEye, FaEyeSlash, FaClipboard } from "react-icons/fa";

export function Input({
  className = "",
  LabelName = "Label Name",
  toggleUncensor = false,
  copyText = false,
  type: initialType,
  ...props
}) {
  const inputRef = useRef(null);
  const [inputType, setInputType] = useState(() => initialType || "text");

  const toggleView = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  const copyTextFromInput = () => {
    navigator.clipboard.writeText(inputRef.current.value);
    Alerts("success", "The selected text has been copied in your clipboard!");
  };

  // Solo actualizar inputType si initialType cambia realmente desde el exterior
  useEffect(() => {
    if (initialType && initialType !== inputType) {
      setInputType(initialType);
    }
  }, [initialType]);

  return (
    <div className="form-group">
      <label
        className="d-block form-label text-sm font-medium text-gray-700 mb-2"
        htmlFor={props.id}
      >
        {LabelName}
      </label>
      <div className="mb-3 position-relative">
        <input
          ref={inputRef}
          type={inputType}
          className={`text-light form-control px-3 py-2 rounded pe-5 ${styles.electusInput} ${className}`}
          id={props.id}
          {...props}
        />
        {toggleUncensor &&
          (inputType === "password" ? (
            <FaEye
              className={`position-absolute top-50 translate-middle-y end-0 me-3 ${styles.electusIcons}`}
              id="togglePassword"
              onClick={toggleView}
            />
          ) : (
            <FaEyeSlash
              className={`position-absolute top-50 translate-middle-y end-0 me-3 ${styles.electusIcons}`}
              id="togglePassword"
              onClick={toggleView}
            />
          ))}
        {copyText && (
          <FaClipboard
            className={`position-absolute top-50 translate-middle-y end-0 me-5 ${styles.electusIcons}`}
            id="copyText"
            onClick={copyTextFromInput}
          />
        )}
      </div>
    </div>
  );
}

export function TextArea({
  className = "",
  LabelName = "Label Name",
  ...props
}) {
  return (
    <>
      <label
        className="block form-label text-sm font-medium text-gray-700 mb-2"
        htmlFor={props.id}
      >
        {LabelName}
      </label>
      <div className="form-group">
        <textarea
          id={props.id}
          className={`form-control text-light ${styles.electusTextArea} ${className}`}
          {...props}
        ></textarea>
      </div>
    </>
  );
}
