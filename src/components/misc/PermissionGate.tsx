import type { ReactNode } from 'react';
import { usePermission } from '@/hooks/usePermission';

export const PermissionGate = ({ permission, children }: { permission: string; children: ReactNode }) => {
  const allowed = usePermission(permission);
  return allowed ? <>{children}</> : null;
};
