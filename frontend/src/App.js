import React, { useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import AlertsPage from "./components/Alerts";
import BinManagementPage from "./components/BinManagement";
import ForgotPassword from "./components/ForgotPassword";
import GeneralPage from "./components/General";
import HardwareExamination from "./components/HardwareExamination";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import PaymentPage from "./components/Payment";
import ReportsPage from "./components/Reports";
import SettingsPage from "./components/Settings";
import ShiftsPage from "./components/Shifts";
import VehiclesPage from "./components/Vehicles";
import WorkersPage from "./components/WorkersPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("worker"); // Track user role

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role); // Set the user role
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole("worker"); // Reset role on logout
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/HomePage" replace />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/login"
          element={
            <Login onLogin={handleLogin} isAuthenticated={isAuthenticated} />
          }
        />
        <Route
          path="/general"
          element={
            isAuthenticated ? (
              <GeneralPage onLogout={handleLogout} userRole={userRole} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/reports"
          element={
            isAuthenticated ? (
              <ReportsPage onLogout={handleLogout} userRole={userRole} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/alerts"
          element={
            isAuthenticated ? (
              <AlertsPage onLogout={handleLogout} userRole={userRole} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/settings"
          element={
            isAuthenticated ? (
              <SettingsPage onLogout={handleLogout} userRole={userRole} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/workers"
          element={
            isAuthenticated && userRole === "manager" ? (
              <WorkersPage onLogout={handleLogout} userRole={userRole} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/shifts"
          element={
            isAuthenticated && userRole === "manager" ? (
              <ShiftsPage onLogout={handleLogout} userRole={userRole} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/vehicles"
          element={
            isAuthenticated && userRole === "manager" ? (
              <VehiclesPage onLogout={handleLogout} userRole={userRole} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/payment"
          element={
            isAuthenticated && userRole === "manager" ? (
              <PaymentPage onLogout={handleLogout} userRole={userRole} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/bin-management"
          element={
            isAuthenticated && userRole === "manager" ? (
              <BinManagementPage onLogout={handleLogout} userRole={userRole} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/hardware-examination"
          element={
            isAuthenticated && userRole === "manager" ? (
              <HardwareExamination onLogout={handleLogout} userRole={userRole} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

