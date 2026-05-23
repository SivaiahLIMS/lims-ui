import { useState } from 'react';
import type { PaginationState, SortingState } from '@tanstack/react-table';

export const useTableState = (pageSize = 20) => {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  return { pagination, setPagination, sorting, setSorting, globalFilter, setGlobalFilter };
};
