import { useAuthStore } from '@/store/authStore';
export const usePermission = (code: string): boolean => useAuthStore((s) => s.permissions.includes(code));
export const useHasAnyPermission = (...codes: string[]): boolean =>
  useAuthStore((s) => codes.some((c) => s.permissions.includes(c)));
