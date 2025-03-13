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
    { binId: uuidv4().slice(0, 10), capacity: 85, location: "Nazareth", lastCollected: "2025-01-15" },
    { binId: uuidv4().slice(0, 10), capacity: 30, location: "Haifa", lastCollected: "2025-02-01" },
    { binId: uuidv4().slice(0, 10), capacity: 100, location: "Tel Aviv", lastCollected: "2025-03-10" },
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
  const [showBins, setShowBins] = useState(false);
  const [showWorkers, setShowWorkers] = useState(false);
  const [showVehicles, setShowVehicles] = useState(false);
  const [showHardware, setShowHardware] = useState(false);

  const binChartRef = useRef(null);
  const workerChartRef = useRef(null);
  const vehicleChartRef = useRef(null);
  const hardwareChartRef = useRef(null);

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

  // Download CSV Function
  const downloadCsv = (headers, rows, filename) => {
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, filename);
  };

  // Chart Data & Options
  const binsChartData = {
    labels: filteredBins.map((b) => b.binId),
    datasets: [{ label: "Bin Capacity", data: filteredBins.map((b) => b.capacity), backgroundColor: "#3498db" }],
  };
  const binsChartOptions = {
    responsive: true,
    scales: { y: { beginAtZero: true, max: 100 } },
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
    labels: filteredWorkers.map((w) => w.workerId),
    datasets: [{
      label: "Days Since Start",
      data: filteredWorkers.map((w) => Math.floor((new Date("2025-04-01").getTime() - new Date(w.startDate).getTime()) / (1000 * 3600 * 24))),
      backgroundColor: "#2ecc71",
    }],
  };
  const workersChartOptions = {
    responsive: true,
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
    labels: filteredVehicles.map((v) => v.licensePlate),
    datasets: [{
      label: "Days Since Maintenance",
      data: filteredVehicles.map((v) => Math.floor((new Date("2025-04-01").getTime() - new Date(v.lastMaintenance).getTime()) / (1000 * 3600 * 24))),
      backgroundColor: "#9b59b6",
    }],
  };
  const vehiclesChartOptions = {
    responsive: true,
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
    labels: filteredHardware.map((h) => h.hardwareId),
    datasets: [{ label: "Battery (%)", data: filteredHardware.map((h) => h.battery), backgroundColor: "#e67e22" }],
  };
  const hardwareChartOptions = {
    responsive: true,
    scales: { y: { beginAtZero: true, max: 100 } },
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
      <Sidebar user={{ name: "Mohamed Mhagne", avatar: "/images/sami.png" }} activePage="reports" onLogout={onLogout} userRole={userRole} />
      <div className="content">
        <h1>Reports</h1>
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
        </div>

        {/* Bins Section */}
        <div className="report-section" data-visible={showBins}>
          <h2>Bin Reports</h2>
          <div className="form-container">
            <input
              type="text"
              placeholder="Search bins..."
              value={binSearch}
              onChange={(e) => setBinSearch(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Bin ID</th>
                  <th>Capacity (%)</th>
                  <th>Location</th>
                  <th>Last Collected</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                {filteredBins.map((bin) => (
                  <tr key={bin.binId}>
                    <td>{bin.binId}</td>
                    <td>{bin.capacity}%</td>
                    <td>{bin.location}</td>
                    <td>{bin.lastCollected}</td>
                    <td>
                      <button
                        className="download-btn"
                        onClick={() => {
                          const headers = ["BinID", "Capacity", "Location", "LastCollected"];
                          const row = [bin.binId, bin.capacity, bin.location, bin.lastCollected];
                          downloadCsv(headers, [row], `Bin_${bin.binId}.csv`);
                        }}
                        title="Download Bin Data"
                      >
                        <i className="fas fa-download"></i>
                      </button>
                    </td>
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
              const rows = filteredBins.map((b) => [b.binId, b.capacity, b.location, b.lastCollected]);
              downloadCsv(headers, rows, "AllFilteredBins.csv");
            }}
          >
            Download File (All Filtered Bins)
          </button>
        </div>

        {/* Workers Section */}
        <div className="report-section" data-visible={showWorkers}>
          <h2>Workers Reports</h2>
          <div className="form-container">
            <input
              type="text"
              placeholder="Search workers..."
              value={workerSearch}
              onChange={(e) => setWorkerSearch(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Worker ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Start Date</th>
                  <th>Shift</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                {filteredWorkers.map((w) => (
                  <tr key={w.workerId}>
                    <td>{w.workerId}</td>
                    <td>{w.name}</td>
                    <td>{w.phone}</td>
                    <td>{w.startDate}</td>
                    <td>{w.shift}</td>
                    <td>
                      <button
                        className="download-btn"
                        onClick={() => {
                          const headers = ["WorkerID", "Name", "Phone", "StartDate", "Shift"];
                          const row = [w.workerId, w.name, w.phone, w.startDate, w.shift];
                          downloadCsv(headers, [row], `Worker_${w.workerId}.csv`);
                        }}
                        title="Download Worker Data"
                      >
                        <i className="fas fa-download"></i>
                      </button>
                    </td>
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
              const rows = filteredWorkers.map((w) => [w.workerId, w.name, w.phone, w.startDate, w.shift]);
              downloadCsv(headers, [rows], "AllFilteredWorkers.csv");
            }}
          >
            Download File (All Filtered Workers)
          </button>
        </div>

        {/* Vehicles Section */}
        <div className="report-section" data-visible={showVehicles}>
          <h2>Vehicles Reports</h2>
          <div className="form-container">
            <input
              type="text"
              placeholder="Search vehicles..."
              value={vehicleSearch}
              onChange={(e) => setVehicleSearch(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>License Plate</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Last Maintenance</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                {filteredVehicles.map((v) => (
                  <tr key={v.licensePlate}>
                    <td>{v.licensePlate}</td>
                    <td>{v.type}</td>
                    <td>{v.status}</td>
                    <td>{v.lastMaintenance}</td>
                    <td>
                      <button
                        className="download-btn"
                        onClick={() => {
                          const headers = ["LicensePlate", "Type", "Status", "LastMaintenance"];
                          const row = [v.licensePlate, v.type, v.status, v.lastMaintenance];
                          downloadCsv(headers, [row], `Vehicle_${v.licensePlate}.csv`);
                        }}
                        title="Download Vehicle Data"
                      >
                        <i className="fas fa-download"></i>
                      </button>
                    </td>
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
              const rows = filteredVehicles.map((v) => [v.licensePlate, v.type, v.status, v.lastMaintenance]);
              downloadCsv(headers, [rows], "AllFilteredVehicles.csv");
            }}
          >
            Download File (All Filtered Vehicles)
          </button>
        </div>

        {/* Hardware Section */}
        <div className="report-section" data-visible={showHardware}>
          <h2>Hardware Reports</h2>
          <div className="form-container">
            <input
              type="text"
              placeholder="Search hardware..."
              value={hardwareSearch}
              onChange={(e) => setHardwareSearch(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Hardware ID</th>
                  <th>Bin ID</th>
                  <th>Status</th>
                  <th>Battery (%)</th>
                  <th>Last Checked</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                {filteredHardware.map((h) => (
                  <tr key={h.hardwareId}>
                    <td>{h.hardwareId}</td>
                    <td>{h.binId}</td>
                    <td>{h.status}</td>
                    <td>{h.battery}%</td>
                    <td>{h.lastChecked}</td>
                    <td>
                      <button
                        className="download-btn"
                        onClick={() => {
                          const headers = ["HardwareID", "BinID", "Status", "Battery", "LastChecked"];
                          const row = [h.hardwareId, h.binId, h.status, h.battery, h.lastChecked];
                          downloadCsv(headers, [row], `Hardware_${h.hardwareId}.csv`);
                        }}
                        title="Download Hardware Data"
                      >
                        <i className="fas fa-download"></i>
                      </button>
                    </td>
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
              const rows = filteredHardware.map((h) => [h.hardwareId, h.binId, h.status, h.battery, h.lastChecked]);
              downloadCsv(headers, [rows], "AllFilteredHardware.csv");
            }}
          >
            Download File (All Filtered Hardware)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;