import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createColumnHelper } from '@tanstack/react-table';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { DataTable } from '@/components/data-display/DataTable/DataTable';
import { DataTableToolbar } from '@/components/data-display/DataTable/DataTableToolbar';
import { StatusChip } from '@/components/data-display/StatusChip';
import { useTableState } from '@/hooks/useTableState';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface WS { id: number; worksheetNo: string; documentName: string; analyst: string; status: string; startedAt: string; }
const col = createColumnHelper<WS>();

export default function WorksheetListPage() {
  const nav = useNavigate();
  const { globalFilter, setGlobalFilter } = useTableState();

  const MOCK: WS[] = [
    { id: 1, worksheetNo: 'WS-2024-001', documentName: 'HPLC Method v3', analyst: 'analyst01', status: 'IN_PROGRESS', startedAt: '2024-05-01' },
    { id: 2, worksheetNo: 'WS-2024-002', documentName: 'Dissolution Test v2', analyst: 'analyst02', status: 'PENDING_REVIEW', startedAt: '2024-05-02' },
    { id: 3, worksheetNo: 'WS-2024-003', documentName: 'Water Content SOP', analyst: 'analyst01', status: 'APPROVED', startedAt: '2024-04-30' },
  ];

  const columns = [
    col.accessor('worksheetNo', { header: 'Worksheet No.', cell: (i) => <strong>{i.getValue()}</strong> }),
    col.accessor('documentName', { header: 'Document' }),
    col.accessor('analyst', { header: 'Analyst' }),
    col.accessor('status', { header: 'Status', cell: (i) => <StatusChip status={i.getValue()} /> }),
    col.accessor('startedAt', { header: 'Started', cell: (i) => new Date(i.getValue()).toLocaleDateString() }),
    col.display({ id: 'actions', header: 'Actions', cell: (i) => (
      <Button size="small" onClick={() => nav(i.row.original.status === 'PENDING_REVIEW' ? `/app/worksheets/${i.row.original.id}/review` : `/app/worksheets/execute/${i.row.original.id}`)}>
        {i.row.original.status === 'PENDING_REVIEW' ? 'Review' : 'Open'}
      </Button>
    )}),
  ];

  return (
    <PageWrapper title="Worksheets" breadcrumbs={[{ label: 'Worksheets' }]}
      action={<Button variant="contained" startIcon={<PlayArrowIcon />} onClick={() => nav('/app/documents')}>Start from Template</Button>}>
      <DataTableToolbar search={globalFilter} onSearch={setGlobalFilter} />
      <DataTable data={MOCK} columns={columns} />
    </PageWrapper>
  );
}
