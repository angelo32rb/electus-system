import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components
import Stars from "../../lib/Stars/Stars";
import Auth from "../../Components/Auth/Auth";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      navigate("/", { replace: true });
    }
  });

  return (
    <>
      <title>ElectusIA - Auth</title>
      <div className="container-fluid overflow-hidden position-relative w-100 vh-100">
        <Stars />
        <div className="d-flex justify-content-center align-items-center vh-100 z-2">
          <Auth />
        </div>
      </div>
    </>
  );
}
