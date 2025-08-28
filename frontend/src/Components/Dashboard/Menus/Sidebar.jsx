import { useLocation } from "react-router-dom";
import Sidebar from "../../../lib/Menu/Sidebar";
import { Link } from "react-router-dom";

// Icons
import { IoSettings } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { RiInstanceFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import { FaTableList } from "react-icons/fa6";
import { BsFileEarmarkSpreadsheet } from "react-icons/bs";
import { useAuth } from "../../../Contexts/AuthContext";

export default function SidebarComponent() {
  const location = useLocation();

  const isInRoute = (path) => {
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  const { accountInformation } = useAuth();
  console.log(accountInformation);

  if (
    accountInformation.rank === "client" &&
    accountInformation.platform === "ElectusInventory"
  ) {
    return (
      <Sidebar>
        <Sidebar.NavItemContainer>
          <Sidebar.NavItemContainer.NavItem isActive={isInRoute("/")}>
            <Link to="/" className="text-white text-decoration-none">
              <IoHome className="me-2" /> Home
            </Link>
          </Sidebar.NavItemContainer.NavItem>
        </Sidebar.NavItemContainer>

        <Sidebar.NavItemContainer>
          <Sidebar.NavItemContainer.NavItem
            isActive={isInRoute("/my-inventory")}
          >
            <Link
              to="/my-inventory"
              className="text-white text-decoration-none"
            >
              <BsFileEarmarkSpreadsheet className="me-2" /> Inventory
            </Link>
          </Sidebar.NavItemContainer.NavItem>
        </Sidebar.NavItemContainer>

        <Sidebar.NavItemContainer>
          <Sidebar.NavItemContainer.NavItem isActive={isInRoute("/orders")}>
            <Link to="/orders" className="text-white text-decoration-none">
              <FiPackage className="me-2" /> Orders
            </Link>
          </Sidebar.NavItemContainer.NavItem>
        </Sidebar.NavItemContainer>
      </Sidebar>
    );
  } else if (accountInformation.rank === "admin") {
    return (
      <Sidebar>
        <Sidebar.NavItemContainer>
          <Sidebar.NavItemContainer.NavItem isActive={isInRoute("/")}>
            <Link to="/" className="text-white text-decoration-none">
              <IoHome className="me-2" /> Home
            </Link>
          </Sidebar.NavItemContainer.NavItem>
        </Sidebar.NavItemContainer>

        <Sidebar.NavItemContainer>
          <Sidebar.NavItemContainer.NavItem isActive={isInRoute("/instances")}>
            <Link to="/instances" className="text-white text-decoration-none">
              <RiInstanceFill className="me-2" /> Instances
            </Link>
          </Sidebar.NavItemContainer.NavItem>
        </Sidebar.NavItemContainer>

        <Sidebar.NavItemContainer>
          <Sidebar.NavItemContainer.NavItem isActive={isInRoute("/airtable")}>
            <Link to="/airtable" className="text-white text-decoration-none">
              <FaTableList className="me-2" /> AirTable
            </Link>
          </Sidebar.NavItemContainer.NavItem>
        </Sidebar.NavItemContainer>

        <Sidebar.DropdownContainer
          navLink={
            <>
              <IoSettings className="me-2" /> Settings
            </>
          }
          id="sidebar-settings-dropdown"
          isActive={isInRoute("/settings")}
        >
          <Sidebar.DropdownContainer.DropdownItem>
            <Link
              to="/settings/test1"
              className="text-white text-decoration-none"
            >
              Test 1
            </Link>
          </Sidebar.DropdownContainer.DropdownItem>
          <Sidebar.DropdownContainer.DropdownItem>
            <Link
              to="/settings/test2"
              className="text-white text-decoration-none"
            >
              Test 2
            </Link>
          </Sidebar.DropdownContainer.DropdownItem>
        </Sidebar.DropdownContainer>
      </Sidebar>
    );
  }
}
