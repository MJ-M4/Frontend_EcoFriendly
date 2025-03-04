import { faChartBar, faCog, faExclamationTriangle, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink } from 'react-router-dom';

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
          <NavLink to="#"><FontAwesomeIcon icon={faHome} /> General</NavLink>
          </li>
          <li>
          <NavLink to="#"><FontAwesomeIcon icon={faChartBar} /> Reports</NavLink>
          </li>
          <li>
          <NavLink to="#"><FontAwesomeIcon icon={faExclamationTriangle} /> Alerts</NavLink>
          </li>
          <li>
          <NavLink to="#"><FontAwesomeIcon icon={faCog} /> Settings</NavLink>
          </li>
        </ul>
      </nav>
      <button id='btn'>Sign Out</button>
    </div>
  );
};

export default Sidebar;