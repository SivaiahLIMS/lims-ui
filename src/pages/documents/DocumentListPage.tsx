import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { createColumnHelper } from '@tanstack/react-table';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { DataTable } from '@/components/data-display/DataTable/DataTable';
import { DataTableToolbar } from '@/components/data-display/DataTable/DataTableToolbar';
import { useDocuments } from '@/api/documents/documents.queries';
import { useTableState } from '@/hooks/useTableState';
import { useDebounce } from '@/hooks/useDebounce';
import type { DocumentMaster } from '@/types/document.types';

const col = createColumnHelper<DocumentMaster>();

export default function DocumentListPage() {
  const nav = useNavigate();
  const { globalFilter, setGlobalFilter, pagination, setPagination, sorting, setSorting } = useTableState();
  const search = useDebounce(globalFilter);
  const { data, isLoading } = useDocuments({ search, page: pagination.pageIndex, size: pagination.pageSize });

  const columns = [
    col.accessor('documentCode', { header: 'Code', cell: (i) => <strong>{i.getValue()}</strong> }),
    col.accessor('documentName', { header: 'Name' }),
    col.accessor('documentType', { header: 'Type' }),
    col.accessor('createdAt', { header: 'Created', cell: (i) => new Date(i.getValue()).toLocaleDateString() }),
    col.display({ id: 'actions', header: 'Actions', cell: (i) => (
      <Button size="small" onClick={() => nav(`/app/documents/${i.row.original.id}`)}>View</Button>
    )}),
  ];

  return (
    <PageWrapper title="Documents" breadcrumbs={[{ label: 'Documents' }]}
      action={<Button variant="contained" startIcon={<AddIcon />} onClick={() => nav('/app/documents/new')}>Create Document</Button>}>
      <DataTableToolbar search={globalFilter} onSearch={setGlobalFilter} />
      <DataTable data={data?.content ?? []} columns={columns} isLoading={isLoading}
        pagination={pagination} onPaginationChange={setPagination}
        sorting={sorting} onSortingChange={setSorting} totalRows={data?.totalElements} />
    </PageWrapper>
  );
}
