// src/mockData.js
export const shiftProposalsStore = {
  proposals: [],
  addProposal: function (workerId, workerName, workerType, shifts) {
    shifts.forEach((shift) => {
      this.proposals.push({
        id: shift.id,
        workerId,
        workerName,
        workerType,
        date: shift.date,
        startTime: shift.startTime,
        endTime: shift.endTime,
        location: shift.location,
        status: 'pending',
        submittedAt: new Date().toISOString(),
      });
    });
  },
  updateProposalStatus: function (proposalId, status) {
    const proposal = this.proposals.find((p) => p.id === proposalId);
    if (proposal) {
      proposal.status = status;
    }
  },
  getPendingProposals: function () {
    return this.proposals.filter((p) => p.status === 'pending');
  },
};

export const approvedShiftsStore = {
  shifts: [],
  addShift: function (shift) {
    this.shifts.push(shift);
  },
};