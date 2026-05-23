import axios from 'axios';

// Get API base URL from environment or local standard port 5000
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach credentials, unique Request IDs, and Tenant context
api.interceptors.request.use(
  (config) => {
    // 1. Inject Authentication JWT Token
    const token = localStorage.getItem('taskflow_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // 2. Inject Active Tenant (Organization) Context
    const activeOrgId = localStorage.getItem('taskflow_org_id');
    if (activeOrgId) {
      config.headers['X-Organization-Id'] = activeOrgId;
    }

    // 3. Inject Unique Request Tracing correlation token (M-08)
    config.headers['X-Request-Id'] = `req-${Math.random().toString(36).substring(2, 11)}-${Date.now().toString(36)}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Catch global failures (e.g. JWT expirations)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Session token expired or corrupted -> Force client logout
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('taskflow_token');
      localStorage.removeItem('taskflow_user');
      localStorage.removeItem('taskflow_org_id');
      
      // Only redirect if not already on the login page to avoid loops
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login?expired=true';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
