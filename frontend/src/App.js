// src/App.js
import React, { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import AlertsPage from './components/Alerts';
import BinManagementPage from './components/BinManagement';
import EmployeesPage from './components/EmployeesPage';
import ForgotPassword from './components/ForgotPassword';
import GeneralPage from './components/General';
import HardwareExamination from './components/HardwareExamination';
import HomePage from './components/HomePage';
import Login from './components/Login';
import MyShiftsPage from './components/MyShiftsPage';
import PaymentPage from './components/Payment';
import ReportsPage from './components/Reports';
import SettingsPage from './components/Settings';
import ShiftsPage from './components/Shifts';
import VehiclesPage from './components/Vehicles';
import ProposeShiftsPage from './components/ProposeShiftsPage';
import ShiftProposalsPage from './components/ShiftProposalsPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null); 
  const [userData, setUserData] = useState(null);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    const role = userData.user.role.toLowerCase();
    setUserRole(role);
    setUserId(userData.user.userId);
    setUserData({
      name: userData.user.name, 
      avatar: userData.user.avatar || '/images/sami.png' // Default if not provided
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('worker');
    setUserId(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/HomePage" replace />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/general"
          element={
            isAuthenticated ? (
              <GeneralPage onLogout={handleLogout} userRole={userRole} user={userData}/>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/reports"
          element={
            isAuthenticated && userRole === 'manager' ? (
              <ReportsPage onLogout={handleLogout} userRole={userRole} user={userData} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/employees"
          element={
            isAuthenticated && userRole === 'manager' ? (
              <EmployeesPage onLogout={handleLogout} userRole={userRole} user={userData} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/shifts"
          element={
            isAuthenticated && userRole === 'manager' ? (
              <ShiftsPage onLogout={handleLogout} userRole={userRole} user={userData}/>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/shift-proposals"
          element={
            isAuthenticated && userRole === 'manager' ? (
              <ShiftProposalsPage onLogout={handleLogout} userRole={userRole} user={userData} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/vehicles"
          element={
            isAuthenticated && userRole === 'manager' ? (
              <VehiclesPage onLogout={handleLogout} userRole={userRole} user={userData} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/payment"
          element={
            isAuthenticated && userRole === 'manager' ? (
              <PaymentPage onLogout={handleLogout} userRole={userRole} user={userData} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/bin-management"
          element={
            isAuthenticated && userRole === 'manager' ? (
              <BinManagementPage onLogout={handleLogout} userRole={userRole} user={userData}/>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/hardware-examination"
          element={
            isAuthenticated && userRole === 'manager' ? (
              <HardwareExamination onLogout={handleLogout} userRole={userRole} user={userData}/>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/alerts"
          element={
            isAuthenticated ? (
              <AlertsPage onLogout={handleLogout} userRole={userRole} user={userData} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/settings"
          element={
            isAuthenticated ? (
              <SettingsPage onLogout={handleLogout} userRole={userRole} user={userData}/>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/my-shifts"
          element={
            isAuthenticated && userRole === 'worker' ? (
              <MyShiftsPage onLogout={handleLogout} userRole={userRole} user={userData}/>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/propose-shifts"
          element={
            isAuthenticated && userRole === 'worker' ? (
              <ProposeShiftsPage
                onLogout={handleLogout}
                userRole={userRole}
                userId={userId}
                user={userData}
              />
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