import { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../Services/API";

// Components
import { Card } from "../../lib/Card/Card";
import SpinningLogo from "../../lib/Animations/SpinningLogo";
import { Input } from "../../lib/Forms/Inputs/Inputs";
import Button from "../../lib/Forms/Buttons/Buttons";
import Alerts from "../../lib/Alerts/Alerts";

export default function Auth() {
  const navigate = useNavigate();
  const { setLogin } = useAuth();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.trim() === "" || password.trim() === "") {
      Alerts("error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(user, password);

      if (result.status) {
        setLogin(result.accountInformation);
        Alerts("success", "Login successful!").then(() => {
          navigate("/", { replace: true });
        });
      } else {
        Alerts("error", result.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      Alerts("error", "Error connecting to server. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg p-5">
      <div className="text-center">
        <SpinningLogo />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="m-2">
            <Input
              LabelName="User"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              type={"text"}
              id="user"
              required
            />
          </div>
          <div className="m-2 pb-4">
            <Input
              LabelName="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={"password"}
              id="password"
              required
              toggleUncensor
            />
          </div>

          <Button
            type="submit"
            className="w-50"
            buttonStyle=""
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>

          <div className="text-center mt-4">
            <Link
              to="/forgot-password"
              className="text-decoration-none text-light opacity-75 hover-opacity-100"
            >
              Forgot your password?
            </Link>
          </div>
        </div>
      </form>
    </Card>
  );
}
