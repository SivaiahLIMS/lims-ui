import apiClient from '@/lib/axios/client';
import { API } from '@/config/api.config';

export const chemicalsService = {
  masters:    (p?: Record<string,unknown>) => apiClient.get(API.chemicals.masters, { params: p }).then(r => r.data),
  master:     (id: number) => apiClient.get(API.chemicals.master(id)).then(r => r.data),
  create:     (body: Record<string,unknown>) => apiClient.post(API.chemicals.masters, body).then(r => r.data),
  update:     (id: number, body: Record<string,unknown>) => apiClient.put(API.chemicals.master(id), body).then(r => r.data),
  register:   (body: Record<string,unknown>) => apiClient.post(API.chemicals.register, body).then(r => r.data),
  stock:      (p?: Record<string,unknown>) => apiClient.get(API.chemicals.stock, { params: p }).then(r => r.data),
  issue:      (body: Record<string,unknown>) => apiClient.post(API.chemicals.issue, body).then(r => r.data),
  destroy:    (body: Record<string,unknown>) => apiClient.post(API.chemicals.destroy, body).then(r => r.data),
  containers: (p?: Record<string,unknown>) => apiClient.get(API.chemicals.containers, { params: p }).then(r => r.data),
  fefo:       (masterId: number) => apiClient.get(API.chemicals.fefo, { params: { masterId } }).then(r => r.data),
};
