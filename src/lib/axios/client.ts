import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api/v1',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

const getStoredAuth = () => {
  try {
    const raw = localStorage.getItem('lims-auth');
    return raw ? JSON.parse(raw).state : null;
  } catch { return null; }
};

apiClient.interceptors.request.use((config) => {
  const auth = getStoredAuth();
  const branch = (() => {
    try {
      const raw = localStorage.getItem('lims-branch');
      return raw ? JSON.parse(raw).state : null;
    } catch { return null; }
  })();
  if (auth?.accessToken) config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
  if (auth?.tenantId)    config.headers['X-Tenant-Id'] = String(auth.tenantId);
  if (branch?.activeBranchId) config.headers['X-Branch-Id'] = String(branch.activeBranchId);
  return config;
});

let isRefreshing = false;
let refreshQueue: Array<(token: string) => void> = [];

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshQueue.push((token) => {
            original.headers['Authorization'] = `Bearer ${token}`;
            resolve(apiClient(original));
          });
        });
      }
      original._retry = true;
      isRefreshing = true;
      try {
        const auth = getStoredAuth();
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL ?? '/api/v1'}/auth/refresh`,
          { refreshToken: auth?.refreshToken }
        );
        const newToken = data.token;
        const stored = localStorage.getItem('lims-auth');
        if (stored) {
          const parsed = JSON.parse(stored);
          parsed.state.accessToken = newToken;
          localStorage.setItem('lims-auth', JSON.stringify(parsed));
        }
        refreshQueue.forEach((cb) => cb(newToken));
        refreshQueue = [];
        original.headers['Authorization'] = `Bearer ${newToken}`;
        return apiClient(original);
      } catch {
        localStorage.removeItem('lims-auth');
        window.location.href = '/login';
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
