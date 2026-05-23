import apiClient from '@/lib/axios/client';
import { API } from '@/config/api.config';
export const qaService = {
  list: (p?: Record<string,unknown>) => apiClient.get((API as Record<string, unknown>)['qa'] as string || '/qa', { params: p }).then(r => r.data),
};
