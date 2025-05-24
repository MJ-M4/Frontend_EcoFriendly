import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './css/shift-proposals.css';
import { shiftProposalsStore, approvedShiftsStore } from './mockData';

const ShiftProposalsPage = ({ onLogout, userRole,user }) => {
  const proposals = shiftProposalsStore.getPendingProposals();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleApprove = (proposal) => {
    shiftProposalsStore.updateProposalStatus(proposal.id, 'approved');
    approvedShiftsStore.addShift({
      id: proposal.id,
      workerId: proposal.workerId,
      workerName: proposal.workerName,
      workerType: proposal.workerType,
      date: proposal.date,
      startTime: proposal.startTime,
      endTime: proposal.endTime,
      location: proposal.location,
    });
    alert(`Shift for ${proposal.workerName} on ${proposal.date} approved!`);
  };

  const handleDeny = (proposalId) => {
    shiftProposalsStore.updateProposalStatus(proposalId, 'denied');
    alert('Shift proposal denied.');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (userRole !== 'manager') {
    return <div className="error">Access Denied: Managers Only</div>;
  }

  return (
    <div className="dashboard">
      <button className="sidebar-toggle" onClick={toggleSidebar} aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}>
        {isSidebarOpen ? '✖' : '☰'}
      </button>
      <Sidebar user={user} activePage="shift-proposals" onLogout={onLogout} userRole={userRole} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="content">
        <h1>Shift Proposals</h1>
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
                  <td data-label="Worker ID">{proposal.workerId}</td>
                  <td data-label="Worker Name">{proposal.workerName}</td>
                  <td data-label="Worker Type">{proposal.workerType}</td>
                  <td data-label="Date">{proposal.date}</td>
                  <td data-label="Start Time">{proposal.startTime}</td>
                  <td data-label="End Time">{proposal.endTime}</td>
                  <td data-label="Location">{proposal.location}</td>
                  <td data-label="Submitted At">{new Date(proposal.submittedAt).toLocaleString()}</td>
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
      </div>
    </div>
  );
};

export default ShiftProposalsPage;