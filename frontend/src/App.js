import React, { useState } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AlertsPage from "./components/Alerts";
import BinManagementPage from "./components/BinManagement";
import EmployeesPage from "./components/EmployeesPage";
import ForgotPassword from "./components/ForgotPassword";
import GeneralPage from "./components/General";
import HardwareExamination from "./components/HardwareExamination";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import MyShiftsPage from "./components/MyShiftsPage";
import PaymentPage from "./components/Payment";
import ReportsPage from "./components/Reports";
import SettingsPage from "./components/Settings";
import ShiftsPage from "./components/Shifts";
import VehiclesPage from "./components/Vehicles";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("worker"); // default

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole("worker");
  };

  return (
    <Router>
      <Routes>
        {/* Default path */}
        <Route path="/" element={<Navigate to="/HomePage" replace />} />
        
        {/* Public */}
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/login"
          element={
            <Login
              onLogin={handleLogin}
              isAuthenticated={isAuthenticated}
            />
          }
        />

        {/* Protected routes */}
        <Route
          path="/general"
          element={
            isAuthenticated
              ? <GeneralPage onLogout={handleLogout} userRole={userRole} />
              : <Navigate to="/login" replace />
          }
        />

        {/* Manager-only pages */}
        <Route
          path="/reports"
          element={
            isAuthenticated && userRole === "manager"
              ? <ReportsPage onLogout={handleLogout} userRole={userRole} />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/employees"
          element={
            isAuthenticated && userRole === "manager"
              ? <EmployeesPage onLogout={handleLogout} userRole={userRole} />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/shifts"
          element={
            isAuthenticated && userRole === "manager"
              ? <ShiftsPage onLogout={handleLogout} userRole={userRole} />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/vehicles"
          element={
            isAuthenticated && userRole === "manager"
              ? <VehiclesPage onLogout={handleLogout} userRole={userRole} />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/payment"
          element={
            isAuthenticated && userRole === "manager"
              ? <PaymentPage onLogout={handleLogout} userRole={userRole} />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/bin-management"
          element={
            isAuthenticated && userRole === "manager"
              ? <BinManagementPage onLogout={handleLogout} userRole={userRole} />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/hardware-examination"
          element={
            isAuthenticated && userRole === "manager"
              ? <HardwareExamination onLogout={handleLogout} userRole={userRole} />
              : <Navigate to="/login" replace />
          }
        />

        {/* Worker & manager shared pages */}
        <Route
          path="/alerts"
          element={
            isAuthenticated
              ? <AlertsPage onLogout={handleLogout} userRole={userRole} />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/settings"
          element={
            isAuthenticated
              ? <SettingsPage onLogout={handleLogout} userRole={userRole} />
              : <Navigate to="/login" replace />
          }
        />

        {/* Worker-only page for selecting shifts */}
        <Route
          path="/my-shifts"
          element={
            isAuthenticated && userRole === "worker"
              ? <MyShiftsPage onLogout={handleLogout} userRole={userRole} />
              : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
