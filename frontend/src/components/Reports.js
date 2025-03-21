<<<<<<< HEAD
import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import Sidebar from './Sidebar';
import './css/reset.css';
import './css/layout.css';
import './css/components.css';
import './css/themes.css';
import './css/responsive.css';

const ReportsPage = ({ onLogout, userRole }) => {
  const mockReports = [
    { id: 'bin_10', status: 'Full', capacity: 90, location: 'nazareth, 4 088', lastCollected: '18-1-2025' },
    { id: 'bin_11', status: 'Near Full', capacity: 55, location: 'nazareth, anis kardosh 26', lastCollected: '14-1-2025' },
    { id: 'bin_12', status: 'Full', capacity: 95, location: 'nazareth, 2 6057', lastCollected: '16-1-2025' },
    { id: 'bin_13', status: 'Not Full', capacity: 12, location: 'nazareth, 4 6030', lastCollected: '15-1-2025' },
    { id: 'bin_14', status: 'Not Full', capacity: 15, location: 'nazareth, 8 6116', lastCollected: '15-1-2025' },
  ];

  const [reports, setReports] = useState(mockReports);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
=======
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { saveAs } from "file-saver";
import React, { useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import { v4 as uuidv4 } from "uuid";
import "./css/general.css";
import Sidebar from "./Sidebar";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ReportsPage = ({ onLogout, userRole }) => {
  if (userRole !== "manager") {
    return <div className="error">Access Denied: Managers Only</div>;
  }

  // Mock Data
  const initialBinData = [
    { binId: uuidv4().slice(0, 10), capacity: 85, location: "Nazareth", lastCollected: "2025-03-15" },
    { binId: uuidv4().slice(0, 10), capacity: 30, location: "Nazareth", lastCollected: "2025-03-01" },
    { binId: uuidv4().slice(0, 10), capacity: 100, location: "Nazareth", lastCollected: "2025-03-10" },
  ];
  const initialWorkersData = [
    { workerId: "207705096", name: "Worker A", phone: "050-123-4567", startDate: "2025-01-01", shift: "08:00 - 16:00" },
    { workerId: "205548491", name: "Worker B", phone: "052-987-6543", startDate: "2025-02-15", shift: "09:00 - 17:00" },
  ];
  const initialVehiclesData = [
    { licensePlate: "ABC-123", type: "Garbage Truck", status: "Available", lastMaintenance: "2025-01-10" },
    { licensePlate: "XYZ-999", type: "Van", status: "In Use", lastMaintenance: "2025-02-05" },
  ];
  const initialHardwareData = [
    { hardwareId: uuidv4().slice(0, 10), binId: uuidv4().slice(0, 10), status: "Operational", battery: 95, lastChecked: "2025-03-01" },
    { hardwareId: uuidv4().slice(0, 10), binId: uuidv4().slice(0, 10), status: "Needs Maintenance", battery: 20, lastChecked: "2025-03-02" },
  ];

  // State
  const [binData] = useState(initialBinData);
  const [workersData] = useState(initialWorkersData);
  const [vehiclesData] = useState(initialVehiclesData);
  const [hardwareData] = useState(initialHardwareData);
  const [binSearch, setBinSearch] = useState("");
  const [workerSearch, setWorkerSearch] = useState("");
  const [vehicleSearch, setVehicleSearch] = useState("");
  const [hardwareSearch, setHardwareSearch] = useState("");
<<<<<<< HEAD
  const [selectedReport, setSelectedReport] = useState("");
=======
<<<<<<< HEAD
  const [selectedReport, setSelectedReport] = useState("");
=======
  const [showBins, setShowBins] = useState(false);
  const [showWorkers, setShowWorkers] = useState(false);
  const [showVehicles, setShowVehicles] = useState(false);
  const [showHardware, setShowHardware] = useState(false);
>>>>>>> main
>>>>>>> b2f3d5bc5597dbb573dfb63294948d845e2b560c
>>>>>>> 46c39febec1d91ced1444da4bfa6d8b95387220d

  const binChartRef = useRef(null);
  const workerChartRef = useRef(null);
  const vehicleChartRef = useRef(null);
  const hardwareChartRef = useRef(null);

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 46c39febec1d91ced1444da4bfa6d8b95387220d
  // Filter Data with Exact Match Preference
  const filteredBins = binSearch
    ? binData.filter(b => b.binId.toLowerCase() === binSearch.toLowerCase()).length > 0
      ? binData.filter(b => b.binId.toLowerCase() === binSearch.toLowerCase())
      : binData.filter(b => Object.values(b).some(field => field.toString().toLowerCase().includes(binSearch.toLowerCase())))
    : binData;
  const filteredWorkers = workerSearch
    ? workersData.filter(w => w.workerId.toLowerCase() === workerSearch.toLowerCase()).length > 0
      ? workersData.filter(w => w.workerId.toLowerCase() === workerSearch.toLowerCase())
      : workersData.filter(w => Object.values(w).some(field => field.toString().toLowerCase().includes(workerSearch.toLowerCase())))
    : workersData;
  const filteredVehicles = vehicleSearch
    ? vehiclesData.filter(v => v.licensePlate.toLowerCase() === vehicleSearch.toLowerCase()).length > 0
      ? vehiclesData.filter(v => v.licensePlate.toLowerCase() === vehicleSearch.toLowerCase())
      : vehiclesData.filter(v => Object.values(v).some(field => field.toString().toLowerCase().includes(vehicleSearch.toLowerCase())))
    : vehiclesData;
  const filteredHardware = hardwareSearch
    ? hardwareData.filter(h => h.hardwareId.toLowerCase() === hardwareSearch.toLowerCase()).length > 0
      ? hardwareData.filter(h => h.hardwareId.toLowerCase() === hardwareSearch.toLowerCase())
      : hardwareData.filter(h => Object.values(h).some(field => field.toString().toLowerCase().includes(hardwareSearch.toLowerCase())))
    : hardwareData;
<<<<<<< HEAD
=======
=======
<<<<<<< HEAD
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Full':
        return <FaTrash className="status-icon full" />;
      case 'Near Full':
        return <FaTrash className="status-icon near-full" />;
      case 'Not Full':
        return <FaTrash className="status-icon not-full" />;
      default:
        return null;
    }
=======
  // Filter Data
  const filteredBins = binData.filter((b) =>
    [b.binId, b.location, b.lastCollected].some((field) => field.toLowerCase().includes(binSearch.toLowerCase()))
  );
  const filteredWorkers = workersData.filter((w) =>
    [w.workerId, w.name, w.phone, w.shift].some((field) => field.toLowerCase().includes(workerSearch.toLowerCase()))
  );
  const filteredVehicles = vehiclesData.filter((v) =>
    [v.licensePlate, v.type, v.status].some((field) => field.toLowerCase().includes(vehicleSearch.toLowerCase()))
  );
  const filteredHardware = hardwareData.filter((h) =>
    [h.hardwareId, h.binId, h.status, h.lastChecked].some((field) => field.toLowerCase().includes(hardwareSearch.toLowerCase()))
  );
>>>>>>> b2f3d5bc5597dbb573dfb63294948d845e2b560c
>>>>>>> 46c39febec1d91ced1444da4bfa6d8b95387220d

  // Download CSV Function
  const downloadCsv = (headers, rows, filename) => {
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, filename);
>>>>>>> main
  };

  // Bar Chart Data & Options
  const binsChartData = {
    labels: filteredBins.map(b => b.binId),
    datasets: [{ label: "Bin Capacity", data: filteredBins.map(b => b.capacity), backgroundColor: "#3498db" }],
  };
  const binsChartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow custom sizing
    scales: { y: { beginAtZero: true, max: 100 } },
    plugins: {
      legend: { position: "top" },
    },
    onClick: (evt, elements) => {
      if (!elements || elements.length === 0) return;
      const index = elements[0].index;
      const clicked = filteredBins[index];
      const headers = ["BinID", "Capacity", "Location", "LastCollected"];
      const row = [clicked.binId, clicked.capacity, clicked.location, clicked.lastCollected];
      downloadCsv(headers, [row], `Bin_${clicked.binId}.csv`);
    },
  };

  const workersChartData = {
    labels: filteredWorkers.map(w => w.workerId),
    datasets: [{
      label: "Days Since Start",
      data: filteredWorkers.map(w => Math.floor((new Date("2025-04-01") - new Date(w.startDate)) / (1000 * 3600 * 24))),
      backgroundColor: "#2ecc71",
    }],
  };
  const workersChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { y: { beginAtZero: true } },
    plugins: {
      legend: { position: "top" },
    },
    onClick: (evt, elements) => {
      if (!elements || elements.length === 0) return;
      const index = elements[0].index;
      const clicked = filteredWorkers[index];
      const headers = ["WorkerID", "Name", "Phone", "StartDate", "Shift"];
      const row = [clicked.workerId, clicked.name, clicked.phone, clicked.startDate, clicked.shift];
      downloadCsv(headers, [row], `Worker_${clicked.workerId}.csv`);
    },
  };

  const vehiclesChartData = {
    labels: filteredVehicles.map(v => v.licensePlate),
    datasets: [{
      label: "Days Since Maintenance",
      data: filteredVehicles.map(v => Math.floor((new Date("2025-04-01") - new Date(v.lastMaintenance)) / (1000 * 3600 * 24))),
      backgroundColor: "#9b59b6",
    }],
  };
  const vehiclesChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { y: { beginAtZero: true } },
    plugins: {
      legend: { position: "top" },
    },
    onClick: (evt, elements) => {
      if (!elements || elements.length === 0) return;
      const index = elements[0].index;
      const clicked = filteredVehicles[index];
      const headers = ["LicensePlate", "Type", "Status", "LastMaintenance"];
      const row = [clicked.licensePlate, clicked.type, clicked.status, clicked.lastMaintenance];
      downloadCsv(headers, [row], `Vehicle_${clicked.licensePlate}.csv`);
    },
  };

  const hardwareChartData = {
    labels: filteredHardware.map(h => h.hardwareId),
    datasets: [{ label: "Battery (%)", data: filteredHardware.map(h => h.battery), backgroundColor: "#e67e22" }],
  };
  const hardwareChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { y: { beginAtZero: true, max: 100 } },
    plugins: {
      legend: { position: "top" },
    },
    onClick: (evt, elements) => {
      if (!elements || elements.length === 0) return;
      const index = elements[0].index;
      const clicked = filteredHardware[index];
      const headers = ["HardwareID", "BinID", "Status", "Battery", "LastChecked"];
      const row = [clicked.hardwareId, clicked.binId, clicked.status, clicked.battery, clicked.lastChecked];
      downloadCsv(headers, [row], `Hardware_${clicked.hardwareId}.csv`);
    },
  };

  // UI Rendering
  return (
    <div className="dashboard">
<<<<<<< HEAD
      <Sidebar user={user} activePage="reports" onLogout={onLogout} userRole={userRole} />
      <div className="content">
        <div className="table-container reports-table">
          <table>
            <thead>
              <tr>
                <th>ID_bin</th>
                <th>Status</th>
                <th>Capacity</th>
                <th>Location</th>
                <th>Last Collected</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td>{report.id}</td>
                  <td>
                    {getStatusIcon(report.status)}
                    {report.status}
                  </td>
                  <td>{report.capacity}%</td>
                  <td>{report.location}</td>
                  <td>{report.lastCollected}</td>
                </tr>
              ))}
            </tbody>
          </table>
=======
      <Sidebar user={{ name: "Mohamed Mhagne", avatar: "/images/sami.png" }} activePage="reports" onLogout={onLogout} userRole={userRole} />
      <div className="content">
        <h1>Reports</h1>
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 46c39febec1d91ced1444da4bfa6d8b95387220d
        <div className="dropdown-container">
          <select
            value={selectedReport}
            onChange={(e) => setSelectedReport(e.target.value)}
            className="report-select"
          >
            <option value="">Select a Report</option>
            <option value="bins">Bin Reports</option>
            <option value="workers">Workers Reports</option>
            <option value="vehicles">Vehicles Reports</option>
            <option value="hardware">Hardware Reports</option>
          </select>
<<<<<<< HEAD
=======
=======
        <div className="button-container">
          <button className="download-report-btn" onClick={() => setShowBins(!showBins)}>
            {showBins ? "Hide Bin Reports" : "Show Bin Reports"}
          </button>
          <button className="download-report-btn" onClick={() => setShowWorkers(!showWorkers)}>
            {showWorkers ? "Hide Workers Reports" : "Show Workers Reports"}
          </button>
          <button className="download-report-btn" onClick={() => setShowVehicles(!showVehicles)}>
            {showVehicles ? "Hide Vehicles Reports" : "Show Vehicles Reports"}
          </button>
          <button className="download-report-btn" onClick={() => setShowHardware(!showHardware)}>
            {showHardware ? "Hide Hardware Reports" : "Show Hardware Reports"}
          </button>
>>>>>>> main
>>>>>>> b2f3d5bc5597dbb573dfb63294948d845e2b560c
>>>>>>> 46c39febec1d91ced1444da4bfa6d8b95387220d
        </div>

        {/* Conditional Rendering Based on Dropdown Selection */}
        {selectedReport === "bins" && (
          <div className="report-section">
            <h2>Bin Reports</h2>
            <div className="form-container">
              <input
                type="text"
                placeholder="Search bins by Bin ID..."
                value={binSearch}
                onChange={(e) => setBinSearch(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="table-container">
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Bin ID</th>
                    <th>Capacity (%)</th>
                    <th>Location</th>
                    <th>Last Collected</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBins.map(bin => (
                    <tr key={bin.binId}>
                      <td>{bin.binId}</td>
                      <td>{bin.capacity}%</td>
                      <td>{bin.location}</td>
                      <td>{bin.lastCollected}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="chart-container">
              <Bar ref={binChartRef} data={binsChartData} options={binsChartOptions} />
            </div>
            <button
              className="download-report-btn"
              onClick={() => {
                const headers = ["BinID", "Capacity", "Location", "LastCollected"];
                const rows = filteredBins.map(b => [b.binId, b.capacity, b.location, b.lastCollected]);
                downloadCsv(headers, rows, "AllFilteredBins.csv");
              }}
            >
              Download All Filtered Bins
            </button>
          </div>
        )}

        {selectedReport === "workers" && (
          <div className="report-section">
            <h2>Workers Reports</h2>
            <div className="form-container">
              <input
                type="text"
                placeholder="Search workers by Worker ID..."
                value={workerSearch}
                onChange={(e) => setWorkerSearch(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="table-container">
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Worker ID</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Start Date</th>
                    <th>Shift</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWorkers.map(w => (
                    <tr key={w.workerId}>
                      <td>{w.workerId}</td>
                      <td>{w.name}</td>
                      <td>{w.phone}</td>
                      <td>{w.startDate}</td>
                      <td>{w.shift}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="chart-container">
              <Bar ref={workerChartRef} data={workersChartData} options={workersChartOptions} />
            </div>
            <button
              className="download-report-btn"
              onClick={() => {
                const headers = ["WorkerID", "Name", "Phone", "StartDate", "Shift"];
                const rows = filteredWorkers.map(w => [w.workerId, w.name, w.phone, w.startDate, w.shift]);
                downloadCsv(headers, rows, "AllFilteredWorkers.csv");
              }}
            >
              Download All Filtered Workers
            </button>
          </div>
        )}

        {selectedReport === "vehicles" && (
          <div className="report-section">
            <h2>Vehicles Reports</h2>
            <div className="form-container">
              <input
                type="text"
                placeholder="Search vehicles by License Plate..."
                value={vehicleSearch}
                onChange={(e) => setVehicleSearch(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="table-container">
              <table className="report-table">
                <thead>
                  <tr>
                    <th>License Plate</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Last Maintenance</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVehicles.map(v => (
                    <tr key={v.licensePlate}>
                      <td>{v.licensePlate}</td>
                      <td>{v.type}</td>
                      <td>{v.status}</td>
                      <td>{v.lastMaintenance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="chart-container">
              <Bar ref={vehicleChartRef} data={vehiclesChartData} options={vehiclesChartOptions} />
            </div>
            <button
              className="download-report-btn"
              onClick={() => {
                const headers = ["LicensePlate", "Type", "Status", "LastMaintenance"];
                const rows = filteredVehicles.map(v => [v.licensePlate, v.type, v.status, v.lastMaintenance]);
                downloadCsv(headers, rows, "AllFilteredVehicles.csv");
              }}
            >
              Download All Filtered Vehicles
            </button>
          </div>
        )}

        {selectedReport === "hardware" && (
          <div className="report-section">
            <h2>Hardware Reports</h2>
            <div className="form-container">
              <input
                type="text"
                placeholder="Search hardware by Hardware ID..."
                value={hardwareSearch}
                onChange={(e) => setHardwareSearch(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="table-container">
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Hardware ID</th>
                    <th>Bin ID</th>
                    <th>Status</th>
                    <th>Battery (%)</th>
                    <th>Last Checked</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHardware.map(h => (
                    <tr key={h.hardwareId}>
                      <td>{h.hardwareId}</td>
                      <td>{h.binId}</td>
                      <td>{h.status}</td>
                      <td>{h.battery}%</td>
                      <td>{h.lastChecked}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="chart-container">
              <Bar ref={hardwareChartRef} data={hardwareChartData} options={hardwareChartOptions} />
            </div>
            <button
              className="download-report-btn"
              onClick={() => {
                const headers = ["HardwareID", "BinID", "Status", "Battery", "LastChecked"];
                const rows = filteredHardware.map(h => [h.hardwareId, h.binId, h.status, h.battery, h.lastChecked]);
                downloadCsv(headers, rows, "AllFilteredHardware.csv");
              }}
            >
              Download All Filtered Hardware
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;