import apiClient from '@/lib/axios/client';
import { API } from '@/config/api.config';
export const elnService = {
  list: (p?: Record<string,unknown>) => apiClient.get((API as Record<string, unknown>)['eln'] as string || '/eln', { params: p }).then(r => r.data),
};
