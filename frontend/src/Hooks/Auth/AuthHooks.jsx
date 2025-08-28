import { useState, useEffect } from "react";
import { validateToken } from "../../Services/API";

export function useTokenValidation() {
  const [result, setResult] = useState({
    status: null,
    accountInformation: null,
    loading: true,
  });

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    const checkToken = async () => {
      if (!token) {
        setResult({ status: false, accountInformation: null, loading: false });
        return;
      }

      try {
        const response = await validateToken(token);
        setResult({
          status: response.status,
          accountInformation: response.accountInformation || null,
          loading: false,
        });
      } catch (error) {
        console.error("Error validating token:", error);
        setResult({ status: false, accountInformation: null, loading: false });
      }
    };

    checkToken();
  }, []);

  return result;
}
