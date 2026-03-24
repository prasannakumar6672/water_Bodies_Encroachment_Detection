import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request automatically
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally — clear storage and redirect to login
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
      window.location.href = '/auth';
    }
    return Promise.reject(err);
  }
);

// ─── Auth ──────────────────────────────────────────────────────────
export const authAPI = {
  login: (email, password, role) =>
    api.post('/auth/login', { email, password, role }),
  register: (data) =>
    api.post('/auth/register', data),
  registerOfficer: (data) =>
    api.post('/auth/register/officer', data),
  me: () =>
    api.get('/auth/me'),
};

// ─── Lakes ─────────────────────────────────────────────────────────
export const lakesAPI = {
  list: (params) =>
    api.get('/lakes', { params }),
  get: (id) =>
    api.get(`/lakes/${id}`),
  add: (data) =>
    api.post('/lakes', data),
};

// ─── Observations ──────────────────────────────────────────────────
export const observationsAPI = {
  submit: (formData) =>
    api.post('/observations', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getMy: () =>
    api.get('/observations/my'),
  getAll: () =>
    api.get('/observations/all'),
  updateStatus: (id, status) =>
    api.put(`/observations/${id}/status`, null, { params: { status } }),
};

// ─── Complaints ────────────────────────────────────────────────────
export const complaintsAPI = {
  list: (params) =>
    api.get('/complaints', { params }),
  respond: (id, data) =>
    api.post(`/complaints/${id}/respond`, data),
  updateStatus: (id, newStatus) =>
    api.put(`/complaints/${id}/status`, null, { params: { new_status: newStatus } }),
};

// ─── Field Verifications ───────────────────────────────────────────
export const verificationsAPI = {
  list: () =>
    api.get('/verifications'),
  create: (data) =>
    api.post('/verifications', data),
  complete: (id) =>
    api.put(`/verifications/${id}/complete`),
};

// ─── Scan ──────────────────────────────────────────────────────────
export const scanAPI = {
  run: (data) =>
    api.post('/scan/run', data),
  results: (params) =>
    api.get('/scan/results', { params }),
};

// ─── Admin ─────────────────────────────────────────────────────────
export const adminAPI = {
  metrics: () =>
    api.get('/admin/metrics'),
  analytics: () =>
    api.get('/admin/analytics'),
  users: (params) =>
    api.get('/admin/users', { params }),
  updateUser: (id, data) =>
    api.put(`/admin/users/${id}`, data),
  approvals: () =>
    api.get('/admin/officer-approvals'),
  approveOfficer: (id) =>
    api.post(`/admin/officer-approvals/${id}/approve`),
  rejectOfficer: (id, reason) =>
    api.post(`/admin/officer-approvals/${id}/reject`, null, { params: { reason } }),
  getSettings: () =>
    api.get('/admin/settings'),
  saveSettings: (data) =>
    api.put('/admin/settings', data),
  generateReport: (data) =>
    api.post('/admin/reports/generate', data),
};

export default api;
