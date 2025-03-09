import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./css/general.css";

const PaymentPage = ({ onLogout, userRole }) => {
  const [payments, setPayments] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newPayment, setNewPayment] = useState({
    workerId: "",
    amount: "",
    notes: "",
    workerName: "", // To display the name dynamically
  });
  const [loading, setLoading] = useState(true);

  const user = { name: "Mohamed Mhagne", avatar: "/images/sami.png" };

  // Fetch workers and payments
  const fetchWorkers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/workers/");
      const filteredWorkers = response.data.filter((w) => w.role === "worker");
      setWorkers(filteredWorkers);
    } catch (err) {
      console.error("Error fetching workers:", err);
      alert("Failed to fetch workers");
    }
  };

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/payments/");
      console.log("FETCHED PAYMENTS RESPONSE:", response.data);
      setPayments(response.data);
    } catch (err) {
      console.error("Error fetching payments:", err);
      alert("Failed to fetch payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
    fetchPayments();
  }, []);

  // Update worker name when workerId changes
  const handleWorkerIdChange = (e) => {
    const workerId = e.target.value;
    const worker = workers.find((w) => w.numeric_id === workerId);
    setNewPayment({
      ...newPayment,
      workerId,
      workerName: worker ? worker.name : "",
    });
  };

  // Handle adding a new payment
  const handleAddPayment = async () => {
    const { workerId, amount, notes } = newPayment;
    if (!workerId || !amount) {
      alert("Please fill in the required fields (Worker ID and Amount) to add a payment.");
      return;
    }
    if (isNaN(amount) || parseFloat(amount) <= 0) {
      alert("Amount must be a valid number greater than 0.");
      return;
    }
    const worker = workers.find((w) => w.numeric_id === workerId);
    if (!worker) {
      alert("Invalid Worker ID. Worker not found.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/payments/", {
        workerId,
        amount: parseFloat(amount),
        notes,
      });
      alert(response.data.message || "Payment added successfully!");
      fetchPayments();
      setNewPayment({ workerId: "", amount: "", notes: "", workerName: "" });
    } catch (error) {
      alert(error.response?.data?.error || "Error adding payment");
      console.error("Error adding payment:", error.response?.data || error.message);
    }
  };

  // Handle marking payment as paid
  const handleMarkAsPaid = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/payments/${id}`, {
        status: "Paid",
      });
      alert(response.data.message || "Payment marked as paid!");
      fetchPayments();
    } catch (error) {
      alert(error.response?.data?.error || "Error marking payment as paid");
      console.error("Error marking payment as paid:", error.response?.data || error.message);
    }
  };

  // Handle deleting a payment
  const handleDeletePayment = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/payments/${id}`);
      alert(response.data.message || "Payment deleted successfully!");
      fetchPayments();
    } catch (error) {
      alert(error.response?.data?.error || "Error deleting payment");
      console.error("Error deleting payment:", error.response?.data || error.message);
    }
  };

  // Filter payments by Worker ID
  const filteredPayments = payments.filter((payment) =>
    payment.workerId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard">
      <Sidebar
        user={user}
        activePage="payment"
        onLogout={onLogout}
        userRole={userRole}
      />
      <div className="content">
        <h1>Payments</h1>

        {/* Search Box (now by Worker ID) */}
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search by Worker ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "10px",
              width: "300px",
              borderRadius: "5px",
              border: "1px solid #e0e0e0",
              fontSize: "1rem",
            }}
          />
        </div>

        {/* Add Payment Form */}
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Worker ID"
            value={newPayment.workerId}
            onChange={handleWorkerIdChange}
            style={{
              padding: "10px",
              marginRight: "10px",
              borderRadius: "5px",
              border: "1px solid #e0e0e0",
            }}
          />
          <input
            type="text"
            placeholder="Worker Name (auto-filled)"
            value={newPayment.workerName}
            readOnly
            style={{
              padding: "10px",
              marginRight: "10px",
              borderRadius: "5px",
              border: "1px solid #e0e0e0",
              backgroundColor: "#f0f0f0",
            }}
          />
          <input
            type="number"
            placeholder="Amount"
            value={newPayment.amount}
            onChange={(e) =>
              setNewPayment({ ...newPayment, amount: e.target.value })
            }
            style={{
              padding: "10px",
              marginRight: "10px",
              borderRadius: "5px",
              border: "1px solid #e0e0e0",
            }}
          />
          <input
            type="text"
            placeholder="Notes (optional)"
            value={newPayment.notes}
            onChange={(e) =>
              setNewPayment({ ...newPayment, notes: e.target.value })
            }
            style={{
              padding: "10px",
              marginRight: "10px",
              borderRadius: "5px",
              border: "1px solid #e0e0e0",
            }}
          />
          <button
            onClick={handleAddPayment}
            className="download-report-btn"
            style={{ padding: "10px 20px", height: "40px", width: "200px", margin: "5px" }}
            disabled={loading}
          >
            Add Payment
          </button>
        </div>

        {/* Payments Table */}
        <div className="table-container">
          {loading ? (
            <p>Loading payments...</p>
          ) : (
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
                {filteredPayments.length > 0 ? (
                  filteredPayments.map((payment) => (
                    <tr key={payment.id}>
                      <td>{payment.id}</td>
                      <td>{payment.workerId}</td> {/* Added Worker ID */}
                      <td>{payment.workerName}</td>
                      <td>${payment.amount.toFixed(2)}</td>
                      <td>{payment.paymentDate || "N/A"}</td>
                      <td>{payment.status}</td>
                      <td>{payment.notes || "-"}</td>
                      <td>
                        {payment.status === "Pending" && (
                          <button
                            onClick={() => handleMarkAsPaid(payment.id)}
                            style={{
                              padding: "5px 10px",
                              backgroundColor: "#4caf50",
                              color: "white",
                              border: "none",
                              borderRadius: "5px",
                              cursor: "pointer",
                              marginRight: "5px",
                            }}
                          >
                            Mark as Paid
                          </button>
                        )}
                        <button
                          onClick={() => handleDeletePayment(payment.id)}
                          style={{
                            padding: "5px 10px",
                            backgroundColor: "#ff4d4f",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">No payments found</td> {/* Updated colSpan to 8 */}
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;