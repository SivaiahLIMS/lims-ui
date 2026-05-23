import apiClient from '@/lib/axios/client';
import { API } from '@/config/api.config';
export const tasksService = {
  list: (p?: Record<string,unknown>) => apiClient.get((API as Record<string, unknown>)['tasks'] as string || '/tasks', { params: p }).then(r => r.data),
};
