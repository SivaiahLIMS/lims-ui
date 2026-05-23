import apiClient from '@/lib/axios/client';
import { API } from '@/config/api.config';
export const samplesService = {
  list:    (p?: Record<string,unknown>) => apiClient.get(API.samples.list, { params: p }).then(r => r.data),
  detail:  (id: number) => apiClient.get(API.samples.detail(id)).then(r => r.data),
  create:  (body: Record<string,unknown>) => apiClient.post(API.samples.list, body).then(r => r.data),
  tests:   (id: number) => apiClient.get(API.samples.tests(id)).then(r => r.data),
  results: (id: number) => apiClient.get(API.samples.results(id)).then(r => r.data),
  addResult: (id: number, body: Record<string,unknown>) => apiClient.post(API.samples.results(id), body).then(r => r.data),
  coa:     (id: number) => apiClient.get(API.samples.coa(id)).then(r => r.data),
};
