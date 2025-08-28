import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components
import Stars from "../../lib/Stars/Stars";
import ForgotPassword from "../../Components/Auth/ForgotPassword";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Si el usuario ya está logueado, redirigir al dashboard
    if (window.localStorage.getItem("token")) {
      navigate("/", { replace: true });
    }
  });

  return (
    <>
      <title>ElectusIA - Forgot Password</title>
      <div className="container-fluid overflow-hidden position-relative w-100 vh-100">
        <Stars />
        <div className="d-flex justify-content-center align-items-center vh-100 z-2">
          <ForgotPassword />
        </div>
      </div>
    </>
  );
}
