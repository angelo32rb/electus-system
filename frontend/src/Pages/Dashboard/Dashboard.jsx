import Menu from "../../Components/Dashboard/Menus/Menu.jsx";
import Footer from "../../lib/Footer/Footer";
import Sidebar from "../../Components/Dashboard/Menus/Sidebar.jsx";
import { SidebarCollapse } from "../../Contexts/SidebarContext.jsx";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <title>ElectusIA - Dashboard</title>
      <SidebarCollapse>
        <div className="d-flex vh-100 overflow-hidden">
          <Sidebar />

          <div className="d-flex flex-column flex-grow-1 overflow-auto">
            <Menu />
            <div className="flex-grow-1 overflow-x-hidden overflow-y-auto">
              <Outlet />
            </div>
            <Footer />
          </div>
        </div>
      </SidebarCollapse>
    </>
  );
}
