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

  // STATES
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

  // FETCH DATA ON MOUNT, MAP FIELDS AS NEEDED
  useEffect(() => {
    fetch(`${API_BASE}/getBins`)
      .then(r => r.json())
      .then(data => setBinData(ensureArray(data, "bins")));

    fetch(`${API_BASE}/getEmployees`)
      .then(r => r.json())
      .then(data => setWorkersData(ensureArray(data, "employees")));

    fetch(`${API_BASE}/getVehicles`)
      .then(r => r.json())
      .then(data => setVehiclesData(ensureArray(data, "vehicles")));

    fetch(`${API_BASE}/getHardware`)
      .then(r => r.json())
      .then(data => setHardwareData(ensureArray(data, "hardware")));
  }, []);

  // FILTERS
  const safeArr = arr => Array.isArray(arr) ? arr : [];

  // BINS
  const filteredBins = safeArr(
    binSearch
      ? binData.filter(b => b.binId?.toLowerCase() === binSearch.toLowerCase()).length > 0
        ? binData.filter(b => b.binId?.toLowerCase() === binSearch.toLowerCase())
        : binData.filter(b => Object.values(b).some(field => (field ?? "").toString().toLowerCase().includes(binSearch.toLowerCase())))
      : binData
  );
  // WORKERS
  const filteredWorkers = safeArr(
    workerSearch
      ? workersData.filter(w => w.identity?.toLowerCase() === workerSearch.toLowerCase()).length > 0
        ? workersData.filter(w => w.identity?.toLowerCase() === workerSearch.toLowerCase())
        : workersData.filter(w => Object.values(w).some(field => (field ?? "").toString().toLowerCase().includes(workerSearch.toLowerCase())))
      : workersData
  );
  // VEHICLES
  const filteredVehicles = safeArr(
    vehicleSearch
      ? vehiclesData.filter(v => v.licensePlate?.toLowerCase() === vehicleSearch.toLowerCase()).length > 0
        ? vehiclesData.filter(v => v.licensePlate?.toLowerCase() === vehicleSearch.toLowerCase())
        : vehiclesData.filter(v => Object.values(v).some(field => (field ?? "").toString().toLowerCase().includes(vehicleSearch.toLowerCase())))
      : vehiclesData
  );
  // HARDWARE
  const filteredHardware = safeArr(
    hardwareSearch
      ? hardwareData.filter(h => h.id?.toLowerCase() === hardwareSearch.toLowerCase()).length > 0
        ? hardwareData.filter(h => h.id?.toLowerCase() === hardwareSearch.toLowerCase())
        : hardwareData.filter(h => Object.values(h).some(field => (field ?? "").toString().toLowerCase().includes(hardwareSearch.toLowerCase())))
      : hardwareData
  );

  // CSV Export
  const downloadCsv = (headers, rows, filename) => {
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, filename);
  };

  // CHARTS
  const binsChartData = {
    labels: filteredBins.map(b => b.binId),
    datasets: [{ label: "Bin Capacity", data: filteredBins.map(b => b.capacity), backgroundColor: "#3498db" }],
  };
  const binsChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { y: { beginAtZero: true } },
    plugins: { legend: { position: "top" } }
  };

  const workersChartData = {
    labels: filteredWorkers.map(w => w.identity),
    datasets: [{
      label: "Days Since Joined",
      data: filteredWorkers.map(w =>
        Math.floor((new Date() - new Date(w.joining_date)) / (1000 * 3600 * 24))
      ),
      backgroundColor: "#2ecc71",
    }],
  };
  const workersChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { y: { beginAtZero: true } },
    plugins: { legend: { position: "top" } }
  };

  const vehiclesChartData = {
    labels: filteredVehicles.map(v => v.licensePlate),
    datasets: [{
      label: "Days Since Maintenance",
      data: filteredVehicles.map(v =>
        Math.floor((new Date() - new Date(v.lastMaintenance)) / (1000 * 3600 * 24))
      ),
      backgroundColor: "#9b59b6",
    }],
  };
  const vehiclesChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { y: { beginAtZero: true } },
    plugins: { legend: { position: "top" } }
  };

  const hardwareChartData = {
    labels: filteredHardware.map(h => h.id),
    datasets: [{ label: "Battery (%)", data: filteredHardware.map(h => h.battery), backgroundColor: "#e67e22" }],
  };
  const hardwareChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { y: { beginAtZero: true, max: 100 } },
    plugins: { legend: { position: "top" } }
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
          <select value={selectedReport} onChange={e => setSelectedReport(e.target.value)} className="report-select">
            <option value="">Select a Report</option>
            <option value="bins">Bin Reports</option>
            <option value="workers">Workers Reports</option>
            <option value="vehicles">Vehicles Reports</option>
            <option value="hardware">Hardware Reports</option>
          </select>
        </div>

        {/* ---- BIN REPORT ---- */}
        {selectedReport === "bins" && (
          <div className="report-section">
            <h2>Bin Reports</h2>
            <div className="form-container">
              <input
                type="text"
                placeholder="Search bins by Bin ID..."
                value={binSearch}
                onChange={e => setBinSearch(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="table-container">
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Bin ID</th>
                    <th>Location</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th>Lat</th>
                    <th>Lon</th>
                    <th>Capacity</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBins.map(bin => (
                    <tr key={bin.binId}>
                      <td>{bin.binId}</td>
                      <td>{bin.location}</td>
                      <td>{bin.address}</td>
                      <td>{bin.status}</td>
                      <td>{bin.lat}</td>
                      <td>{bin.lon}</td>
                      <td>{bin.capacity}</td>
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
                const headers = ["Bin ID", "Location", "Address", "Status", "Lat", "Lon", "Capacity"];
                const rows = filteredBins.map(b => [
                  b.binId, b.location, b.address, b.status, b.lat, b.lon, b.capacity
                ]);
                downloadCsv(headers, rows, "AllFilteredBins.csv");
              }}
            >
              Download All Filtered Bins
            </button>
          </div>
        )}

        {/* ---- WORKERS REPORT ---- */}
        {selectedReport === "workers" && (
          <div className="report-section">
            <h2>Workers Reports</h2>
            <div className="form-container">
              <input
                type="text"
                placeholder="Search workers by ID..."
                value={workerSearch}
                onChange={e => setWorkerSearch(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="table-container">
              <table className="report-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Location</th>
                    <th>Joining Date</th>
                    <th>Role</th>
                    <th>Worker Type</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWorkers.map(w => (
                    <tr key={w.identity}>
                      <td>{w.identity}</td>
                      <td>{w.name}</td>
                      <td>{w.phone}</td>
                      <td>{w.location}</td>
                      <td>{w.joining_date}</td>
                      <td>{w.role}</td>
                      <td>{w.worker_type}</td>
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
                const headers = ["ID", "Name", "Phone", "Location", "Joining Date", "Role", "Worker Type"];
                const rows = filteredWorkers.map(w => [
                  w.identity, w.name, w.phone, w.location, w.joining_date, w.role, w.worker_type
                ]);
                downloadCsv(headers, rows, "AllFilteredWorkers.csv");
              }}
            >
              Download All Filtered Workers
            </button>
          </div>
        )}

        {/* ---- VEHICLES REPORT ---- */}
        {selectedReport === "vehicles" && (
          <div className="report-section">
            <h2>Vehicles Reports</h2>
            <div className="form-container">
              <input
                type="text"
                placeholder="Search vehicles by License Plate..."
                value={vehicleSearch}
                onChange={e => setVehicleSearch(e.target.value)}
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
                    <th>Location</th>
                    <th>Last Maintenance</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVehicles.map(v => (
                    <tr key={v.licensePlate}>
                      <td>{v.licensePlate}</td>
                      <td>{v.type}</td>
                      <td>{v.status}</td>
                      <td>{v.location}</td>
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
              className="btn"
              onClick={() => {
                const headers = ["License Plate", "Type", "Status", "Location", "Last Maintenance"];
                const rows = filteredVehicles.map(v => [
                  v.licensePlate, v.type, v.status, v.location, v.lastMaintenance
                ]);
                downloadCsv(headers, rows, "AllFilteredVehicles.csv");
              }}
            >
              Download All Filtered Vehicles
            </button>
          </div>
        )}

        {/* ---- HARDWARE REPORT ---- */}
        {selectedReport === "hardware" && (
          <div className="report-section">
            <h2>Hardware Reports</h2>
            <div className="form-container">
              <input
                type="text"
                placeholder="Search hardware by ID..."
                value={hardwareSearch}
                onChange={e => setHardwareSearch(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="table-container">
              <table className="report-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Bin ID</th>
                    <th>Status</th>
                    <th>Battery (%)</th>
                    <th>Last Checked</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHardware.map(h => (
                    <tr key={h.id}>
                      <td>{h.id}</td>
                      <td>{h.binId}</td>
                      <td>{h.status}</td>
                      <td>{h.battery}</td>
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
              className="btn"
              onClick={() => {
                const headers = ["ID", "Bin ID", "Status", "Battery", "Last Checked"];
                const rows = filteredHardware.map(h => [
                  h.id, h.binId, h.status, h.battery, h.lastChecked
                ]);
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