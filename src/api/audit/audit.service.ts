import apiClient from '@/lib/axios/client';
import { API } from '@/config/api.config';
export const auditService = {
  list:       (p?: Record<string,unknown>) => apiClient.get(API.audit.list, { params: p }).then(r => r.data),
  entityAudit:(type: string, id: number) => apiClient.get(API.audit.entity(type, id)).then(r => r.data),
};
