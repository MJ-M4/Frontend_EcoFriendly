import React, { useState } from 'react';
import {
  FaBars,
  FaCalendar,
  FaCalendarAlt,
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

const Sidebar = ({ userName, activePage, onLogout, userRole }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = () => {
    onLogout();
    navigate('/HomePage');
    setIsOpen(false);
  };

  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <FaBars />
      </button>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="user-profile">
          <img src="/images/sami.png" alt="User Avatar" />
          <h2>{userName}</h2>
        </div>
        <nav>
          <ul>
            <li className={activePage === 'general' ? 'active' : ''}>
              <Link to="/general" onClick={handleLinkClick}>
                <FaHouseUser /> General
              </Link>
            </li>
            <li className={activePage === 'alerts' ? 'active' : ''}>
              <Link to="/alerts" onClick={handleLinkClick}>
                <FaExclamationTriangle /> Alerts
              </Link>
            </li>
            {userRole === 'manager' && (
              <>
                <li className={activePage === 'reports' ? 'active' : ''}>
                  <Link to="/reports" onClick={handleLinkClick}>
                    <FaChartBar /> Reports
                  </Link>
                </li>
                <li className={activePage === 'employees' ? 'active' : ''}>
                  <Link to="/employees" onClick={handleLinkClick}>
                    <FaUsers /> Employees
                  </Link>
                </li>
                <li className={activePage === 'shifts' ? 'active' : ''}>
                  <Link to="/shifts" onClick={handleLinkClick}>
                    <FaClock /> Shifts
                  </Link>
                </li>
                <li className={activePage === 'shift-proposals' ? 'active' : ''}>
                  <Link to="/shift-proposals" onClick={handleLinkClick}>
                    <FaCalendarAlt /> Shift Proposals
                  </Link>
                </li>
                <li className={activePage === 'vehicles' ? 'active' : ''}>
                  <Link to="/vehicles" onClick={handleLinkClick}>
                    <FaTruck /> Vehicles
                  </Link>
                </li>
                <li className={activePage === 'payment' ? 'active' : ''}>
                  <Link to="/payment" onClick={handleLinkClick}>
                    <FaDollarSign /> Payments
                  </Link>
                </li>
                <li className={activePage === 'bin-management' ? 'active' : ''}>
                  <Link to="/bin-management" onClick={handleLinkClick}>
                    <FaTrash /> Bin Management
                  </Link>
                </li>
                <li className={activePage === 'hardware-examination' ? 'active' : ''}>
                  <Link to="/hardware-examination" onClick={handleLinkClick}>
                    <FaTools /> Hardware Examination
                  </Link>
                </li>
              </>
            )}
            {userRole === 'worker' && (
              <>
                <li className={activePage === 'my-shifts' ? 'active' : ''}>
                  <Link to="/my-shifts" onClick={handleLinkClick}>
                    <FaClock /> My Shifts
                  </Link>
                </li>
                <li className={activePage === 'propose-shifts' ? 'active' : ''}>
                  <Link to="/propose-shifts" onClick={handleLinkClick}>
                    <FaCalendar /> Propose Shifts
                  </Link>
                </li>
              </>
            )}
            <li className={activePage === 'settings' ? 'active' : ''}>
              <Link to="/settings" onClick={handleLinkClick}>
                <FaCog /> Settings
              </Link>
            </li>
          </ul>
        </nav>
        <button className="sign-out" onClick={handleSignOut}>
          <FaSignOutAlt /> Sign Out
        </button>
      </div>
    </>
  );
};

export default Sidebar;