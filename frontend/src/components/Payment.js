<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "./css/payment.css";

const PaymentPage = ({ onLogout, userRole, user }) => {
  const [payments, setPayments] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newPayment, setNewPayment] = useState({
    worker_id: "",
    amount: "",
    payment_date: "",
    notes: "",
=======
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
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

<<<<<<< HEAD
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch workers
        const workersResponse = await fetch(
          "http://localhost:5005/local/getEmployees"
        );
        const workersData = await workersResponse.json();
        console.log("Response from getEmployees:", workersData);
        if (workersData.status === "success") {
          setWorkers(workersData.employees || []);
        } else {
          alert("Failed to fetch workers: " + workersData.message);
        }

        // Fetch payments
        const paymentsResponse = await fetch(
          "http://localhost:5005/local/getPayments"
        );
        const paymentsData = await paymentsResponse.json();
        console.log("Response from getPayments:", paymentsData);
        if (paymentsData.status === "success") {
          setPayments(paymentsData.payments || []);
        } else {
          alert("Failed to fetch payments: " + paymentsData.message);
        }
      } catch (error) {
        alert("Error fetching data: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredPayments = payments.filter((payment) =>
    payment.worker_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPayment = async () => {
    if (
      !newPayment.worker_id ||
      !newPayment.amount ||
      !newPayment.payment_date ||
      !newPayment.notes
    ) {
      alert(
        "Please fill in all fields (Worker ID, Amount, Payment Date, and Notes)."
      );
      return;
    }

    const amount = parseFloat(newPayment.amount);
    if (isNaN(amount) || amount <= 0) {
      alert("Amount must be a positive number.");
      return;
    }

    const worker = workers.find((w) => w.identity === newPayment.worker_id); // Assuming identity is the key
    if (!worker) {
      alert("Worker ID not found. Please enter a valid Worker ID.");
      return;
    }

    const paymentPayload = {
      worker_id: newPayment.worker_id,
      worker_name: worker.name || "",
      amount: amount,
      payment_date: newPayment.payment_date,
      notes: newPayment.notes,
    };

    try {
      const response = await fetch("http://localhost:5005/local/addPayment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentPayload),
      });
      const data = await response.json();
      console.log("Response from addPayment:", data);
      if (data.status === "success") {
        setPayments([...payments, data.payment[0]]); // Adjust for list return
        setNewPayment({
          worker_id: "",
          amount: "",
          payment_date: "",
          notes: "",
        });
        alert("Payment added successfully");
      } else {
        alert("Failed to add payment: " + data.message);
      }
    } catch (error) {
      alert("Error adding payment: " + error.message);
    }
  };

  const handleMarkAsPaid = async (payment_id) => {
    const currentDate = new Date().toISOString().split("T")[0];
    const payment = payments.find((p) => p.payment_id === payment_id);
    if (!payment) return;

    const updatePayload = {
      status: "Paid",
      payment_date: currentDate,
    };

    try {
      const response = await fetch(
        `http://localhost:5005/local/updatePayment/${payment_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatePayload),
        }
      );
      const data = await response.json();
      if (data.status === "success") {
        setPayments(
          payments.map((p) =>
            p.payment_id === payment_id ? { ...p, ...data.payment[0] } : p
          )
        );
        alert("Payment marked as paid");
      } else {
        alert("Failed to update payment: " + data.message);
      }
    } catch (error) {
      alert("Error marking as paid: " + error.message);
    }
  };

  const handleDeletePayment = async (payment_id) => {
    if (!confirm(`Delete payment ${payment_id}?`)) return;
    try {
      const response = await fetch(
        `http://localhost:5005/local/deletePayment/${payment_id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (data.status === "success") {
        setPayments(payments.filter((p) => p.payment_id !== payment_id));
        alert("Payment deleted successfully");
      } else {
        alert("Failed to delete payment: " + data.message);
      }
    } catch (error) {
      alert("Error deleting payment: " + error.message);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (userRole !== "manager") {
=======
  // Manager only
  if (userRole !== 'manager') {
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
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
<<<<<<< HEAD
      <button
        className="sidebar-toggle"
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isSidebarOpen ? "✖" : "☰"}
      </button>
      <Sidebar
        user={user}
        activePage="payment"
        onLogout={onLogout}
        userRole={userRole}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div className="content">
        <h1>Payments</h1>

        <div className="search-container">
=======
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
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
          <input
            type="text"
            placeholder="Search by Worker ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
<<<<<<< HEAD
        <div className="form-container">
          <input
            type="text"
            name="workerId"
            placeholder="Worker ID"
            value={newPayment.worker_id}
            onChange={(e) =>
              setNewPayment({ ...newPayment, worker_id: e.target.value })
            }
            className="form-input"
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={newPayment.amount}
            onChange={(e) =>
              setNewPayment({ ...newPayment, amount: e.target.value })
            }
            className="form-input"
          />
          <input
            type="date"
            name="paymentDate"
            placeholder="Payment Date"
            value={newPayment.payment_date}
            onChange={(e) =>
              setNewPayment({ ...newPayment, payment_date: e.target.value })
            }
            className="form-input"
          />
=======

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
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
          <input
            type="text"
            placeholder="Notes"
            value={newPayment.notes}
            onChange={(e) =>
              setNewPayment({ ...newPayment, notes: e.target.value })
            }
            className="form-input"
          />
<<<<<<< HEAD
          <button onClick={handleAddPayment} className="btn">
=======
          <input
            type="number"
            placeholder="Amount"
            value={newPayment.amount}
            onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
            className="form-input"
          />
          <button onClick={handleAddPayment} className="download-report-btn">
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
            Add Payment
          </button>
        </div>

<<<<<<< HEAD
        {isLoading ? (
          <p>Loading payments...</p>
        ) : payments.length === 0 ? (
          <p>No payments found. you can add payments for employees</p>
        ) : (
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
=======
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
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.payment_id}>
                    <td data-label="Payment ID">{payment.payment_id}</td>
                    <td data-label="Worker ID">{payment.worker_id}</td>
                    <td data-label="Worker Name">{payment.worker_name}</td>
                    <td data-label="Amount">
                      $
                      {payment.amount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td data-label="Payment Date">{payment.payment_date}</td>
                    <td data-label="Status">{payment.status}</td>
                    <td data-label="Notes">{payment.notes}</td>
                    <td data-label="Actions">
                      {payment.status === "Pending" && (
                        <button
                          onClick={() => handleMarkAsPaid(payment.payment_id)}
                          className="mark-paid-btn"
                        >
                          Mark as Paid
                        </button>
                      )}
                      <button
                        onClick={() => handleDeletePayment(payment.payment_id)}
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
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
