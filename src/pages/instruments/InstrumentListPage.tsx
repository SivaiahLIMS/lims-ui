import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { createColumnHelper } from '@tanstack/react-table';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { DataTable } from '@/components/data-display/DataTable/DataTable';
import { DataTableToolbar } from '@/components/data-display/DataTable/DataTableToolbar';
import { StatusChip } from '@/components/data-display/StatusChip';
import { useInstruments } from '@/api/instruments/instruments.queries';
import { useTableState } from '@/hooks/useTableState';
import type { InstrumentMaster } from '@/types/instrument.types';

const col = createColumnHelper<InstrumentMaster>();

export default function InstrumentListPage() {
  const nav = useNavigate();
  const { globalFilter, setGlobalFilter, pagination, setPagination } = useTableState();
  const { data, isLoading } = useInstruments();

  const columns = [
    col.accessor('instrumentCode', { header: 'Code', cell: (i) => <strong>{i.getValue()}</strong> }),
    col.accessor('instrumentName', { header: 'Name' }),
    col.accessor('model', { header: 'Model' }),
    col.accessor('serialNumber', { header: 'Serial No.' }),
    col.accessor('calibrationFrequency', { header: 'Cal. Frequency' }),
    col.accessor('status', { header: 'Status', cell: (i) => <StatusChip status={i.getValue()} /> }),
    col.display({ id: 'actions', header: 'Actions', cell: (i) => (
      <Button size="small" onClick={() => nav(`/app/instruments/${i.row.original.id}`)}>View</Button>
    )}),
  ];

  return (
    <PageWrapper title="Instruments" breadcrumbs={[{ label: 'Instruments' }]}
      action={<Button variant="contained" startIcon={<AddIcon />} onClick={() => nav('/app/instruments/new')}>Add Instrument</Button>}>
      <DataTableToolbar search={globalFilter} onSearch={setGlobalFilter} />
      <DataTable data={data?.content ?? []} columns={columns} isLoading={isLoading} pagination={pagination} onPaginationChange={setPagination} totalRows={data?.totalElements} />
    </PageWrapper>
  );
}
