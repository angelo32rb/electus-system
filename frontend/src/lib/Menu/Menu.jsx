import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import { useTheme } from "../../Contexts/ThemeEditor";
import { useSidebar } from "../../Contexts/SidebarContext";

// Styles
import styles from "./navs.module.css";

// Components
import Button from "../Forms/Buttons/Buttons";

// Icons
import { PiSignOut } from "react-icons/pi";
import { IoIosColorPalette } from "react-icons/io";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

function Menu({ children }) {
  const { logout } = useAuth();
  const { selectTheme } = useTheme();
  const { mdActive, setMdActive, setSmActive } = useSidebar();
  const navigate = useNavigate();

  const signOut = () => {
    logout();
    navigate("/login", { replace: true });
  };
  return (
    <nav className={`clearfix ${styles.electusNavBar}`}>
      <ul className="nav float-start me-auto py-2">
        <li className="nav-item">
          {mdActive ? (
            <Button
              className="ms-4 d-none d-sm-block"
              onClick={() => setMdActive(!mdActive)}
            >
              <FaAngleLeft />
            </Button>
          ) : (
            <Button
              className="ms-4 d-none d-sm-block"
              onClick={() => setMdActive(!mdActive)}
            >
              <FaAngleRight />
            </Button>
          )}
        </li>
        <li className="nav-item">
          <Button className="ms-4 d-block d-sm-none">
            <FaAngleRight onClick={() => setSmActive(true)} />
          </Button>
        </li>
        {children}
      </ul>
      <ul className="nav float-end py-2">
        <li className="nav-item dropdown">
          <Button
            className="mx-1 dropdown-toggle"
            buttonStyle="filledWarning"
            type="button"
            id="theme-selector"
            data-bs-toggle="dropdown"
          >
            <IoIosColorPalette />
          </Button>
          <ul
            className={`dropdown-menu ${styles.electusDropDownMenu}`}
            aria-labelledby="theme-selector"
            data-popper-placement="bottom-end"
          >
            <li>
              <Link
                className="dropdown-item text-light"
                onClick={() => selectTheme("dark-aqua")}
              >
                <span
                  className={`${styles.colorDot} ${styles.darkAqua} me-2`}
                />
                Dark Aqua
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item text-light"
                onClick={() => selectTheme("nebula")}
              >
                <span className={`${styles.colorDot} ${styles.nebula} me-2`} />
                Nebula
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item text-light"
                onClick={() => selectTheme("galaxy")}
              >
                <span className={`${styles.colorDot} ${styles.galaxy} me-2`} />
                Galaxy
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item text-light"
                onClick={() => selectTheme("cyberpunk")}
              >
                <span
                  className={`${styles.colorDot} ${styles.cyberpunk} me-2`}
                />
                CyberPunk
              </Link>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <Button
            buttonStyle="filledDanger"
            className="nav-link mx-1"
            onClick={() => signOut()}
          >
            <PiSignOut />
          </Button>
        </li>
      </ul>
    </nav>
  );
}

function MenuItem({ children }) {
  return <li className="nav-item me-2">{children}</li>;
}

Menu.Menu = Menu;
Menu.MenuItem = MenuItem;

export default Menu;
