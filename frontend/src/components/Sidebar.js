import { faChartBar, faCog, faExclamationTriangle, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Sidebar = ({ user }) => {
  return (
    <div className="sidebar">
      <div className="user-profile">
        <img src={user.avatar} alt="User Avatar" />
        <h2>{user.name}</h2>
      </div>
      <nav>
        <ul>
          <li className="active">
            <a href="#"><FontAwesomeIcon icon={faHome} /> General</a>
          </li>
          <li>
            <a href="#"><FontAwesomeIcon icon={faChartBar} /> Reports</a>
          </li>
          <li>
            <a href="#"><FontAwesomeIcon icon={faExclamationTriangle} /> Alerts</a>
          </li>
          <li>
            <a href="#"><FontAwesomeIcon icon={faCog} /> Settings</a>
          </li>
        </ul>
      </nav>
      <button>Sign Out</button>
    </div>
  );
};

export default Sidebar;