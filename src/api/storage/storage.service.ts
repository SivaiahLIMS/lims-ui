import apiClient from '@/lib/axios/client';
import { API } from '@/config/api.config';
export const storageService = {
  list: (p?: Record<string,unknown>) => apiClient.get((API as Record<string, unknown>)['storage'] as string || '/storage', { params: p }).then(r => r.data),
};
