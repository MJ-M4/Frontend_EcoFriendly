// src/App.js
import React, { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AlertsPage from './components/Alerts';
import GeneralPage from './components/General';
import HomePage from './components/HomePage';
import Login from './components/Login';
import ReportsPage from './components/Reports';
import SettingsPage from './components/Settings';
import WorkersPage from './components/WorkersPage'; // Import the WorkersPage

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('worker'); // Track user role

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role); // Set the user role
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('worker'); // Reset role on logout
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/HomePage" replace />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} isAuthenticated={isAuthenticated} />}
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
        {/* Add route for WorkersPage (only accessible to managers) */}
        <Route
          path="/workers"
          element={
            isAuthenticated && userRole === 'manager' ? (
              <WorkersPage onLogout={handleLogout} userRole={userRole} />
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