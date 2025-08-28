import { useState, useEffect } from "react";

import { Card } from "../../../lib/Card/Card";
import CreateSpreadsheet from "./CreateSpreadsheet";
import CreateColumns from "./CreateColumns";
import AddRowData from "./AddRowData";
import DataTables from "../DataTables/DataTables";

import Button from "../../../lib/Forms/Buttons/Buttons";

// Icons
import { MdOutlineSchema } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";

// Auth Context
import { useAuth } from "../../../Contexts/AuthContext";

// API Functions
import {
  getUserSpreadsheet,
  getUserSpreadsheetColumns,
  getUserSpreadsheetData,
} from "../../../Services/API";

export default function Products() {
  let { accountInformation } = useAuth();

  // This status is just to control if there's any spreadsheet created yet or not.
  const [status, setStatus] = useState(false);
  const [columns, setColumns] = useState([]);
  const [products, setProducts] = useState([]);
  const [showSchema, setShowSchema] = useState(false);
  const [showAddRowData, setAddRowData] = useState(false);

  useEffect(() => {
    // Datos mock para diseño - reemplaza las llamadas a API
    let spreadsheetSchema = [];
    let userSpreadsheet;
    const fetchUserSpreadsheet = async () => {
      try {
        userSpreadsheet = await getUserSpreadsheet("normal");
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserSpreadsheet();
    if (!userSpreadsheet) {
      setStatus(false);
    }

    // // Mock schema data
    // const mockSchema = {
    //   column1: "Product Name",
    //   column2: "Price",
    //   column3: "Category",
    //   column4: "Stock",
    // };

    // Siempre mostrar como que hay schema

    // Object.entries(mockSchema).forEach(([key, value]) => {
    //   spreadsheetSchema.push({
    //     name: value,
    //     selector: (row) => row[value],
    //     columnValue: key,
    //   });
    // });
    // setColumns(spreadsheetSchema);

    // Mock products data
    const mockProducts = [
      {
        "Product Name": "Sample Product 1",
        Price: "$29.99",
        Category: "Electronics",
        Stock: "15",
      },
      {
        "Product Name": "Sample Product 2",
        Price: "$45.50",
        Category: "Accessories",
        Stock: "8",
      },
      {
        "Product Name": "Sample Product 3",
        Price: "$12.99",
        Category: "Books",
        Stock: "25",
      },
    ];
    setProducts(mockProducts);
  }, [accountInformation.id]);

  return (
    <div className="container-fluid position-relative">
      {showSchema && (
        <div className="position-absolute top-0 start-0 w-100 h-100 z-3">
          <CreateSpreadsheet onClose={() => setShowSchema(false)} />
        </div>
      )}
      {showAddRowData && (
        <div className="position-absolute top-0 start-0 w-100 h-100 z-3">
          <AddRowData onClose={() => setAddRowData(false)} columns={columns} />
        </div>
      )}
      <div
        className={`row d-flex justify-content-center align-items-center ${
          showSchema ? "opacity-25 pointer-events-none" : ""
        }`}
      >
        {!status ? (
          <Card className="shadow col-8 p-5 mt-5">
            <h5 className="fs-2 text-center">
              You don't have any spreadsheet created yet.
            </h5>
            <center>
              <Button className="mt-5 p-3" onClick={() => setShowSchema(true)}>
                <MdOutlineSchema /> Create Spreadsheet
              </Button>
            </center>
          </Card>
        ) : (
          <Card className={`shadow col-8 p-5 mt-5`}>
            <h5 className="display-5 text-center pb-4">Products</h5>
            <DataTables columns={columns} data={products} />
            <Button
              buttonStyle="filled"
              className="fs-4 mt-4 float-end"
              onClick={() => setAddRowData(true)}
            >
              <IoAddCircleOutline />
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
