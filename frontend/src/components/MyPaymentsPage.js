import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

const MyPaymentsPage = ({ onLogout, userRole, user }) => {
  const [payments, setPayments] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch(`http://localhost:5005/local/getMyPayments/${user.identity}`);
        const data = await response.json();
        console.log('Response from getMyPayments:', data);
        if (data.status === 'success') {
          console.log('Fetched payments:', data.payments);
          setPayments(data.payments || []);
        } else {
          alert('Failed to fetch payments: ' + data.message);
        }
      } catch (error) {
        alert('Error fetching payments: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPayments();
  }, [user.identity]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard">
      <button className="sidebar-toggle" onClick={toggleSidebar} aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}>
        {isSidebarOpen ? '✖' : '☰'}
      </button>
      <Sidebar user={user} activePage="my-payments" onLogout={onLogout} userRole={userRole} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="content">
        <h1>My Payments</h1>
        {isLoading ? (
          <p>Loading Mypayments...</p>
        ) : payments.length === 0 ? (
          <p>No payments found.</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Payment ID</th>
                  <th>Amount</th>
                  <th>Payment Date</th>
                  <th>Status</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.payment_id}>
                    <td data-label="Payment ID">{payment.payment_id}</td>
                    <td data-label="Amount">${payment.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td data-label="Payment Date">{payment.payment_date}</td>
                    <td data-label="Status">{payment.status}</td>
                    <td data-label="Notes">{payment.notes}</td>
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

export default MyPaymentsPage;