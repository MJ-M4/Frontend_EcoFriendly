// src/components/ShiftProposalsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import './css/general.css';

const ShiftProposalsPage = ({ onLogout, userRole, userName }) => {
  const [proposals, setProposals] = useState([]);
  const [error, setError] = useState('');

  const fetchProposals = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/shifts', {
        params: { status: 'pending' },
      });
      setProposals(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch shift proposals');
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  const handleApprove = async (shiftId) => {
    try {
      await axios.put(`http://localhost:5000/api/shifts/${shiftId}/approve`);
      setProposals(proposals.filter((p) => p.id !== shiftId));
      alert('Shift approved successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to approve shift');
    }
  };

  const handleDeny = async (shiftId) => {
    try {
      await axios.put(`http://localhost:5000/api/shifts/${shiftId}/deny`);
      setProposals(proposals.filter((p) => p.id !== shiftId));
      alert('Shift denied successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to deny shift');
    }
  };

  if (userRole !== 'manager') {
    return <div className="error">Access Denied: Managers Only</div>;
  }

  return (
    <div className="dashboard">
      <Sidebar userName={userName} activePage="shift-proposals" onLogout={onLogout} userRole={userRole} />
      <div className="content">
        <h1>Shift Proposals</h1>
        {error && <p className="error">{error}</p>}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Worker ID</th>
                <th>Worker Name</th>
                <th>Worker Type</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Location</th>
                <th>Submitted At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {proposals.map((proposal) => (
                <tr key={proposal.id}>
                  <td>{proposal.worker_id}</td>
                  <td>{proposal.worker_name}</td>
                  <td>{proposal.worker_type}</td>
                  <td>{proposal.date}</td>
                  <td>{proposal.start_time}</td>
                  <td>{proposal.end_time}</td>
                  <td>{proposal.location}</td>
                  <td>{proposal.submitted_at}</td>
                  <td>
                    <button
                      onClick={() => handleApprove(proposal.id)}
                      className="download-report-btn"
                      style={{ marginRight: '5px' }}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDeny(proposal.id)}
                      className="delete-btn"
                    >
                      Deny
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShiftProposalsPage;