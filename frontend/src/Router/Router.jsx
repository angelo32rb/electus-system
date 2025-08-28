import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// MiddleWare
import ProtectedRoute from "./ProtectedRouter.jsx";

// Contexts
import { AuthProvider } from "../Contexts/AuthContext.jsx";
import { ThemeEditor } from "../Contexts/ThemeEditor.jsx";

// Loading Animation
import PulseLogo from "../lib/Animations/PulseLogo.jsx";

// Pages
const Login = lazy(() => import("../Pages/Login/"));
const ForgotPasswordPage = lazy(() => import("../Pages/ForgotPassword/"));
const ResetPasswordPage = lazy(() => import("../Pages/ResetPassword/"));
const Dashboard = lazy(() => import("../Pages/Dashboard/Dashboard.jsx"));

// Components
const Instances = lazy(() =>
  import("../Components/Dashboard/Instances/Instances.jsx")
);

const NormalSpreadsheet = lazy(() =>
  import("../Components/Dashboard/Spreadsheets/NormalSpreadsheet.jsx")
);

export default function Router() {
  return (
    <AuthProvider>
      <ThemeEditor>
        <BrowserRouter>
          <Suspense fallback={<PulseLogo />}>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              >
                <Route index element={<NormalSpreadsheet />} />
                <Route path="my-inventory" element={<NormalSpreadsheet />} />
                <Route path="orders" element={<NormalSpreadsheet />} />
                <Route path="instances" element={<Instances />} />
              </Route>

              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeEditor>
    </AuthProvider>
  );
}
