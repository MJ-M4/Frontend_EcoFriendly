## Smart Waste Management System

Ecofriendly designed to monitor garbage containers in real-time, optimize collection routes, and streamline overall waste management operations. The project is particularly suitable for local municipalities or private waste-management companies looking to reduce operational costs and minimize environmental impact through data-driven collection strategies.

## Key Features

1. Real-Time Bin Monitoring  
   - Displays container fullness percentage and battery status (via the IoT hardware mockup in the code).  
   - Updates in the UI help managers know which bins require urgent attention.

2. Role-Based Access 
   - Managers: Access to employee management, bin management, hardware checks, payments, shift scheduling, and generating data-rich reports.  
   - Workers: Can view assigned shifts, propose shift times, and see relevant alerts.

3. Alerts & Notifications  
   - Automatically flags “bin full” or “low battery” events to ensure timely intervention and avoid public health concerns.

4. Reports & Analysis 
   - Generates charts (using [Chart.js](https://www.chartjs.org/)) to track fill rates, worker data, and vehicle maintenance.  
   - Supports CSV export for further analysis.

5. Vehicles & Hardware Examination  
   - Monitors vehicle status, last maintenance date, and location.  
   - Checks IoT hardware battery levels and operational status.

6. Map Integration 
   - Uses [Leaflet](https://leafletjs.com/) for interactive maps, showing bin locations and suggested routes (via Waze links).

## Prerequisites

- Node.js (≥ 14 or 16 LTS recommended)  
- npm (usually bundled with Node.js)  

For official instructions on installing Node and npm, see [Node.js Official Documentation](https://nodejs.org/en/docs/).

## Installation & Setup

1. Clone or Download the project:

   git clone https://github.com/MJ-M4/Frontend_EcoFriendly.git
   cd Frontend_EcoFriendly
   

2. Install Dependencies:
   npm install
   
   Installs all needed packages (React, React Router, Leaflet, Chart.js, etc.) as specified in package.json.

3. Start the Development Server:
   npm start
   
   - Opens on [http://localhost:3000].  
   - The application will reload automatically as you edit the code.

4. Build for Production (Optional):
   npm run build
   
   - Outputs minified production code to build/.  
   - For details on deployment, see [Create React App – Deployment](https://create-react-app.dev/docs/deployment/).


## Usage Instructions

1. Access the App  
   - Go to [http://localhost:3000] after running npm start.  
   - The Home page introduces the system’s features.

2. Login Flow  
   - Click “Login” to choose a role (Manager or Worker).  
   - Enter a mock username/password (e.g. “admin” / “admin”).  
   - The app simulates successful login, granting role-based access. (In production, replace with real authentication.)

3. Navigate via Sidebar  
   - General: Main dashboard with map and bin status table.  
   - Alerts: Shows warnings about bins or hardware.  
   - Bin Management (Manager Only): Create, search, or delete bins.  
   - Hardware Examination (Manager Only): Inspect IoT hardware battery and maintenance status.  
   - Employees (Manager Only): Add/delete employees, generate random passwords.  
   - Shifts (Manager Only): Add or edit worker shifts, search by Worker ID.  
   - Shift Proposals (Manager): Approve or deny worker shift proposals.  
   - My Shifts (Worker Only): Workers view assigned shifts.  
   - Propose Shifts (Worker Only): Workers request shifts for upcoming weeks.  
   - Payment (Manager Only): Manage and record payments to employees.  
   - Reports (Manager Only): Generate charts and export data (Bins, Vehicles, Hardware, etc.) as CSV.  
   - Settings: Change your display name, password (mock), theme (Light/Dark), and notifications.

4. Alerts & Real-Time Updates  
   - While the code uses mock data, any bin with status: 'Full' or battery < 50 triggers an alert icon.  
  
## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
