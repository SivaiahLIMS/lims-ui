import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { samplesService } from './samples.service';
export const sampleKeys = {
  list:    (p?: Record<string,unknown>) => ['samples', p] as const,
  detail:  (id: number) => ['samples', id] as const,
  tests:   (id: number) => ['samples', id, 'tests'] as const,
  results: (id: number) => ['samples', id, 'results'] as const,
  coa:     (id: number) => ['samples', id, 'coa'] as const,
};
export const useSamples      = (p?: Record<string,unknown>) => useQuery({ queryKey: sampleKeys.list(p),    queryFn: () => samplesService.list(p) });
export const useSample       = (id: number) => useQuery({ queryKey: sampleKeys.detail(id),  queryFn: () => samplesService.detail(id), enabled: !!id });
export const useSampleTests  = (id: number) => useQuery({ queryKey: sampleKeys.tests(id),   queryFn: () => samplesService.tests(id), enabled: !!id });
export const useSampleResults= (id: number) => useQuery({ queryKey: sampleKeys.results(id), queryFn: () => samplesService.results(id), enabled: !!id });
export const useCoa          = (id: number) => useQuery({ queryKey: sampleKeys.coa(id),     queryFn: () => samplesService.coa(id), enabled: !!id });
export const useCreateSample = () => { const qc = useQueryClient(); return useMutation({ mutationFn: samplesService.create, onSuccess: () => qc.invalidateQueries({ queryKey: ['samples'] }) }); };
export const useAddResult    = (sampleId: number) => { const qc = useQueryClient(); return useMutation({ mutationFn: (body: Record<string,unknown>) => samplesService.addResult(sampleId, body), onSuccess: () => qc.invalidateQueries({ queryKey: sampleKeys.results(sampleId) }) }); };
