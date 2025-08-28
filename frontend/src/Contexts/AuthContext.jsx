import { createContext, useContext, useState, useEffect } from "react";
import { useTokenValidation } from "../Hooks/Auth/AuthHooks";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const {
    status,
    accountInformation: validatedAccount,
    loading,
  } = useTokenValidation();
  const [accountInformation, setAccountInformation] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    if (loading) return;

    if (status) {
      setAccountInformation(validatedAccount);
      setIsAuthenticated(true);
    } else {
      window.localStorage.removeItem("token");
      setAccountInformation({});
      setIsAuthenticated(false);
    }
  }, [status, validatedAccount, loading]);

  function setLogin(accountInformation) {
    window.localStorage.setItem("token", accountInformation.token);
    setAccountInformation(accountInformation);
    setIsAuthenticated(true);
  }

  function logout() {
    window.localStorage.removeItem("token");
    setIsAuthenticated(false);
    setAccountInformation({});
  }

  return (
    <AuthContext.Provider
      value={{
        setLogin,
        logout,
        accountInformation,
        setAccountInformation,
        isAuthenticated,
        setIsAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
