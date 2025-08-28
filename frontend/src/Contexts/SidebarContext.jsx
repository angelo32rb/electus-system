import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export function SidebarCollapse({ children }) {
  const [mdActive, setMdActive] = useState(true);
  const [smActive, setSmActive] = useState(false);

  return (
    <SidebarContext.Provider
      value={{ mdActive, smActive, setMdActive, setSmActive, children }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}
