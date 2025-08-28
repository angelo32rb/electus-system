import { useState, useEffect } from "react";
import { checkApiStatus } from "../../Services/API";
import PulseLogo from "../../lib/Animations/PulseLogo";
import Router from "../../Router/Router";

export default function AppLoader() {
  const [apiStatus, setApiStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const status = await checkApiStatus();
        setApiStatus(status);
      } catch (error) {
        console.error("Error checking API status:", error);
        setApiStatus(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkStatus();
  }, []);

  if (isLoading || !apiStatus) {
    return <PulseLogo />;
  }

  return <Router />;
}
