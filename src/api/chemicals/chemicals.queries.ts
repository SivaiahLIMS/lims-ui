import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { chemicalsService } from './chemicals.service';

export const chemKeys = {
  masters:    (p?: Record<string,unknown>) => ['chemicals', 'masters', p] as const,
  master:     (id: number) => ['chemicals', 'master', id] as const,
  stock:      (p?: Record<string,unknown>) => ['chemicals', 'stock', p] as const,
  containers: (p?: Record<string,unknown>) => ['chemicals', 'containers', p] as const,
  fefo:       (id: number) => ['chemicals', 'fefo', id] as const,
};

export const useChemicalMasters  = (p?: Record<string,unknown>) => useQuery({ queryKey: chemKeys.masters(p), queryFn: () => chemicalsService.masters(p) });
export const useChemicalMaster   = (id: number) => useQuery({ queryKey: chemKeys.master(id), queryFn: () => chemicalsService.master(id), enabled: !!id });
export const useChemicalStock    = (p?: Record<string,unknown>) => useQuery({ queryKey: chemKeys.stock(p), queryFn: () => chemicalsService.stock(p) });
export const useChemContainers   = (p?: Record<string,unknown>) => useQuery({ queryKey: chemKeys.containers(p), queryFn: () => chemicalsService.containers(p) });
export const useFefoList         = (id: number) => useQuery({ queryKey: chemKeys.fefo(id), queryFn: () => chemicalsService.fefo(id), enabled: !!id });
export const useCreateChemical   = () => { const qc = useQueryClient(); return useMutation({ mutationFn: chemicalsService.create, onSuccess: () => qc.invalidateQueries({ queryKey: ['chemicals'] }) }); };
export const useRegisterChemical = () => { const qc = useQueryClient(); return useMutation({ mutationFn: chemicalsService.register, onSuccess: () => qc.invalidateQueries({ queryKey: ['chemicals'] }) }); };
export const useIssueChemical    = () => { const qc = useQueryClient(); return useMutation({ mutationFn: chemicalsService.issue, onSuccess: () => qc.invalidateQueries({ queryKey: ['chemicals', 'stock'] }) }); };
