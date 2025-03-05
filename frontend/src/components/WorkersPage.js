// src/components/WorkersPage.js
import React from 'react';
import Sidebar from './Sidebar';

const WorkersPage = ({ onLogout, userRole }) => {
  // Mock workers data
  const mockWorkers = [
    { id: 1, name: 'Worker 1', location: 'Tel Aviv' },
    { id: 2, name: 'Worker 2', location: 'Jerusalem' },
    { id: 3, name: 'Worker 3', location: 'Haifa' },
  ];

  const user = { name: 'Mohamed Mhagne', avatar: '/images/sami.png' };

  return (
    <div className="dashboard">
      <Sidebar user={user} activePage="workers" onLogout={onLogout} userRole={userRole} />
      <div className="content">
        <h1>Workers</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {mockWorkers.map((worker) => (
              <tr key={worker.id}>
                <td>{worker.id}</td>
                <td>{worker.name}</td>
                <td>{worker.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkersPage;