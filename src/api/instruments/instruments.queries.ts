import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { instrumentsService } from './instruments.service';

export const instrKeys = {
  list:         (p?: Record<string,unknown>) => ['instruments', p] as const,
  detail:       (id: number) => ['instruments', id] as const,
  calibrations: (id: number) => ['instruments', id, 'calibrations'] as const,
  reservations: (p?: Record<string,unknown>) => ['instruments', 'reservations', p] as const,
};
export const useInstruments      = (p?: Record<string,unknown>) => useQuery({ queryKey: instrKeys.list(p), queryFn: () => instrumentsService.list(p) });
export const useInstrument       = (id: number) => useQuery({ queryKey: instrKeys.detail(id), queryFn: () => instrumentsService.detail(id), enabled: !!id });
export const useCalibrations     = (id: number) => useQuery({ queryKey: instrKeys.calibrations(id), queryFn: () => instrumentsService.calibrations(id), enabled: !!id });
export const useReservations     = (p?: Record<string,unknown>) => useQuery({ queryKey: instrKeys.reservations(p), queryFn: () => instrumentsService.reservations(p) });
export const useCreateInstrument = () => { const qc = useQueryClient(); return useMutation({ mutationFn: instrumentsService.create, onSuccess: () => qc.invalidateQueries({ queryKey: ['instruments'] }) }); };
export const useCreateCalibration = (instrId: number) => { const qc = useQueryClient(); return useMutation({ mutationFn: (body: Record<string,unknown>) => instrumentsService.createCalibration(instrId, body), onSuccess: () => qc.invalidateQueries({ queryKey: instrKeys.calibrations(instrId) }) }); };
export const useReserveInstrument = () => { const qc = useQueryClient(); return useMutation({ mutationFn: instrumentsService.reserve, onSuccess: () => qc.invalidateQueries({ queryKey: ['instruments', 'reservations'] }) }); };
