// src/components/Sidebar.js
import React from 'react';
import { FaChartBar, FaCog, FaExclamationTriangle, FaSignOutAlt, FaUsers, FaClock, FaTruck, FaDollarSign, FaTrash, FaHouseUser } from 'react-icons/fa'; // Add FaDollarSign
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
          <li className={activePage === 'reports' ? 'active' : ''}>
            <Link to="/reports">
              <FaChartBar /> Reports
            </Link>
          </li>
          <li className={activePage === 'alerts' ? 'active' : ''}>
            <Link to="/alerts">
              <FaExclamationTriangle /> Alerts
            </Link>
          </li>
          <li className={activePage === 'settings' ? 'active' : ''}>
            <Link to="/settings">
              <FaCog /> Settings
            </Link>
          </li>
          {userRole === 'manager' && (
            <>
              <li className={activePage === 'workers' ? 'active' : ''}>
                <Link to="/workers">
                  <FaUsers /> Workers
                </Link>
              </li>
              <li className={activePage === 'shifts' ? 'active' : ''}>
                <Link to="/shifts">
                  <FaClock /> Shifts
                </Link>
              </li>
              {/* Add Vehicles link if implemented */}
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
            </>
          )}
          
        </ul>
      </nav>
      <button className="sign-out" onClick={handleSignOut}>
        <FaSignOutAlt /> Sign Out
      </button>
    </div>
  );
};

export default Sidebar;