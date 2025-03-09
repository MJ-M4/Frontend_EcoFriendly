// src/components/Payment.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './css/general.css';

const PaymentPage = ({ onLogout, userRole }) => {
  // Mock workers data
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
    workerId: '',
    amount: '',
    notes: '',
  });

  const user = { name: 'Mohamed Mhagne', avatar: '/images/sami.png' };

  // Filter payments by worker ID only
  const filteredPayments = payments.filter((payment) =>
    String(payment.workerId).includes(searchTerm)
  );

  // Handle adding a new payment
  const handleAddPayment = () => {
    if (newPayment.workerId && newPayment.amount && newPayment.notes) {
      const selectedWorker = workers.find((w) => w.id === parseInt(newPayment.workerId));
      if (!selectedWorker) {
        alert('Invalid Worker ID. Please enter a valid Worker ID.');
        return;
      }

      const newId = payments.length + 1;
      setPayments([
        ...payments,
        {
          id: newId,
          workerId: parseInt(newPayment.workerId),
          workerName: selectedWorker.name,
          amount: parseFloat(newPayment.amount),
          paymentDate: '',
          status: 'Pending',
          notes: newPayment.notes,
        },
      ]);
      setNewPayment({
        workerId: '',
        amount: '',
        notes: '',
      });
    } else {
      alert('Please fill in all fields (Worker ID, Amount, and Notes) to add a payment.');
    }
  };

  // Handle marking payment as paid
  const handleMarkAsPaid = (id) => {
    setPayments(
      payments.map((payment) =>
        payment.id === id
          ? { ...payment, status: 'Paid', paymentDate: new Date().toISOString().split('T')[0] } // Use current date
          : payment
      )
    );
  };

  // Handle deleting a payment
  const handleDeletePayment = (id) => {
    setPayments(payments.filter((payment) => payment.id !== id));
  };

  // Handle input change for new payment form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPayment((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="dashboard">
      <Sidebar user={user} activePage="payment" onLogout={onLogout} userRole={userRole} />
      <div className="content">
        <h1>Payments</h1>

        {/* Search Box */}
        <div className="form-container">
          <input
            type="text"
            placeholder="Search by Worker ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Add Payment Form */}
        <div className="form-container">
          <input
            type="number"
            name="workerId"
            placeholder="Worker ID"
            value={newPayment.workerId}
            onChange={handleInputChange}
            className="form-input"
            required
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={newPayment.amount}
            onChange={handleInputChange}
            className="form-input"
            required
          />
          <input
            type="text"
            name="notes"
            placeholder="Notes"
            value={newPayment.notes}
            onChange={handleInputChange}
            className="form-input"
            required
          />
          <button onClick={handleAddPayment} className="download-report-btn">
            Add Payment
          </button>
        </div>

        {/* Payments Table */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Worker ID</th> {/* Added Worker ID column */}
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
                  <td>{payment.workerId}</td> {/* Display Worker ID */}
                  <td>{payment.workerName}</td>
                  <td>${payment.amount.toFixed(2)}</td>
                  <td>{payment.paymentDate || 'N/A'}</td>
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