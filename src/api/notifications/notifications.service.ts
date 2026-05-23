import apiClient from '@/lib/axios/client';
import { API } from '@/config/api.config';
export const notificationsService = {
  list: (p?: Record<string,unknown>) => apiClient.get((API as Record<string, unknown>)['notifications'] as string || '/notifications', { params: p }).then(r => r.data),
};
