import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userId: number;
  username: string;
  tenantId: number;
  branchId: number;
  permissions: string[];
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  userId: number | null;
  username: string | null;
  tenantId: number | null;
  branchId: number | null;
  permissions: string[];
  setAuth: (res: LoginResponse) => void;
  logout: () => void;
  hasPermission: (code: string) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      userId: null,
      username: null,
      tenantId: null,
      branchId: null,
      permissions: [],
      setAuth: (res) =>
        set({
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
          userId: res.userId,
          username: res.username,
          tenantId: res.tenantId,
          branchId: res.branchId,
          permissions: res.permissions,
        }),
      logout: () =>
        set({
          accessToken: null, refreshToken: null, userId: null,
          username: null, tenantId: null, branchId: null, permissions: [],
        }),
      hasPermission: (code) => get().permissions.includes(code),
    }),
    {
      name: 'lims-auth',
      partialize: (s) => ({
        accessToken: s.accessToken, refreshToken: s.refreshToken,
        userId: s.userId, username: s.username,
        tenantId: s.tenantId, branchId: s.branchId, permissions: s.permissions,
      }),
    }
  )
);
