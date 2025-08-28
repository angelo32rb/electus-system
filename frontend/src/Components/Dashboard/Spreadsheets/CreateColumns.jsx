import { useState, useEffect } from "react";

// Style
import styles from "./apps.module.css";

// Components
import { Card } from "../../../lib/Card/Card";
import Button from "../../../lib/Forms/Buttons/Buttons";
import { Input } from "../../../lib/Forms/Inputs/Inputs";
import Alerts from "../../../lib/Alerts/Alerts";

// Icons
import { IoMdAdd } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";

// Auth Context
import { useAuth } from "../../../Contexts/AuthContext";

// API Functions

export default function CreateColumns({ onClose }) {
  let { accountInformation } = useAuth();

  const [columns, setColumns] = useState([{ id: Date.now(), value: "" }]);

  const addColumn = () => {
    setColumns([...columns, { id: Date.now(), value: "" }]);
  };

  const removeColumn = (id) => {
    setColumns(columns.filter((col) => col.id !== id));
  };

  const handleInputChange = (id, newValue) => {
    setColumns((prev) =>
      prev.map((col) => (col.id === id ? { ...col, value: newValue } : col))
    );
  };

  const handleSubmit = () => {
    const productSchema = {};
    columns.forEach((col, index) => {
      productSchema[`column${index + 1}`] = col.value.trim();
    });

    console.log("Mock schema created:", productSchema);

    // Mock success para diseño - no envía datos reales
    setTimeout(() => {
      Alerts(
        "success",
        "Schema created successfully (mock - design only)"
      ).then(() => {
        window.location.reload();
      });
    }, 500); // Simula un pequeño delay de API
  };

  return (
    <div
      className={`${styles.screenApp} overflow-auto position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center`}
    >
      <Card className="shadow-lg p-4 position-relative">
        <Button
          buttonStyle="filled"
          className="position-absolute top-0 end-0 m-2"
          onClick={onClose}
        >
          <IoMdClose />
        </Button>
        <div className="p-5">
          <h5>Create Schema</h5>
          <form className="mb-4" onSubmit={(e) => e.preventDefault()}>
            {columns.map((col, index) => (
              <div key={col.id} className="mb-4 clearfix">
                <Input
                  LabelName={`Column ${index + 1}`}
                  value={col.value}
                  onChange={(e) => handleInputChange(col.id, e.target.value)}
                  className="float-start"
                />
                <Button
                  onClick={() => removeColumn(col.id)}
                  buttonStyle="filledDanger"
                  type="button"
                  className="float-end"
                >
                  <MdDelete />
                </Button>
              </div>
            ))}
          </form>
          <Button onClick={addColumn} className="w-100 mb-4">
            <IoMdAdd />
          </Button>
          <div className="text-center">
            <Button onClick={handleSubmit} className="p-3">
              Create Schema
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
