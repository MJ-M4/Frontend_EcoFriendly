// src/components/ShiftProposalsPage.js
import React from 'react';
import Sidebar from './Sidebar';
import './css/general.css';
import { shiftProposalsStore, approvedShiftsStore } from './mockData';

const ShiftProposalsPage = ({ onLogout, userRole }) => {
  const proposals = shiftProposalsStore.getPendingProposals();
  const user = { name: 'Mohamed Mhagne', avatar: '/images/sami.png' };

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

  if (userRole !== 'manager') {
    return <div className="error">Access Denied: Managers Only</div>;
  }

  return (
    <div className="dashboard">
      <Sidebar user={user} activePage="shift-proposals" onLogout={onLogout} userRole={userRole} />
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
                  <td>{proposal.workerId}</td>
                  <td>{proposal.workerName}</td>
                  <td>{proposal.workerType}</td>
                  <td>{proposal.date}</td>
                  <td>{proposal.startTime}</td>
                  <td>{proposal.endTime}</td>
                  <td>{proposal.location}</td>
                  <td>{new Date(proposal.submittedAt).toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() => handleApprove(proposal)}
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