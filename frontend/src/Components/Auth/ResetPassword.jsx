import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { changePassword } from "../../Services/API";

// Components
import { Card } from "../../lib/Card/Card";
import SpinningLogo from "../../lib/Animations/SpinningLogo";
import { Input } from "../../lib/Forms/Inputs/Inputs";
import Button from "../../lib/Forms/Buttons/Buttons";
import Alerts from "../../lib/Alerts/Alerts";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    let tokenFromUrl = searchParams.get("token");
    const usernameFromUrl = searchParams.get("username");
    tokenFromUrl = encodeURIComponent(tokenFromUrl);
    if (tokenFromUrl && usernameFromUrl) {
      setToken(tokenFromUrl);
      setUsername(usernameFromUrl);
    } else {
      Alerts(
        "error",
        "Invalid reset link. Please request a new password reset."
      );
      setTimeout(() => {
        navigate("/forgot-password");
      }, 2000);
    }
  }, [searchParams, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      Alerts("error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alerts("error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alerts("error", "Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const result = await changePassword(username, password, token);

      if (result.status) {
        setIsSuccess(true);
        Alerts("success", result.message || "Password changed successfully!");
      } else {
        Alerts("error", result.message || "Failed to change password");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      Alerts("error", "Error connecting to server. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="shadow-lg p-5">
        <div className="text-center">
          <SpinningLogo />
          <div className="mt-4">
            <h4 className="text-light mb-3">Password Changed Successfully!</h4>
            <p className="text-light opacity-75 mb-4">
              Your password has been updated successfully. You can now login
              with your new password.
            </p>
            <Button
              onClick={() => navigate("/login")}
              className="w-50"
              buttonStyle=""
            >
              Go to Login
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  if (!token || !username) {
    return (
      <Card className="shadow-lg p-5">
        <div className="text-center">
          <SpinningLogo />
          <div className="mt-4">
            <p className="text-light opacity-75">Verifying reset link...</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg p-5">
      <div className="text-center">
        <SpinningLogo />
        <div className="mt-4">
          <h4 className="text-light mb-3">Reset Password</h4>
          <p className="text-light opacity-75 mb-4">
            Enter your new password for <strong>{username}</strong>
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="m-2 w-100" style={{ maxWidth: "300px" }}>
            <Input
              LabelName="New Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              id="password"
              required
              toggleUncensor
              placeholder="Enter new password"
            />
          </div>

          <div className="m-2 w-100" style={{ maxWidth: "300px" }}>
            <Input
              LabelName="Confirm New Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              type="password"
              id="confirmPassword"
              required
              toggleUncensor
              placeholder="Confirm new password"
            />
          </div>

          <div className="d-flex flex-column align-items-center gap-3 mt-3">
            <Button
              type="submit"
              className="w-75"
              buttonStyle=""
              disabled={isLoading}
            >
              {isLoading ? "Changing Password..." : "Change Password"}
            </Button>

            <Link
              to="/login"
              className="text-decoration-none text-light opacity-75 hover-opacity-100"
              style={{ fontSize: "0.9rem" }}
            >
              Back to Login
            </Link>
          </div>
        </div>
      </form>
    </Card>
  );
}
