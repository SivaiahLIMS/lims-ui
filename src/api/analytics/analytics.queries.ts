import { useQuery } from '@tanstack/react-query';
import { analyticsService } from './analytics.service';
export const useChemicalAnalytics   = (p?: Record<string,unknown>) => useQuery({ queryKey: ['analytics', 'chemical',   p], queryFn: () => analyticsService.chemical(p) });
export const useInstrumentAnalytics = (p?: Record<string,unknown>) => useQuery({ queryKey: ['analytics', 'instrument', p], queryFn: () => analyticsService.instrument(p) });
export const useWorksheetAnalytics  = (p?: Record<string,unknown>) => useQuery({ queryKey: ['analytics', 'worksheet',  p], queryFn: () => analyticsService.worksheet(p) });
export const useUserAnalytics       = (p?: Record<string,unknown>) => useQuery({ queryKey: ['analytics', 'user',       p], queryFn: () => analyticsService.user(p) });
export const useStorageAnalytics    = (p?: Record<string,unknown>) => useQuery({ queryKey: ['analytics', 'storage',    p], queryFn: () => analyticsService.storage(p) });
export const usePredictiveAlerts    = (p?: Record<string,unknown>) => useQuery({ queryKey: ['analytics', 'predictive', p], queryFn: () => analyticsService.predictive(p) });
export const useOosAnalytics        = (p?: Record<string,unknown>) => useQuery({ queryKey: ['analytics', 'oos',        p], queryFn: () => analyticsService.oos(p) });
