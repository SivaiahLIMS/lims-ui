import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { documentsService } from './documents.service';

export const docKeys = {
  list:    (p?: Record<string,unknown>) => ['documents', p] as const,
  detail:  (id: number) => ['documents', id] as const,
  versions:(id: number) => ['documents', id, 'versions'] as const,
};

export const useDocuments    = (p?: Record<string,unknown>) => useQuery({ queryKey: docKeys.list(p),    queryFn: () => documentsService.list(p) });
export const useDocument     = (id: number) => useQuery({ queryKey: docKeys.detail(id),  queryFn: () => documentsService.detail(id), enabled: !!id });
export const useDocVersions  = (id: number) => useQuery({ queryKey: docKeys.versions(id), queryFn: () => documentsService.versions(id), enabled: !!id });

export const useCreateDocument = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: documentsService.create, onSuccess: () => qc.invalidateQueries({ queryKey: ['documents'] }) });
};
export const useUploadDocxVersion = (id: number) => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (form: FormData) => documentsService.upload(id, form), onSuccess: () => qc.invalidateQueries({ queryKey: docKeys.versions(id) }) });
};
export const usePublishVersion = (id: number, v: number) => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: () => documentsService.publish(id, v), onSuccess: () => qc.invalidateQueries({ queryKey: docKeys.versions(id) }) });
};
export const useRetireVersion = (id: number, v: number) => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: () => documentsService.retire(id, v), onSuccess: () => qc.invalidateQueries({ queryKey: docKeys.versions(id) }) });
};
