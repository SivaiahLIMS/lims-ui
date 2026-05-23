import { useMemo } from 'react';
import {
  useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel,
  flexRender, type ColumnDef, type SortingState, type PaginationState,
} from '@tanstack/react-table';
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer,
  Paper, Box, TableSortLabel } from '@mui/material';
import { DataTablePagination } from './DataTablePagination';
import { SectionLoader } from '@/components/feedback/SectionLoader';
import { EmptyState } from '@/components/data-display/EmptyState';

interface Props<T> {
  data: T[]; columns: ColumnDef<T, any>[];
  isLoading?: boolean; totalRows?: number;
  pagination?: PaginationState; onPaginationChange?: (p: PaginationState) => void;
  sorting?: SortingState; onSortingChange?: (s: SortingState) => void;
}

export function DataTable<T>({ data, columns, isLoading, totalRows, pagination, onPaginationChange, sorting, onSortingChange }: Props<T>) {
  const table = useReactTable({
    data: useMemo(() => data, [data]),
    columns,
    state: { sorting: sorting ?? [], pagination: pagination ?? { pageIndex: 0, pageSize: 20 } },
    onSortingChange: onSortingChange as React.Dispatch<React.SetStateAction<SortingState>>,
    onPaginationChange: onPaginationChange as React.Dispatch<React.SetStateAction<PaginationState>>,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: !!totalRows,
    rowCount: totalRows,
    manualSorting: !!onSortingChange,
  });

  if (isLoading) return <SectionLoader />;
  if (!data.length) return <EmptyState />;

  return (
    <Box>
      <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
        <Table size="small">
          <TableHead>
            {table.getHeaderGroups().map(hg => (
              <TableRow key={hg.id}>
                {hg.headers.map(h => (
                  <TableCell key={h.id} sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
                    {h.isPlaceholder ? null : h.column.getCanSort() ? (
                      <TableSortLabel active={!!h.column.getIsSorted()} direction={h.column.getIsSorted() || 'asc'}
                        onClick={h.column.getToggleSortingHandler()}>
                        {flexRender(h.column.columnDef.header, h.getContext())}
                      </TableSortLabel>
                    ) : flexRender(h.column.columnDef.header, h.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow key={row.id} hover>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DataTablePagination table={table} />
    </Box>
  );
}
