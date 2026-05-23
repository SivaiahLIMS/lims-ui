import apiClient from '@/lib/axios/client';
import { API } from '@/config/api.config';

export const documentsService = {
  list:       (params?: Record<string,unknown>) => apiClient.get(API.documents.list, { params }).then(r => r.data),
  detail:     (id: number) => apiClient.get(API.documents.detail(id)).then(r => r.data),
  create:     (body: Record<string,unknown>) => apiClient.post(API.documents.list, body).then(r => r.data),
  versions:   (id: number) => apiClient.get(API.documents.versions(id)).then(r => r.data),
  upload:     (id: number, form: FormData) => apiClient.post(API.documents.upload(id), form, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data),
  publish:    (id: number, v: number) => apiClient.put(API.documents.publish(id, v)).then(r => r.data),
  retire:     (id: number, v: number) => apiClient.put(API.documents.retire(id, v)).then(r => r.data),
};
