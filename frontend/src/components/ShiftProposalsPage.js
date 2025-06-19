<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './css/shift-proposals.css';

const ShiftProposalsPage = ({ onLogout, userRole, user }) => {
  const [proposals, setProposals] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await fetch('http://localhost:5005/local/getPendingProposals');
        const data = await response.json();
        console.log('Fetched proposals:', data); 
        if (data.status === 'success') {
          setProposals(data.proposals || []);
        } else {
          alert('Failed to fetch proposals: ' + data.message);
        }
      } catch (error) {
        alert('Error fetching proposals: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProposals();
  }, []);

  const handleApprove = async (proposal) => {
    try {
      const response = await fetch(`http://localhost:5005/local/approveProposal/${proposal.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (data.status === 'success') {
        setProposals(proposals.filter((p) => p.id !== proposal.id));
        alert(`Shift for ${proposal.worker_name} on ${proposal.date} approved!`);
      } else {
        alert('Failed to approve proposal: ' + data.message);
      }
    } catch (error) {
      alert('Error approving proposal: ' + error.message);
    }
  };

  const handleDeny = async (proposalId) => {
    try {
      const response = await fetch(`http://localhost:5005/local/denyProposal/${proposalId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (data.status === 'success') {
        setProposals(proposals.filter((p) => p.id !== proposalId));
        alert('Shift proposal denied.');
      } else {
        alert('Failed to deny proposal: ' + data.message);
      }
    } catch (error) {
      alert('Error denying proposal: ' + error.message);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
=======
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
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
  };


  return (
    <div className="dashboard">
<<<<<<< HEAD
      <button className="sidebar-toggle" onClick={toggleSidebar} aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}>
        {isSidebarOpen ? '✖' : '☰'}
      </button>
      <Sidebar user={user} activePage="shift-proposals" onLogout={onLogout} userRole={userRole} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="content">
        <h1>Shift Proposals</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : proposals.length === 0 ? (
          <p>No pending proposals.</p>
        ) : (
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
=======
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
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
                </tr>
              </thead>
              <tbody>
                {proposals.map((proposal) => (
                  <tr key={proposal.id}>
                    <td data-label="Worker ID">{proposal.worker_id}</td>
                    <td data-label="Worker Name">{proposal.worker_name}</td>
                    <td data-label="Worker Type">{proposal.worker_type}</td>
                    <td data-label="Date">{proposal.date}</td>
                    <td data-label="Start Time">{proposal.start_time.slice(0, 5)}</td>
                    <td data-label="End Time">{proposal.end_time.slice(0, 5)}</td>
                    <td data-label="Location">{proposal.location}</td>
                    <td data-label="Submitted At">{new Date(proposal.submitted_at).toLocaleString()}</td>
                    <td data-label="Actions">
                      <button
                        onClick={() => handleApprove(proposal)}
                        className="approve-btn"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleDeny(proposal.id)}
                        className="deny-btn"
                      >
                        Deny
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShiftProposalsPage;