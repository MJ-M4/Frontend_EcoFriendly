// src/components/Payment.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './css/general.css';

const PaymentPage = ({ onLogout, userRole }) => {
  // Mock workers data (ideally passed as props or fetched from a shared state)
  const workers = [
    { id: 1, name: 'Worker 1', workerType: 'Driver' },
    { id: 2, name: 'Worker 2', workerType: 'Cleaner' },
    { id: 3, name: 'Worker 3', workerType: 'Maintenance Worker' },
  ];

  // Mock payments data
  const initialPayments = [
    { id: 1, workerId: 1, workerName: 'Worker 1', amount: 1500, paymentDate: '2025-03-01', status: 'Paid', notes: 'Monthly salary' },
    { id: 2, workerId: 2, workerName: 'Worker 2', amount: 1200, paymentDate: '2025-03-02', status: 'Pending', notes: 'Bonus' },
    { id: 3, workerId: 3, workerName: 'Worker 3', amount: 1800, paymentDate: '', status: 'Pending', notes: 'Overtime' },
  ];

  const [payments, setPayments] = useState(initialPayments);
  const [searchTerm, setSearchTerm] = useState('');
  const [newPayment, setNewPayment] = useState({
    workerId: workers[0]?.id || '',
    amount: '',
    notes: '',
  });

  const user = { name: 'Mohamed Mhagne', avatar: '/images/sami.png' };

  // Filter payments by worker name or status
  const filteredPayments = payments.filter((payment) =>
    payment.workerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle adding a new payment
  const handleAddPayment = () => {
    if (newPayment.workerId && newPayment.amount) {
      const selectedWorker = workers.find((w) => w.id === parseInt(newPayment.workerId));
      const newId = payments.length + 1;
      setPayments([
        ...payments,
        {
          id: newId,
          workerId: selectedWorker.id,
          workerName: selectedWorker.name,
          amount: parseFloat(newPayment.amount),
          paymentDate: '', // Initially empty until marked as paid
          status: 'Pending', // Default status
          notes: newPayment.notes || '',
        },
      ]);
      setNewPayment({
        workerId: workers[0]?.id || '',
        amount: '',
        notes: '',
      }); // Reset form
    } else {
      alert('Please fill in the required fields (Worker and Amount) to add a payment.');
    }
  };

  // Handle marking payment as paid
  const handleMarkAsPaid = (id) => {
    setPayments(
      payments.map((payment) =>
        payment.id === id
          ? { ...payment, status: 'Paid', paymentDate: '2025-03-05' } // Use current date or fetch dynamically
          : payment
      )
    );
  };

  // Handle deleting a payment
  const handleDeletePayment = (id) => {
    setPayments(payments.filter((payment) => payment.id !== id));
  };

  return (
    <div className="dashboard">
      <Sidebar user={user} activePage="payment" onLogout={onLogout} userRole={userRole} />
      <div className="content">
        <h1>Payments</h1>

        {/* Search Box */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search by worker name or status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '10px',
              width: '300px',
              borderRadius: '5px',
              border: '1px solid #e0e0e0',
              fontSize: '1rem',
            }}
          />
        </div>

        {/* Add Payment Form */}
        <div style={{ marginBottom: '20px' }}>
          <select
            value={newPayment.workerId}
            onChange={(e) => setNewPayment({ ...newPayment, workerId: e.target.value })}
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0' }}
          >
            {workers.map((worker) => (
              <option key={worker.id} value={worker.id}>
                {worker.name} ({worker.workerType})
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Amount"
            value={newPayment.amount}
            onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0' }}
          />
          <input
            type="text"
            placeholder="Notes (optional)"
            value={newPayment.notes}
            onChange={(e) => setNewPayment({ ...newPayment, notes: e.target.value })}
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0' }}
          />
          <button
            onClick={handleAddPayment}
            className="download-report-btn"
            style={{ padding: '10px 20px', height: '40px', width: '200px', margin: '5px' }}
          >
            Add Payment
          </button>
        </div>

        {/* Payments Table */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Payment ID</th>
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
                  <td>{payment.workerName}</td>
                  <td>${payment.amount.toFixed(2)}</td>
                  <td>{payment.paymentDate || 'N/A'}</td>
                  <td>{payment.status}</td>
                  <td>{payment.notes || '-'}</td>
                  <td>
                    {payment.status === 'Pending' && (
                      <button
                        onClick={() => handleMarkAsPaid(payment.id)}
                        style={{
                          padding: '5px 10px',
                          backgroundColor: '#4caf50',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          marginRight: '5px',
                        }}
                      >
                        Mark as Paid
                      </button>
                    )}
                    <button
                      onClick={() => handleDeletePayment(payment.id)}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#ff4d4f',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                      }}
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