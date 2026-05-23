import apiClient from '@/lib/axios/client';
import { API } from '@/config/api.config';
export const suppliersService = {
  list: (p?: Record<string,unknown>) => apiClient.get((API as Record<string, unknown>)['suppliers'] as string || '/suppliers', { params: p }).then(r => r.data),
};
