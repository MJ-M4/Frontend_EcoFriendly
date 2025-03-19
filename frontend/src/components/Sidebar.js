// src/components/Sidebar.js
import React from 'react';
import {
  FaChartBar,
  FaClock,
  FaCog,
  FaDollarSign,
  FaExclamationTriangle,
  FaHouseUser,
  FaSignOutAlt,
  FaTools,
  FaTrash,
  FaTruck,
  FaUsers,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ user, activePage, onLogout, userRole }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    onLogout();
    navigate('/HomePage');
  };

  return (
    <div className="sidebar">
      <div className="user-profile">
        <img src={user.avatar} alt="User Avatar" />
        <h2>{user.name}</h2>
      </div>
      <nav>
        <ul>
          <li className={activePage === 'general' ? 'active' : ''}>
            <Link to="/general">
              <FaHouseUser /> General
            </Link>
          </li>
          <li className={activePage === "alerts" ? "active" : ""}>
            <Link to="/alerts">
              <FaExclamationTriangle /> Alerts
            </Link>
          </li>

          {/* Manager Only */}
          {userRole === "manager" && (
            <>
              <li className={activePage === "reports" ? "active" : ""}>
                <Link to="/reports">
                  <FaChartBar /> Reports
                </Link>
              </li>
              <li className={activePage === "employees" ? "active" : ""}>
                <Link to="/employees">
                  <FaUsers /> Employees
                </Link>
              </li>
              <li className={activePage === 'shifts' ? 'active' : ''}>
                <Link to="/shifts">
                  <FaClock /> Shifts
                </Link>
              </li>
              <li className={activePage === 'shift-proposals' ? 'active' : ''}>
                <Link to="/shift-proposals">
                  <FaCalendarAlt /> Shift Proposals
                </Link>
              </li>
              <li className={activePage === 'vehicles' ? 'active' : ''}>
                <Link to="/vehicles">
                  <FaTruck /> Vehicles
                </Link>
              </li>
              <li className={activePage === 'payment' ? 'active' : ''}>
                <Link to="/payment">
                  <FaDollarSign /> Payments
                </Link>
              </li>
              <li className={activePage === 'bin-management' ? 'active' : ''}>
                <Link to="/bin-management">
                  <FaTrash /> Bin Management
                </Link>
              </li>
              <li className={activePage === 'hardware-examination' ? 'active' : ''}>
                <Link to="/hardware-examination">
                  <FaTools /> Hardware Examination
                </Link>
              </li>
            </>
          )}

          {/* Worker Only */}
          {userRole === "worker" && (
            <li className={activePage === "my-shifts" ? "active" : ""}>
              <Link to="/my-shifts">
                <FaClock /> My Shifts
              </Link>
            </li>
          )}

          {/* Common: Settings */}
          <li className={activePage === "settings" ? "active" : ""}>
            <Link to="/settings">
              <FaCog /> Settings
            </Link>
          </li>
        </ul>
      </nav>
      <button className="sign-out" onClick={handleSignOut}>
        <FaSignOutAlt /> Sign Out
      </button>
    </div>
  );
};

export default Sidebar;