import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Components
import { Card } from "../../../lib/Card/Card";
import { IoSettingsSharp } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineChatBubble } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import Button from "../../../lib/Forms/Buttons/Buttons";
import { Input } from "../../../lib/Forms/Inputs/Inputs";
// API removida para solo diseño
// import { getInstances } from "../../../Services/API";

export default function Instances() {
  const [instances, setInstances] = useState([]);

  useEffect(() => {
    // Mock data para diseño - reemplaza la llamada a API
    const mockInstances = [
      {
        id: 1,
        name: "Demo Instance 1",
        token: "demo_token_instance_123",
        owner: "Demo User",
        users: 5,
        messages: 120,
        status: "Connected"
      },
      {
        id: 2,
        name: "Demo Instance 2",
        token: "demo_token_instance_456",
        owner: "Another User",
        users: 12,
        messages: 89,
        status: "Connected"
      }
    ];
    setInstances(mockInstances);
  }, [setInstances]);

  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center align-items-center mt-4">
        <Card
          key={1}
          className="shadow p-5 m-3 card-hover col-12 col-md-4 col-lg-3"
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <Link>
              <h4 className="mb-0 text-light text-decoration-none">
                {"nombre instancia"}
              </h4>
            </Link>
            <Link>
              <Button>
                <IoSettingsSharp />
              </Button>
            </Link>
          </div>
          <Input
            LabelName="Token"
            id={1}
            className="mb-4 border-0"
            value={"secret-token"}
            readOnly
            type="password"
            toggleUncensor
            copyText
          />
          <div className="d-flex justify-content-between align-items-center mb-5">
            <div className="d-flex align-items-center">
              <FaRegUserCircle className="fs-2 me-2" />
              <div>
                <p className="mb-0">{"Angelo"}</p>
                <small>{32}</small>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="me-2">
                <p className="mb-0 text-center fs-5">
                  <FaRegUserCircle />
                </p>
                <small>{32}</small>
              </div>
              <div>
                <p className="mb-0 text-center fs-5">
                  <MdOutlineChatBubble />
                </p>
                <small>{32}</small>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <span className="badge bg-info rounded rounded-4">Connected</span>
            <Button buttonStyle="filledDanger">
              <FaTrash />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
