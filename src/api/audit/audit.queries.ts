import { useQuery } from '@tanstack/react-query';
import { auditService } from './audit.service';
export const auditKeys = {
  list:   (p?: Record<string,unknown>) => ['audit', p] as const,
  entity: (t: string, id: number) => ['audit', t, id] as const,
};
export const useAuditLogs   = (p?: Record<string,unknown>) => useQuery({ queryKey: auditKeys.list(p),     queryFn: () => auditService.list(p) });
export const useEntityAudit = (type: string, id: number) => useQuery({ queryKey: auditKeys.entity(type, id), queryFn: () => auditService.entityAudit(type, id), enabled: !!id });
