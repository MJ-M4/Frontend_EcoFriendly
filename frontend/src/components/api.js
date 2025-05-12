/* centralised URLs – switch ENV by changing HOST */
const HOST = 'localhost:5000';                      // → sls offline
// const HOST = 'ecofriendlybackend.herokuapp.com'; // ← when deployed

const BASE = `http://${HOST}/api`;

export const loginAPI         = `${BASE}/auth/login`;

/* users */
export const usersAPI         = `${BASE}/users`;
export const userAPI          = id  => `${BASE}/users/${id}`;
export const userPwAPI        = id  => `${BASE}/users/${id}/password`;

/* shifts */
export const shiftsAPI        = `${BASE}/shifts`;                     // ?status=
export const shiftAPI         = id  => `${BASE}/shifts/${id}`;
export const approveShiftAPI  = id  => `${BASE}/shifts/${id}/approve`;
export const denyShiftAPI     = id  => `${BASE}/shifts/${id}/deny`;
export const workerShiftsAPI  = id  => `${BASE}/shifts/worker/${id}`;

/* payments */
export const paymentsAPI      = `${BASE}/payments`;
export const paymentAPI       = id  => `${BASE}/payments/${id}`;
export const payPaymentAPI    = id  => `${BASE}/payments/${id}/pay`;

/* everything else */
export const binsAPI          = `${BASE}/bins`;
export const hardwareAPI      = `${BASE}/hardware`;
export const vehiclesAPI      = `${BASE}/vehicles`;
export const alertsAPI        = `${BASE}/alerts`;
