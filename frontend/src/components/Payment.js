import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import './css/general.css';

const PaymentPage = ({ onLogout, userRole, userName }) => {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  // Payment form data, including auto-filled info
  const [newPayment, setNewPayment] = useState({
    workerId: '',
    workerName: '',
    phone: '',
    location: '',
    role: '',
    amount: '',
    paymentDate: '',
    notes: '',
  });

  // Manager only
  if (userRole !== 'manager') {
    return <div className="error">Access Denied: Managers Only</div>;
  }

  // 1) Fetch all payments from the backend
  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/payments');
      setPayments(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch payments');
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // 2) Auto‐fetch worker details when Worker ID changes
  const handleWorkerIdChange = async (e) => {
    const workerId = e.target.value;
    // Reset name/phone/location/role
    setNewPayment((prev) => ({
      ...prev,
      workerId,
      workerName: '',
      phone: '',
      location: '',
      role: '',
    }));
    setError('');

    if (workerId.length >= 9) {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${workerId}`);
        const user = res.data;
        if (user.role !== 'worker') {
          setError('Selected user is not a worker.');
          setNewPayment((prev) => ({
            ...prev,
            workerName: '',
            phone: '',
            location: '',
            role: '',
          }));
          return;
        }
        // Fill fields
        setNewPayment((prev) => ({
          ...prev,
          workerName: user.name,
          phone: user.phone || '',
          location: user.location || '',
          role: user.role,
        }));
      } catch (err) {
        setError(err.response?.data?.message || 'Worker not found');
        setNewPayment((prev) => ({
          ...prev,
          workerName: '',
          phone: '',
          location: '',
          role: '',
        }));
      }
    }
  };

  // 3) Add payment
  const handleAddPayment = async () => {
    const { workerId, workerName, phone, location, role, amount, paymentDate, notes } = newPayment;
    if (!workerId || !workerName || !phone || !location || role !== 'worker') {
      setError('Please enter a valid Worker ID (must be a worker).');
      return;
    }
    if (!amount || !paymentDate || !notes) {
      setError('Please fill in Amount, Payment Date, and Notes.');
      return;
    }
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Amount must be a positive number.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/payments', {
        worker_id: workerId,
        worker_name: workerName,
        amount: parsedAmount,
        payment_date: paymentDate,
        status: 'Pending',
        notes,
      });
      fetchPayments();
      // Reset form
      setNewPayment({
        workerId: '',
        workerName: '',
        phone: '',
        location: '',
        role: '',
        amount: '',
        paymentDate: '',
        notes: '',
      });
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add payment');
    }
  };

  // 4) Mark Payment as Paid
  const handleMarkAsPaid = async (paymentId) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      await axios.put(`http://localhost:5000/api/payments/${paymentId}/pay`, null, {
        params: { date: today },
      });
      fetchPayments();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to mark as paid');
    }
  };

  // 5) Delete Payment
  const handleDeletePayment = async (paymentId) => {
    try {
      await axios.delete(`http://localhost:5000/api/payments/${paymentId}`);
      setPayments(payments.filter((p) => p.id !== paymentId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete payment');
    }
  };

  // 6) Filter
  const filteredPayments = payments.filter((p) =>
    p.worker_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard">
      <Sidebar
        activePage="payment"
        onLogout={onLogout}
        userRole={userRole}
        userName={userName}
      />
      <div className="content">
        <h1>Payments</h1>
        {error && <p className="error">{error}</p>}

        {/* Search bar */}
        <div className="form-container">
          <input
            type="text"
            placeholder="Search by Worker ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Payment form */}
        <div className="form-container">
          <input
            type="text"
            placeholder="Worker ID"
            value={newPayment.workerId}
            onChange={handleWorkerIdChange}
            className="form-input"
          />
          <input
            type="text"
            placeholder="Worker Name"
            value={newPayment.workerName}
            readOnly
            className="form-input"
          />
          <input
            type="text"
            placeholder="Phone"
            value={newPayment.phone}
            readOnly
            className="form-input"
          />
          <input
            type="text"
            placeholder="Location"
            value={newPayment.location}
            readOnly
            className="form-input"
          />
          <input
            type="date"
            value={newPayment.paymentDate}
            onChange={(e) =>
              setNewPayment({ ...newPayment, paymentDate: e.target.value })
            }
            className="form-input"
          />
          <input
            type="text"
            placeholder="Notes"
            value={newPayment.notes}
            onChange={(e) => setNewPayment({ ...newPayment, notes: e.target.value })}
            className="form-input"
          />
          <input
            type="number"
            placeholder="Amount"
            value={newPayment.amount}
            onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
            className="form-input"
          />
          <button onClick={handleAddPayment} className="download-report-btn">
            Add Payment
          </button>
        </div>

        {/* Payment table */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                {/* Removed the ID column entirely. Start with Worker ID */}
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
              {filteredPayments.map((p) => (
                <tr key={p.id}>
                  <td>{p.worker_id}</td>
                  <td>{p.worker_name}</td>
                  <td>
                    $
                    {p.amount.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td>{p.payment_date}</td>
                  <td>{p.status}</td>
                  <td>{p.notes}</td>
                  <td>
                    {p.status === 'Pending' && (
                      <button
                        onClick={() => handleMarkAsPaid(p.id)}
                        className="mark-paid-btn"
                      >
                        Mark as Paid
                      </button>
                    )}
                    <button
                      onClick={() => handleDeletePayment(p.id)}
                      className="delete-btn"
                      style={{ marginLeft: '5px' }}
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
