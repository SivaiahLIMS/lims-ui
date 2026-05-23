import { TablePagination } from '@mui/material';
import type { Table } from '@tanstack/react-table';

export const DataTablePagination = <T,>({ table }: { table: Table<T> }) => {
  const { pageIndex, pageSize } = table.getState().pagination;
  return (
    <TablePagination
      component="div"
      count={table.getRowCount()}
      page={pageIndex}
      rowsPerPage={pageSize}
      rowsPerPageOptions={[10, 20, 50, 100]}
      onPageChange={(_, p) => table.setPageIndex(p)}
      onRowsPerPageChange={(e) => table.setPageSize(Number(e.target.value))}
      sx={{ borderTop: '1px solid', borderColor: 'divider' }}
    />
  );
};
