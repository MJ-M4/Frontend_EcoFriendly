import {
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


const Sidebar = ({ user, activePage, onLogout, userRole, isOpen, toggleSidebar }) => {
  const navigate = useNavigate();


  const handleSignOut = () => {
    onLogout();
    navigate('/HomePage');
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="user-profile">
        <img src={user.avatar} alt="User Avatar" />
        <h2>{user.name}</h2>
      </div>
      <nav>
        <ul>
          <li className={activePage === 'general' ? 'active' : ''}>
            <Link to="/general" onClick={toggleSidebar}>
              <FaHouseUser /> General
            </Link>
          </li>
          <li className={activePage === 'alerts' ? 'active' : ''}>
            <Link to="/alerts" onClick={toggleSidebar}>
              <FaExclamationTriangle /> Alerts
            </Link>
          </li>
          {userRole.toLowerCase() === 'manager' && (
            <>
              <li className={activePage === 'reports' ? 'active' : ''}>
                <Link to="/reports" onClick={toggleSidebar}>
                  <FaChartBar /> Reports
                </Link>
              </li>
              <li className={activePage === 'employees' ? 'active' : ''}>
                <Link to="/employees" onClick={toggleSidebar}>
                  <FaUsers /> Employees
                </Link>
              </li>
              <li className={activePage === 'shifts' ? 'active' : ''}>
                <Link to="/shifts" onClick={toggleSidebar}>
                  <FaClock /> Shifts
                </Link>
              </li>
              <li className={activePage === 'shift-proposals' ? 'active' : ''}>
                <Link to="/shift-proposals" onClick={toggleSidebar}>
                  <FaCalendarAlt /> Shift Proposals
                </Link>
              </li>
              <li className={activePage === 'vehicles' ? 'active' : ''}>
                <Link to="/vehicles" onClick={toggleSidebar}>
                  <FaTruck /> Vehicles
                </Link>
              </li>
              <li className={activePage === 'payment' ? 'active' : ''}>
                <Link to="/payment" onClick={toggleSidebar}>
                  <FaDollarSign /> Payments
                </Link>
              </li>
              <li className={activePage === 'bin-management' ? 'active' : ''}>
                <Link to="/bin-management" onClick={toggleSidebar}>
                  <FaTrash /> Bin Management
                </Link>
              </li>
            </>
          )}
          {userRole.toLowerCase() === 'worker' && (
            <>
              <li className={activePage === 'my-shifts' ? 'active' : ''}>
                <Link to="/my-shifts" onClick={toggleSidebar}>
                  <FaClock /> My Shifts
                </Link>
              </li>
              <li className={activePage === 'propose-shifts' ? 'active' : ''}>
                <Link to="/propose-shifts" onClick={toggleSidebar}>
                  <FaCalendar /> Propose Shifts
                </Link>
              </li>
              <li className={activePage === 'my-payments' ? 'active' : ''}>
                <Link to="/my-payments" onClick={toggleSidebar}>
                  <FaDollarSign /> My Payments
                </Link>
              </li>
            </>
          )}
          <li className={activePage === 'hardware-examination' ? 'active' : ''}>
                <Link to="/hardware-examination" onClick={toggleSidebar}>
                  <FaTools /> Hardware Examination
                </Link>
              </li>
          <li className={activePage === 'settings' ? 'active' : ''}>
            <Link to="/settings" onClick={toggleSidebar}>
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