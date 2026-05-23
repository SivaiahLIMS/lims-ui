import apiClient from '@/lib/axios/client';
import { API } from '@/config/api.config';
export const usersService = {
  list: (p?: Record<string,unknown>) => apiClient.get((API as Record<string, unknown>)['users'] as string || '/users', { params: p }).then(r => r.data),
};
