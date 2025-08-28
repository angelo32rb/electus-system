import { useState, useRef, useEffect } from "react";
import { Card } from "../Card/Card";
import Button from "../Forms/Buttons/Buttons";
import styles from "./navs.module.css";
import { useSidebar } from "../../Contexts/SidebarContext";

import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

// Logo
import Logo from "../../assets/img/star_logo_electus.png";
import textLogo from "../../assets/img/texto_logo.png";

// Icons
import { FaAngleUp } from "react-icons/fa6";

function Sidebar({ children }) {
  const { mdActive, smActive, setSmActive } = useSidebar();
  return (
    <>
      {mdActive && (
        <Card className="d-none d-sm-block shadow h-100 col-2 d-flex flex-column">
          <nav className="nav flex-column flex-grow-1">
            <div className="ms-2 mt-2 d-flex justify-content-center w-100">
              <img
                className={`img-fluid mx-auto w-25 ${styles.electusBrand}`}
                alt="Logo"
                src={Logo}
              />
            </div>
            <ul className="list-unstyled m-3 pt-2">{children}</ul>
          </nav>
        </Card>
      )}
      {smActive && (
        <Card
          className={`d-block d-sm-none position-fixed top-0 start-0 w-100 h-100 z-3 ${styles.electusSidebarMobile} p-0`}
        >
          <nav className="nav w-100 h-100 d-flex flex-column pt-5">
            <img
              className={`img-fluid mx-auto w-25 mb-3 ${styles.electusBrand}`}
              alt="Logo"
              src={Logo}
            />
            <img
              className="img-fluid mx-auto w-50 mb-4"
              alt="Text Logo"
              src={textLogo}
            />
            <ul className="list-unstyled w-100 mt-3">
              {children}
              <li
                className={`mb-3 px-3 py-2 rounded fixed-bottom ${styles.electusSidebarItem}`}
              >
                <Button
                  className="w-100"
                  onClick={() => setSmActive(!smActive)}
                >
                  <FaAngleUp />
                </Button>
              </li>
            </ul>
          </nav>
        </Card>
      )}
    </>
  );
}

function NavItemContainer({ children }) {
  return <div className="sidebar-item">{children}</div>;
}

function NavItem({ isActive, children }) {
  return (
    <li
      className={`mb-3 px-3 py-2 rounded ${styles.electusSidebarItem} ${
        isActive ? styles.electusSidebarActive : ""
      }`}
    >
      {children}
    </li>
  );
}

function DropdownContainer({ navLink, id, children }) {
  const [active, setActive] = useState(false);
  const dropdownRef = useRef(null);

  const toggleActive = () => setActive((prev) => !prev);

  useEffect(() => {
    if (dropdownRef.current) {
      if (active) {
        dropdownRef.current.classList.add(styles.electusSidebarActive);
      } else {
        dropdownRef.current.classList.remove(styles.electusSidebarActive);
      }
    }
  }, [active]);

  return (
    <div className="sidebar-item">
      <a
        className="text-light text-decoration-none"
        data-bs-toggle="collapse"
        href={`#${id}`}
        onClick={toggleActive}
        ref={dropdownRef}
      >
        <li
          className={`mb-3 px-3 py-2 rounded ${styles.electusSidebarItem} ${
            active ? styles.electusSidebarActive : ""
          }`}
        >
          <div className="clearfix">
            <div className="float-start">{navLink}</div>
            <div className="float-end">
              {active ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
            </div>
          </div>
        </li>
      </a>
      <ul
        className={`collapse w-100 list-unstyled p-3 rounded ${styles.electusSidebarDropdown}`}
        id={id}
      >
        {children}
      </ul>
    </div>
  );
}

function DropdownItem({ isActive, children }) {
  return (
    <li
      className={`px-2 py-2 rounded ${styles.electusSidebarItem} ${
        isActive ? styles.electusSidebarActive : ""
      }`}
    >
      {children}
    </li>
  );
}

Sidebar.NavItemContainer = NavItemContainer;
Sidebar.NavItemContainer.NavItem = NavItem;
Sidebar.DropdownContainer = DropdownContainer;
Sidebar.DropdownContainer.DropdownItem = DropdownItem;

export default Sidebar;
