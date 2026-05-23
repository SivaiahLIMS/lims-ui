import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createColumnHelper } from '@tanstack/react-table';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { DataTable } from '@/components/data-display/DataTable/DataTable';
import { DataTableToolbar } from '@/components/data-display/DataTable/DataTableToolbar';
import { StatusChip } from '@/components/data-display/StatusChip';
import { useTableState } from '@/hooks/useTableState';

interface OosRow { id: number; testName: string; worksheetNo: string; value: string; limit: string; status: string; detectedAt: string; }
const col = createColumnHelper<OosRow>();
const MOCK: OosRow[] = [
  { id: 1, testName: 'Mobile Phase pH', worksheetNo: 'WS-2024-001', value: '2.95', limit: '3.0–3.2', status: 'INVESTIGATING', detectedAt: '2024-05-01' },
  { id: 2, testName: 'Assay (%)', worksheetNo: 'WS-2024-003', value: '97.2', limit: '98.0–102.0', status: 'PENDING', detectedAt: '2024-04-30' },
];

export default function OosListPage() {
  const nav = useNavigate();
  const { globalFilter, setGlobalFilter } = useTableState();
  const columns = [
    col.accessor('worksheetNo', { header: 'Worksheet', cell: (i) => <strong>{i.getValue()}</strong> }),
    col.accessor('testName', { header: 'Test Name' }),
    col.accessor('value', { header: 'Measured Value' }),
    col.accessor('limit', { header: 'Limit' }),
    col.accessor('status', { header: 'Status', cell: (i) => <StatusChip status={i.getValue()} /> }),
    col.accessor('detectedAt', { header: 'Detected', cell: (i) => new Date(i.getValue()).toLocaleDateString() }),
    col.display({ id: 'actions', cell: (i) => <Button size="small" onClick={() => nav(`/app/oos/${i.row.original.id}`)}>Investigate</Button> }),
  ];
  return (
    <PageWrapper title="OOS / OOT Cases" breadcrumbs={[{ label: 'OOS / OOT' }]}>
      <DataTableToolbar search={globalFilter} onSearch={setGlobalFilter} />
      <DataTable data={MOCK} columns={columns} />
    </PageWrapper>
  );
}
