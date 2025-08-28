import React from "react";
import DataTable from "react-data-table-component";

const customStyles = {
  table: {
    style: {
      backgroundColor: "transparent",
    },
  },
  tableWrapper: {
    style: {
      backgroundColor: "transparent",
    },
  },
  head: {
    style: {
      backgroundColor: "var(--bg-theme)",
    },
  },
  headRow: {
    style: {
      backgroundColor: "transparent",
      borderBottom: "2px solid var(--border-shadow)",
    },
  },
  headCells: {
    style: {
      color: "#e0f0f4",
      fontSize: "16px",
      fontWeight: "600",
      backgroundColor: "transparent",
      borderRight: "1px solid var(--border-shadow)",
      "&:last-child": {
        borderRight: "none",
      },
    },
  },
  rows: {
    style: {
      backgroundColor: "rgba(71, 122, 117, 0.05)",
      borderBottom: "1px solid var(--border-shadow)",
      color: "#e0f0f4",
      transition: "background 0.2s ease",
      "&:hover": {
        backgroundColor: "var(--hover) !important",
        color: "#ffffff",
        cursor: "pointer",
      },
    },
  },
  cells: {
    style: {
      color: "#e0f0f4",
      borderRight: "1px solid var(--border-shadow)",
      "&:last-child": {
        borderRight: "none",
      },
    },
  },
  pagination: {
    style: {
      backgroundColor: "transparent",
      color: "#e0f0f4",
    },
    pageButtonsStyle: {
      borderRadius: "50%",
      height: "40px",
      width: "40px",
      padding: "8px",
      margin: "0 4px",
      backgroundColor: "transparent",
      color: "#ffffff",
      fill: "#ffffff !important",
      transition: "all 0.2s ease",
      "&:hover": {
        backgroundColor: "var(--hover)",
        color: "#ffffff",
        fill: "#ffffff",
        cursor: "pointer",
      },
      "&:focus": {
        outline: "none",
        backgroundColor: "var(--border-shadow)",
        color: "#ffffff",
        fill: "#ffffff",
      },
      "&:disabled": {
        color: "#444",
        fill: "#444",
        borderColor: "var(--border-shadow)",
        cursor: "not-allowed",
        backgroundColor: "transparent",
      },
    },
  },
};

export default function DataTables({ columns, data }) {
  return (
    <DataTable
      columns={columns}
      data={data}
      customStyles={customStyles}
      pagination
      paginationPerPage={10}
      paginationRowsPerPageOptions={[5, 10, 15, 20]}
      highlightOnHover
      pointerOnHover
      responsive
    />
  );
}
