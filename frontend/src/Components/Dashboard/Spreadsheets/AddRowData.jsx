import { useState } from "react";

// Styles
import styles from "./apps.module.css";

// Components
import { Card } from "../../../lib/Card/Card";
import Button from "../../../lib/Forms/Buttons/Buttons";
import { Input } from "../../../lib/Forms/Inputs/Inputs";
import Alerts from "../../../lib/Alerts/Alerts";

// Auth Context
import { useAuth } from "../../../Contexts/AuthContext";

// API removida para solo diseño
// import { createProductByUser } from "../../../Services/API";

// Icons
import { IoMdClose } from "react-icons/io";

export default function AddRowData({ onClose, columns }) {
  const [data, setData] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Mock data submitted:", data);

    // Mock success para diseño - no envía datos reales
    setTimeout(() => {
      Alerts(
        "success",
        "Product created successfully (mock - design only)"
      ).then(() => {
        window.location.reload();
      });
    }, 500); // Simula un pequeño delay de API
  };
  return (
    <div
      className={`${styles.screenApp} overflow-auto position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center`}
    >
      <Card
        className={`${styles.screenAppCard} shadow-lg p-4 position-relative`}
      >
        <Button className="position-absolute top-0 end-0 m-2" onClick={onClose}>
          <IoMdClose />
        </Button>
        <div className="p-5">
          <h5>Add product</h5>
          <form onSubmit={handleSubmit}>
            {columns.map((col, index) => {
              return (
                <Input
                  key={index}
                  LabelName={`${col.name}`}
                  name={col.columnValue}
                  onChange={handleChange}
                />
              );
            })}
            <Button className="p-2 float-end" type="submit">
              Add Product
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
