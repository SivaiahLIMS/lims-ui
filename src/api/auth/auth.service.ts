import apiClient from '@/lib/axios/client';
import { API } from '@/config/api.config';
import type { LoginResponse } from '@/store/authStore';

export const authService = {
  login: (username: string, password: string) =>
    apiClient.post<LoginResponse>(API.auth.login, { username, password }).then((r) => r.data),
  refresh: (refreshToken: string) =>
    apiClient.post<LoginResponse>(API.auth.refresh, { refreshToken }).then((r) => r.data),
  logout: () => apiClient.post(API.auth.logout),
};
