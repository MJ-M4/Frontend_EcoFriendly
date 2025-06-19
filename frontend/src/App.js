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
import ProposeShiftsPage from './components/ProposeShiftsPage';
import ReportsPage from './components/Reports';
import SettingsPage from './components/Settings';
import ShiftProposalsPage from './components/ShiftProposalsPage';
<<<<<<< HEAD
import MyPaymentsPage from './components/MyPaymentsPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null); 
  const [userData, setUserData] = useState(null);

  const handleLogin = (userData) => {
=======
import ShiftsPage from './components/ShiftsPage';
import VehiclesPage from './components/Vehicles';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');

  const handleLogin = (role, userId, name) => {
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
    setIsAuthenticated(true);
    const role = userData.user.role.toLowerCase();
    setUserRole(role);
<<<<<<< HEAD
    setUserId(userData.user.userId);
    setUserData({
      name: userData.user.name, 
      avatar: userData.user.avatar || '/images/sami.png', // Default if not provided
      identity: userData.user.identity,
    });
=======
    setUserId(userId);
    setUserName(name);
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('worker');
    setUserId(null);
    setUserName('');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/HomePage" replace />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/login"
          element={<Login 
            onLogin={handleLogin} 
            isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/general"
          element={
            isAuthenticated ? (
<<<<<<< HEAD
              <GeneralPage onLogout={handleLogout} userRole={userRole} user={userData}/>
=======
              <GeneralPage
              onLogout={handleLogout}
              userRole={userRole}
              userName={userName} />
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/reports"
          element={
            isAuthenticated && userRole === 'manager' ? (
<<<<<<< HEAD
              <ReportsPage onLogout={handleLogout} userRole={userRole} user={userData} />
=======
              <ReportsPage
              onLogout={handleLogout}
              userRole={userRole}
              userName={userName} />
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/employees"
          element={
            isAuthenticated && userRole === 'manager' ? (
<<<<<<< HEAD
              <EmployeesPage onLogout={handleLogout} userRole={userRole} user={userData} />
=======
              <EmployeesPage
              onLogout={handleLogout}
              userRole={userRole}
              userName={userName}
              userId={userId} />
                 
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        
        <Route
          path="/shifts"
          element={
            isAuthenticated && userRole === 'manager' ? (
<<<<<<< HEAD
              <ShiftsPage onLogout={handleLogout} userRole={userRole} user={userData}/>
=======
              <ShiftsPage
              onLogout={handleLogout} 
              userRole={userRole}
              userName={userName} />
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/shift-proposals"
          element={
            isAuthenticated && userRole === 'manager' ? (
<<<<<<< HEAD
              <ShiftProposalsPage onLogout={handleLogout} userRole={userRole} user={userData} />
=======
              <ShiftProposalsPage
              onLogout={handleLogout}
              userRole={userRole}
              userName={userName} />
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/vehicles"
          element={
            isAuthenticated && userRole === 'manager' ? (
<<<<<<< HEAD
              <VehiclesPage onLogout={handleLogout} userRole={userRole} user={userData} />
=======
              <VehiclesPage
               onLogout={handleLogout} 
               userRole={userRole}
               userName={userName} />
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/payment"
          element={
            isAuthenticated && userRole === 'manager' ? (
<<<<<<< HEAD
              <PaymentPage onLogout={handleLogout} userRole={userRole} user={userData} />
=======
              <PaymentPage
               onLogout={handleLogout} 
               userRole={userRole}
               userName={userName}/>
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/bin-management"
          element={
            isAuthenticated && userRole === 'manager' ? (
<<<<<<< HEAD
              <BinManagementPage onLogout={handleLogout} userRole={userRole} user={userData}/>
=======
              <BinManagementPage 
              onLogout={handleLogout}
              userRole={userRole}
              userName={userName} />
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/hardware-examination"
          element={
            isAuthenticated && userRole === 'manager' ? (
<<<<<<< HEAD
              <HardwareExamination onLogout={handleLogout} userRole={userRole} user={userData}/>
=======
              <HardwareExamination 
              onLogout={handleLogout} 
              userRole={userRole}
              userName={userName} />
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/alerts"
          element={
            isAuthenticated ? (
<<<<<<< HEAD
              <AlertsPage onLogout={handleLogout} userRole={userRole} user={userData} />
=======
              <AlertsPage
              onLogout={handleLogout}
              userRole={userRole}
              userName={userName} />
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/settings"
          element={
            isAuthenticated ? (
<<<<<<< HEAD
              <SettingsPage onLogout={handleLogout} userRole={userRole} user={userData}/>
=======
              <SettingsPage
              onLogout={handleLogout}
              userRole={userRole}
              userName={userName}
              userId={userId}  />
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/my-shifts"
          element={
            isAuthenticated && userRole === 'worker' ? (
<<<<<<< HEAD
              <MyShiftsPage onLogout={handleLogout} userRole={userRole} user={userData}/>
=======
              <MyShiftsPage
              onLogout={handleLogout}
              userRole={userRole}
              userId={userId}
              userName={userName} />
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
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
<<<<<<< HEAD
                onLogout={handleLogout}
                userRole={userRole}
                userId={userId}
                user={userData}
              />
=======
              onLogout={handleLogout}
              userRole={userRole} 
              userId={userId}
              userName={userName} />
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/my-payments"
          element={
            isAuthenticated && userRole === 'worker' ? (
              <MyPaymentsPage onLogout={handleLogout} userRole={userRole} user={userData} />
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