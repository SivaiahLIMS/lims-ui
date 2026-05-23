import apiClient from '@/lib/axios/client';
import { API } from '@/config/api.config';
export const analyticsService = {
  chemical:   (p?: Record<string,unknown>) => apiClient.get(API.analytics.chemical,   { params: p }).then(r => r.data),
  instrument: (p?: Record<string,unknown>) => apiClient.get(API.analytics.instrument, { params: p }).then(r => r.data),
  worksheet:  (p?: Record<string,unknown>) => apiClient.get(API.analytics.worksheet,  { params: p }).then(r => r.data),
  user:       (p?: Record<string,unknown>) => apiClient.get(API.analytics.user,       { params: p }).then(r => r.data),
  storage:    (p?: Record<string,unknown>) => apiClient.get(API.analytics.storage,    { params: p }).then(r => r.data),
  predictive: (p?: Record<string,unknown>) => apiClient.get(API.analytics.predictive, { params: p }).then(r => r.data),
  oos:        (p?: Record<string,unknown>) => apiClient.get(API.analytics.oos,        { params: p }).then(r => r.data),
};
