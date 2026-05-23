import { Box, TextField, MenuItem, Button } from '@mui/material';
import { useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { DataTable } from '@/components/data-display/DataTable/DataTable';
import { useAuditLogs } from '@/api/audit/audit.queries';
import { useTableState } from '@/hooks/useTableState';

interface AuditRow { id: number; entityType: string; entityId: string; action: string; performedBy: string; oldValue: string; newValue: string; timestamp: string; }
const col = createColumnHelper<AuditRow>();

export default function AuditLogPage() {
  const [entityType, setEntityType] = useState('');
  const { pagination, setPagination } = useTableState();
  const { data, isLoading } = useAuditLogs({ entityType, page: pagination.pageIndex, size: pagination.pageSize });

  const columns = [
    col.accessor('timestamp', { header: 'Timestamp', cell: (i) => new Date(i.getValue()).toLocaleString() }),
    col.accessor('entityType', { header: 'Entity Type' }),
    col.accessor('entityId', { header: 'Entity ID' }),
    col.accessor('action', { header: 'Action', cell: (i) => <strong>{i.getValue()}</strong> }),
    col.accessor('performedBy', { header: 'Performed By' }),
    col.accessor('oldValue', { header: 'Old Value', cell: (i) => <code style={{ fontSize: '0.75rem' }}>{i.getValue()}</code> }),
    col.accessor('newValue', { header: 'New Value', cell: (i) => <code style={{ fontSize: '0.75rem' }}>{i.getValue()}</code> }),
  ];

  return (
    <PageWrapper title="Audit Log" breadcrumbs={[{ label: 'Audit Log' }]}>
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField select label="Entity Type" value={entityType} onChange={(e) => setEntityType(e.target.value)} size="small" sx={{ minWidth: 200 }}>
          <MenuItem value="">All</MenuItem>
          {['DocumentVersion', 'ChemicalRegistration', 'InstrumentCalibration', 'WorksheetExecution', 'Sample'].map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
        </TextField>
        <TextField type="date" label="From" size="small" InputLabelProps={{ shrink: true }} />
        <TextField type="date" label="To" size="small" InputLabelProps={{ shrink: true }} />
        <Button variant="outlined" size="small">Export CSV</Button>
      </Box>
      <DataTable data={data?.content ?? []} columns={columns} isLoading={isLoading} pagination={pagination} onPaginationChange={setPagination} totalRows={data?.totalElements} />
    </PageWrapper>
  );
}
