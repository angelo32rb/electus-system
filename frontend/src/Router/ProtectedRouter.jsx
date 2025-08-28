import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PulseLogo from "../lib/Animations/PulseLogo";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isAuthenticated === false) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading || isAuthenticated === null) {
    return <PulseLogo />;
  }

  return children;
}
