import apiClient from '@/lib/axios/client';
import { API } from '@/config/api.config';

export const dashboardService = {
  getSummary: () => apiClient.get(API.dashboard + '/summary').then((r) => r.data),
  getKpis:    () => apiClient.get(API.dashboard + '/kpis').then((r) => r.data),
  getAlerts:  () => apiClient.get(API.dashboard + '/alerts').then((r) => r.data),
  getWorkload:() => apiClient.get(API.dashboard + '/workload').then((r) => r.data),
};
