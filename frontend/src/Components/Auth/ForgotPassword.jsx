import { useState } from "react";
import { Link } from "react-router-dom";
import { requestPasswordChange } from "../../Services/API";

// Components
import { Card } from "../../lib/Card/Card";
import SpinningLogo from "../../lib/Animations/SpinningLogo";
import { Input } from "../../lib/Forms/Inputs/Inputs";
import Button from "../../lib/Forms/Buttons/Buttons";
import Alerts from "../../lib/Alerts/Alerts";

export default function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.trim() === "") {
      Alerts("error", "Please enter your username");
      return;
    }

    setIsLoading(true);

    try {
      const result = await requestPasswordChange(username);

      if (result.status) {
        setIsSuccess(true);
        Alerts(
          "success",
          result.message || "Password reset email sent successfully!"
        );
      } else {
        Alerts("error", result.message || "Username not found");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
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
            <h4 className="text-light mb-3">Email Sent!</h4>
            <p className="text-light opacity-75 mb-4">
              We've sent password reset instructions to the email associated
              with the username <strong>{username}</strong>.
            </p>
            <p className="text-light opacity-75 mb-4">
              Please check your email and follow the instructions to reset your
              password.
            </p>
            <div className="">
              <Button
                onClick={() => {
                  setIsSuccess(false);
                  setUsername("");
                }}
                className="w-100"
                buttonStyle=""
              >
                Send Another Email
              </Button>
              <Link
                to="/login"
                className="text-light opacity-75 hover-opacity-100"
              >
                Back to Login
              </Link>
            </div>
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
          <h4 className="text-light mb-3">Forgot your password?</h4>
          <p className="text-light opacity-75 mb-4">
            Enter your username and we'll send you instructions to reset your
            password.
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="m-2 w-50">
            <Input
              LabelName="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              id="username"
              className="text-light"
              required
              placeholder="Enter your username"
            />
          </div>
          <Button type="submit" className="w-50 mt-3 mb-3" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Reset Email"}
          </Button>
          <Link to="/login" className="text-center text-light opacity-75 ">
            Back to Login
          </Link>
        </div>
      </form>
    </Card>
  );
}
