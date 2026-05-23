import { useQuery } from '@tanstack/react-query';
import { dashboardService } from './dashboard.service';

export const dashboardKeys = {
  summary:  ['dashboard', 'summary'] as const,
  kpis:     ['dashboard', 'kpis']    as const,
  alerts:   ['dashboard', 'alerts']  as const,
  workload: ['dashboard', 'workload'] as const,
};

export const useDashboardSummary  = () => useQuery({ queryKey: dashboardKeys.summary,  queryFn: dashboardService.getSummary });
export const useDashboardKpis     = () => useQuery({ queryKey: dashboardKeys.kpis,     queryFn: dashboardService.getKpis });
export const useDashboardAlerts   = () => useQuery({ queryKey: dashboardKeys.alerts,   queryFn: dashboardService.getAlerts });
export const useDashboardWorkload = () => useQuery({ queryKey: dashboardKeys.workload, queryFn: dashboardService.getWorkload });
