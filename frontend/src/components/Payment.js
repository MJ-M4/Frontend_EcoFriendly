import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Sidebar from './Sidebar';
import './css/reset.css';
import './css/layout.css';
import './css/components.css';
import './css/themes.css';
import './css/responsive.css';

const PaymentPage = ({ onLogout, userRole }) => {
  const workers = [
    { id: '207705096', name: 'mhagne', workerType: 'Driver' },
    { id: '205548491', name: 'jayusi', workerType: 'Cleaner' },
    { id: '212443412', name: 'Worker 3', workerType: 'Maintenance Worker' },
  ];

  const initialPayments = [
    {
      id: uuidv4().slice(0, 10),
      workerId: '207705096',
      workerName: 'mhagne',
      amount: 1500,
      paymentDate: '2025-03-01',
      status: 'Paid',
      notes: 'Monthly salary',
    },
    {
      id: uuidv4().slice(0, 10),
      workerId: '205548491',
      workerName: 'jayusi',
      amount: 1200,
      paymentDate: '2025-03-02',
      status: 'Pending',
      notes: 'Bonus',
    },
    {
      id: uuidv4().slice(0, 10),
      workerId: '212443412',
      workerName: 'Worker 3',
      amount: 1000,
      paymentDate: '2025-03-03',
      status: 'Pending',
      notes: 'Bonus',
    },
  ];

  const [payments, setPayments] = useState(initialPayments);
  const [searchTerm, setSearchTerm] = useState('');
  const [newPayment, setNewPayment] = useState({
    workerId: '',
    amount: '',
    paymentDate: '', // Added paymentDate
    notes: '',
  });

  const user = { name: 'Mohamed Mhagne', avatar: '/images/sami.png' };

  const filteredPayments = payments.filter((payment) =>
    payment.workerId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPayment = () => {
    // Validation
    if (
      !newPayment.workerId ||
      !newPayment.amount ||
      !newPayment.paymentDate ||
      !newPayment.notes
    ) {
      alert('Please fill in all fields (Worker ID, Amount, Payment Date, and Notes).');
      return;
    }

    const amount = parseFloat(newPayment.amount);
    if (isNaN(amount) || amount <= 0) {
      alert('Amount must be a positive number.');
      return;
    }

    const paymentDate = new Date(newPayment.paymentDate);
    const currentDate = new Date();
    if (paymentDate > currentDate) {
      alert('Payment Date cannot be in the future.');
      return;
    }

    const worker = workers.find((w) => w.id === newPayment.workerId);
    if (!worker) {
      alert('Worker ID not found. Please enter a valid Worker ID.');
      return;
    }

    const newId = uuidv4().slice(0, 10);

    setPayments([
      ...payments,
      {
        id: newId,
        workerId: newPayment.workerId,
        workerName: worker.name,
        amount: amount,
        paymentDate: newPayment.paymentDate, // Use the manually entered date
        status: 'Pending',
        notes: newPayment.notes,
      },
    ]);

    setNewPayment({ workerId: '', amount: '', paymentDate: '', notes: '' });
  };

  const handleMarkAsPaid = (id) => {
    const currentDate = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
    setPayments(
      payments.map((p) =>
        p.id === id
          ? {
              ...p,
              status: 'Paid',
              paymentDate: currentDate, // Update paymentDate when marking as paid
            }
          : p
      )
    );
  };

  const handleDeletePayment = (id) => {
    setPayments(payments.filter((p) => p.id !== id));
  };

  if (userRole !== 'manager') {
    return <div className="error">Access Denied: Managers Only</div>;
  }

  return (
    <div className="dashboard">
      <Sidebar user={user} activePage="payment" onLogout={onLogout} userRole={userRole} />
      <div className="content">
        <h1>Payments</h1>

        <div className="form-container">
          <input
            type="text"
            placeholder="Search by Worker ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="form-container">
          <input
            type="text"
            name="workerId"
            placeholder="Worker ID (e.g., 207705096)"
            value={newPayment.workerId}
            onChange={(e) => setNewPayment({ ...newPayment, workerId: e.target.value })}
            className="form-input"
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={newPayment.amount}
            onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
            className="form-input"
          />
          <input
            type="date"
            name="paymentDate"
            placeholder="Payment Date"
            value={newPayment.paymentDate}
            onChange={(e) => setNewPayment({ ...newPayment, paymentDate: e.target.value })}
            className="form-input"
          />
          <input
            type="text"
            name="notes"
            placeholder="Notes"
            value={newPayment.notes}
            onChange={(e) => setNewPayment({ ...newPayment, notes: e.target.value })}
            className="form-input"
          />
          <button onClick={handleAddPayment} className="download-report-btn">
            Add Payment
          </button>
        </div>
<<<<<<< HEAD
=======

>>>>>>> main
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Worker ID</th>
                <th>Worker Name</th>
                <th>Amount</th>
                <th>Payment Date</th>
                <th>Status</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>
                  <td>{payment.workerId}</td>
                  <td>{payment.workerName}</td>
                  <td>${payment.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td style={{ color: payment.paymentDate === 'N/A' ? '#888' : 'inherit' }}>
                    {payment.paymentDate}
                  </td>
                  <td>{payment.status}</td>
                  <td>{payment.notes}</td>
                  <td>
                    {payment.status === 'Pending' && (
                      <button
                        onClick={() => handleMarkAsPaid(payment.id)}
                        className="mark-paid-btn"
                      >
                        Mark as Paid
                      </button>
                    )}
                    <button
                      onClick={() => handleDeletePayment(payment.id)}
                      className="delete-btn"
                    >
                      Delete
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

export default PaymentPage;