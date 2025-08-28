import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeEditor({ children }) {
  const electusThemes = ["dark-aqua", "galaxy", "nebula", "cyberpunk"];
  const [theme, setTheme] = useState(() => {
    const savedTheme = window.localStorage.getItem("theme");
    return electusThemes.includes(savedTheme) ? savedTheme : "dark-aqua";
  });
  useEffect(() => {
    document.body.setAttribute("theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  function selectTheme(newTheme) {
    if (electusThemes.includes(newTheme)) {
      setTheme(newTheme);
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, selectTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
