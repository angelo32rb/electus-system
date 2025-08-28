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

export default function CreateSpreadsheet({ onClose }) {
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
          <h5>Create your spreadsheet</h5>
          <form action="mb-4 mt-3">
            <Input LabelName="Spreadsheet name" placeholder="My produts" />
          </form>
          <div className="text-center">
            <Button className="p-3">
              <IoMdAdd /> Create spreadsheet
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
