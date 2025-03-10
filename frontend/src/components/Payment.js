import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './css/reset.css';
import './css/layout.css';
import './css/components.css';
import './css/themes.css';
import './css/responsive.css';

const PaymentPage = ({ onLogout, userRole }) => {
<<<<<<< HEAD
=======
  // Mock workers data
>>>>>>> main
  const workers = [
    { id: 1, name: 'Worker 1', workerType: 'Driver' },
    { id: 2, name: 'Worker 2', workerType: 'Cleaner' },
    { id: 3, name: 'Worker 3', workerType: 'Maintenance Worker' },
  ];

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

<<<<<<< HEAD
=======
  // Filter payments by worker ID only
>>>>>>> main
  const filteredPayments = payments.filter((payment) =>
    String(payment.workerId).includes(searchTerm)
  );

  const handleAddPayment = () => {
    if (newPayment.workerId && newPayment.amount && newPayment.notes) {
      const selectedWorker = workers.find((w) => w.id === parseInt(newPayment.workerId));
      if (!selectedWorker) {
        alert('Invalid Worker ID. Please enter a valid Worker ID.');
        return;
      }

      const newId = payments.length + 1;
<<<<<<< HEAD
      setPayments([...payments, { id: newId, workerId: selectedWorker.id, workerName: selectedWorker.name, amount: parseFloat(newPayment.amount), paymentDate: '', status: 'Pending', notes: newPayment.notes || '' }]);
      setNewPayment({ workerId: workers[0]?.id || '', amount: '', notes: '' });
=======
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
>>>>>>> main
    } else {
      alert('Please fill in all fields (Worker ID, Amount, and Notes) to add a payment.');
    }
  };

  const handleMarkAsPaid = (id) => {
<<<<<<< HEAD
    setPayments(payments.map((payment) => payment.id === id ? { ...payment, status: 'Paid', paymentDate: '2025-03-05' } : payment));
=======
    setPayments(
      payments.map((payment) =>
        payment.id === id
          ? { ...payment, status: 'Paid', paymentDate: new Date().toISOString().split('T')[0] } // Use current date
          : payment
      )
    );
>>>>>>> main
  };

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
<<<<<<< HEAD
=======

        {/* Search Box */}
>>>>>>> main
        <div className="form-container">
          <input
            type="text"
            placeholder="Search by Worker ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
<<<<<<< HEAD
        <div className="form-container payment-form">
          <select
            value={newPayment.workerId}
            onChange={(e) => setNewPayment({ ...newPayment, workerId: e.target.value })}
            className="form-input"
          >
            {workers.map((worker) => (
              <option key={worker.id} value={worker.id}>
                {worker.name} ({worker.workerType})
              </option>
            ))}
          </select>
=======

        {/* Add Payment Form */}
        <div className="form-container">
>>>>>>> main
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
<<<<<<< HEAD
            onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
            className="form-input"
=======
            onChange={handleInputChange}
            className="form-input"
            required
>>>>>>> main
          />
          <input
            type="text"
            name="notes"
            placeholder="Notes"
            value={newPayment.notes}
<<<<<<< HEAD
            onChange={(e) => setNewPayment({ ...newPayment, notes: e.target.value })}
            className="form-input"
=======
            onChange={handleInputChange}
            className="form-input"
            required
>>>>>>> main
          />
          <button onClick={handleAddPayment} className="download-report-btn">
            Add Payment
          </button>
        </div>
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
<<<<<<< HEAD
                      <button onClick={() => handleMarkAsPaid(payment.id)} className="action-btn maintain">
                        Mark as Paid
                      </button>
                    )}
                    <button onClick={() => handleDeletePayment(payment.id)} className="action-btn delete">
=======
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
>>>>>>> main
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