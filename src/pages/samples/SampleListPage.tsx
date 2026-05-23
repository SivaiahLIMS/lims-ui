import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { createColumnHelper } from '@tanstack/react-table';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { DataTable } from '@/components/data-display/DataTable/DataTable';
import { DataTableToolbar } from '@/components/data-display/DataTable/DataTableToolbar';
import { StatusChip } from '@/components/data-display/StatusChip';
import { useTableState } from '@/hooks/useTableState';
import { useSamples } from '@/api/samples/samples.queries';
import type { Sample } from '@/types/sample.types';

const col = createColumnHelper<Sample>();
export default function SampleListPage() {
  const nav = useNavigate();
  const { globalFilter, setGlobalFilter, pagination, setPagination } = useTableState();
  const { data, isLoading } = useSamples();
  const columns = [
    col.accessor('sampleNumber', { header: 'Sample No.', cell: (i) => <strong>{i.getValue()}</strong> }),
    col.accessor('product',      { header: 'Product' }),
    col.accessor('batch',        { header: 'Batch' }),
    col.accessor('sampleType',   { header: 'Type' }),
    col.accessor('status',       { header: 'Status', cell: (i) => <StatusChip status={i.getValue()} /> }),
    col.accessor('receivedDate', { header: 'Received', cell: (i) => new Date(i.getValue()).toLocaleDateString() }),
    col.display({ id: 'actions', cell: (i) => (
      <Button size="small" onClick={() => nav(`/app/samples/${i.row.original.id}`)}>View</Button>
    )}),
  ];
  return (
    <PageWrapper title="Samples" breadcrumbs={[{ label:'Samples' }]}
      action={<Button variant="contained" startIcon={<AddIcon />} onClick={() => nav('/app/samples/register')}>Register Sample</Button>}>
      <DataTableToolbar search={globalFilter} onSearch={setGlobalFilter} />
      <DataTable data={data?.content ?? []} columns={columns} isLoading={isLoading} pagination={pagination} onPaginationChange={setPagination} totalRows={data?.totalElements} />
    </PageWrapper>
  );
}
