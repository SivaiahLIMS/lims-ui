import apiClient from '@/lib/axios/client';
import { API } from '@/config/api.config';
export const trainingService = {
  list: (p?: Record<string,unknown>) => apiClient.get((API as Record<string, unknown>)['training'] as string || '/training', { params: p }).then(r => r.data),
};
