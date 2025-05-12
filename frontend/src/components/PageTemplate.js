import React from 'react';
import Sidebar from './Sidebar';
import './css/general.css';

const PageTemplate = ({ title, children, onLogout, userRole, userName, activePage }) => {
  return (
    <div className="dashboard">
      <Sidebar
        userName={userName}
        activePage={activePage}
        onLogout={onLogout}
        userRole={userRole}
      />
      <div className="content">
        <div className="container">
          <h2>{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageTemplate;