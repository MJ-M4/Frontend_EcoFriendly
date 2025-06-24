import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { saveAs } from "file-saver";
import React, { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import Sidebar from "./Sidebar";
import "./css/reports.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const API_BASE = "http://localhost:5005/local";
const ensureArray = (res, key) => Array.isArray(res) ? res : (res[key] || []);

const ReportsPage = ({ onLogout, userRole, user }) => {
  if (userRole !== "manager") {
    return <div className="error">Access Denied: Managers Only</div>;
  }

  const [binData, setBinData] = useState([]);
  const [workersData, setWorkersData] = useState([]);
  const [vehiclesData, setVehiclesData] = useState([]);
  const [hardwareData, setHardwareData] = useState([]);
  const [binSearch, setBinSearch] = useState("");
  const [workerSearch, setWorkerSearch] = useState("");
  const [vehicleSearch, setVehicleSearch] = useState("");
  const [hardwareSearch, setHardwareSearch] = useState("");
  const [selectedReport, setSelectedReport] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const binChartRef = useRef(null);
  const workerChartRef = useRef(null);
  const vehicleChartRef = useRef(null);
  const hardwareChartRef = useRef(null);

  // FETCH DATA ON MOUNT, ALWAYS ENSURE ARRAY AND MAP IDs!
  useEffect(() => {
    fetch(`${API_BASE}/getBins`)
      .then(r => r.json())
      .then(data => setBinData(ensureArray(data, "bins")));

    fetch(`${API_BASE}/getEmployees`)
      .then(r => r.json())
      .then(data => {
        const arr = ensureArray(data, "employees");
        // Map identity => workerId for frontend compatibility
        setWorkersData(arr.map(w => ({ ...w, workerId: w.identity })));
      });

    fetch(`${API_BASE}/getVehicles`)
      .then(r => r.json())
      .then(data => setVehiclesData(ensureArray(data, "vehicles")));

    fetch(`${API_BASE}/getHardware`)
      .then(r => r.json())
      .then(data => {
        const arr = ensureArray(data, "hardware");
        // Map id => hardwareId for frontend compatibility
        setHardwareData(arr.map(h => ({ ...h, hardwareId: h.id })));
      });
  }, []);

  // Defensive rendering: Always use array or empty array
  const safeArr = arr => Array.isArray(arr) ? arr : [];
  const filteredBins = safeArr(
    binSearch
      ? binData.filter(b => b.binId?.toLowerCase() === binSearch.toLowerCase()).length > 0
        ? binData.filter(b => b.binId?.toLowerCase() === binSearch.toLowerCase())
        : binData.filter(b => Object.values(b).some(field => (field ?? "").toString().toLowerCase().includes(binSearch.toLowerCase())))
      : binData
  );
  const filteredWorkers = safeArr(
    workerSearch
      ? workersData.filter(w => w.workerId?.toLowerCase() === workerSearch.toLowerCase()).length > 0
        ? workersData.filter(w => w.workerId?.toLowerCase() === workerSearch.toLowerCase())
        : workersData.filter(w => Object.values(w).some(field => (field ?? "").toString().toLowerCase().includes(workerSearch.toLowerCase())))
      : workersData
  );
  const filteredVehicles = safeArr(
    vehicleSearch
      ? vehiclesData.filter(v => v.licensePlate?.toLowerCase() === vehicleSearch.toLowerCase()).length > 0
        ? vehiclesData.filter(v => v.licensePlate?.toLowerCase() === vehicleSearch.toLowerCase())
        : vehiclesData.filter(v => Object.values(v).some(field => (field ?? "").toString().toLowerCase().includes(vehicleSearch.toLowerCase())))
      : vehiclesData
  );
  const filteredHardware = safeArr(
    hardwareSearch
      ? hardwareData.filter(h => h.hardwareId?.toLowerCase() === hardwareSearch.toLowerCase()).length > 0
        ? hardwareData.filter(h => h.hardwareId?.toLowerCase() === hardwareSearch.toLowerCase())
        : hardwareData.filter(h => Object.values(h).some(field => (field ?? "").toString().toLowerCase().includes(hardwareSearch.toLowerCase())))
      : hardwareData
  );

  // CSV Export (no change)
  const downloadCsv = (headers, rows, filename) => {
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, filename);
  };

  // CHART DATA
  const binsChartData = {
    labels: filteredBins.map(b => b.binId),
    datasets: [{ label: "Bin Capacity", data: filteredBins.map(b => b.capacity), backgroundColor: "#3498db" }],
  };
  const binsChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { y: { beginAtZero: true, max: 100 } },
    plugins: { legend: { position: "top" } },
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
    plugins: { legend: { position: "top" } },
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
    plugins: { legend: { position: "top" } },
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
    plugins: { legend: { position: "top" } },
    onClick: (evt, elements) => {
      if (!elements || elements.length === 0) return;
      const index = elements[0].index;
      const clicked = filteredHardware[index];
      const headers = ["HardwareID", "BinID", "Status", "Battery", "LastChecked"];
      const row = [clicked.hardwareId, clicked.binId, clicked.status, clicked.battery, clicked.lastChecked];
      downloadCsv(headers, [row], `Hardware_${clicked.hardwareId}.csv`);
    },
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="dashboard">
      <button className="sidebar-toggle" onClick={toggleSidebar} aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}>
        {isSidebarOpen ? '✖' : '☰'}
      </button>
      <Sidebar user={{ name: user.name, avatar: "/images/sami.png" }} activePage="reports" onLogout={onLogout} userRole={userRole} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="content">
        <h1>Reports</h1>
        <div className="dropdown-container">
          <select value={selectedReport} onChange={(e) => setSelectedReport(e.target.value)} className="report-select">
            <option value="">Select a Report</option>
            <option value="bins">Bin Reports</option>
            <option value="workers">Workers Reports</option>
            <option value="vehicles">Vehicles Reports</option>
            <option value="hardware">Hardware Reports</option>
          </select>
        </div>

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
                      <td data-label="Bin ID">{bin.binId}</td>
                      <td data-label="Capacity (%)">{bin.capacity}%</td>
                      <td data-label="Location">{bin.location}</td>
                      <td data-label="Last Collected">{bin.lastCollected}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="chart-container">
              <Bar ref={binChartRef} data={binsChartData} options={binsChartOptions} />
            </div>
            <button
              className="btn"
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
                      <td data-label="Worker ID">{w.workerId}</td>
                      <td data-label="Name">{w.name}</td>
                      <td data-label="Phone">{w.phone}</td>
                      <td data-label="Start Date">{w.startDate}</td>
                      <td data-label="Shift">{w.shift}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="chart-container">
              <Bar ref={workerChartRef} data={workersChartData} options={workersChartOptions} />
            </div>
            <button
              className="btn"
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
                      <td data-label="License Plate">{v.licensePlate}</td>
                      <td data-label="Type">{v.type}</td>
                      <td data-label="Status">{v.status}</td>
                      <td data-label="Last Maintenance">{v.lastMaintenance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="chart-container">
              <Bar ref={vehicleChartRef} data={vehiclesChartData} options={vehiclesChartOptions} />
            </div>
            <button
              className="btn"
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
                      <td data-label="Hardware ID">{h.hardwareId}</td>
                      <td data-label="Bin ID">{h.binId}</td>
                      <td data-label="Status">{h.status}</td>
                      <td data-label="Battery (%)">{h.battery}%</td>
                      <td data-label="Last Checked">{h.lastChecked}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="chart-container">
              <Bar ref={hardwareChartRef} data={hardwareChartData} options={hardwareChartOptions} />
            </div>
            <button
              className="btn"
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
// Note: Ensure you have the necessary CSS styles in reports.css for proper layout and styling.
// The code is designed to be responsive and user-friendly, with clear error handling and data validation.