import { Button, Chip } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { DataTable } from '@/components/data-display/DataTable/DataTable';
import { StatusChip } from '@/components/data-display/StatusChip';
import { useTableState } from '@/hooks/useTableState';
import { DataTableToolbar } from '@/components/data-display/DataTable/DataTableToolbar';

interface Violation { id: number; location: string; containerCode: string; violationType: string; detectedAt: string; status: string; }
const col = createColumnHelper<Violation>();
const MOCK: Violation[] = [
  { id: 1, location: 'Cold Storage B / Refrigerator B-1', containerCode: 'CTN-2024-042', violationType: 'TEMPERATURE_EXCURSION', detectedAt: '2024-05-01', status: 'OPEN' },
  { id: 2, location: 'Lab Room A / Shelf A-2', containerCode: 'CTN-2024-011', violationType: 'WRONG_STORAGE_CONDITION', detectedAt: '2024-04-28', status: 'CLOSED' },
];

export default function StorageViolationsPage() {
  const { globalFilter, setGlobalFilter } = useTableState();
  const columns = [
    col.accessor('location', { header: 'Location' }),
    col.accessor('containerCode', { header: 'Container', cell: (i) => <strong>{i.getValue()}</strong> }),
    col.accessor('violationType', { header: 'Type', cell: (i) => <Chip label={i.getValue().replace(/_/g,' ')} size="small" color="warning" /> }),
    col.accessor('detectedAt', { header: 'Detected', cell: (i) => new Date(i.getValue()).toLocaleDateString() }),
    col.accessor('status', { header: 'Status', cell: (i) => <StatusChip status={i.getValue()} /> }),
    col.display({ id: 'actions', cell: () => <Button size="small" color="success">Resolve</Button> }),
  ];
  return (
    <PageWrapper title="Storage Violations" breadcrumbs={[{ label: 'Storage', to: '/app/storage' }, { label: 'Violations' }]}>
      <DataTableToolbar search={globalFilter} onSearch={setGlobalFilter} />
      <DataTable data={MOCK} columns={columns} />
    </PageWrapper>
  );
}
