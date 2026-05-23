import apiClient from '@/lib/axios/client';
import { API } from '@/config/api.config';
export const instrumentsService = {
  list:         (p?: Record<string,unknown>) => apiClient.get(API.instruments.list, { params: p }).then(r => r.data),
  detail:       (id: number) => apiClient.get(API.instruments.detail(id)).then(r => r.data),
  create:       (body: Record<string,unknown>) => apiClient.post(API.instruments.list, body).then(r => r.data),
  update:       (id: number, body: Record<string,unknown>) => apiClient.put(API.instruments.detail(id), body).then(r => r.data),
  calibrations: (id: number) => apiClient.get(API.instruments.calibrations(id)).then(r => r.data),
  createCalibration: (id: number, body: Record<string,unknown>) => apiClient.post(API.instruments.calibrations(id), body).then(r => r.data),
  reservations: (p?: Record<string,unknown>) => apiClient.get(API.instruments.reservations, { params: p }).then(r => r.data),
  reserve:      (body: Record<string,unknown>) => apiClient.post(API.instruments.reservations, body).then(r => r.data),
  approveReservation: (id: number) => apiClient.put(API.instruments.reservation(id) + '/approve').then(r => r.data),
};
