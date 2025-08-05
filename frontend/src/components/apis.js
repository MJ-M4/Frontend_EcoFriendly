const localenv = 'http://localhost:5005/local';

export const loginApi = `${localenv}/login`;
export const alertsApi = `${localenv}/getAlerts`;

export const getBinsApi = `${localenv}/getBins`;
export const addBinApi = `${localenv}/addBin`;
export const deleteBinApi = (binId) => `${localenv}/deleteBin/${binId}`;
export const updateBinApi = (binId) => `${localenv}/updateBin/${binId}`;

export const getEmployeesApi = `${localenv}/getEmployees`;
export const addEmployeeApi = `${localenv}/addEmployee`;
export const deleteEmployeeApi = (identity) => `${localenv}/deleteEmployee/${identity}`;

export const getHardwareApi = `${localenv}/getHardware`;
export const addHardwareApi = `${localenv}/addHardware`;
export const deleteHardwareApi = (id) => `${localenv}/deleteHardware/${id}`;

export const getPaymentsApi =`${localenv}/getPayments`;
export const addPaymentApi = `${localenv}/addPayment`;
export const updatePaymentApi = (paymentId) => `${localenv}/updatePayment/${paymentId}`;
export const deletePaymentApi = (paymentId) => `${localenv}/deletePayment/${paymentId}`;
export const getMyPaymentsApi = (identity) => `${localenv}/getMyPayments/${identity}`;

export const getShiftsApi = `${localenv}/getShifts`;
export const addShiftApi = `${localenv}/addShift`;
export const deleteShiftApi = (shiftId) => `${localenv}/deleteShift/${shiftId}`;
export const updateShiftApi = (shiftId) => `${localenv}/updateShift/${shiftId}`;

export const proposeShiftApi = `${localenv}/proposeShift`;
export const getProposedShiftsApi = `${localenv}/getProposedShifts`;
export const getPendingProposalsApi = `${localenv}/getPendingProposals`;
export const approveProposalApi = (proposalId) => `${localenv}/approveProposal/${proposalId}`;
export const denyProposalApi = (proposalId) => `${localenv}/denyProposal/${proposalId}`;

export const getVehiclesApi = `${localenv}/getVehicles`;
export const addVehicleApi = `${localenv}/addVehicle`;
export const deleteVehicleApi = (licensePlate) => `${localenv}/deleteVehicle/${licensePlate}`;



