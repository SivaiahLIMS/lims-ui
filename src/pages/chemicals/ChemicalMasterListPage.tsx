import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { createColumnHelper } from '@tanstack/react-table';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { DataTable } from '@/components/data-display/DataTable/DataTable';
import { DataTableToolbar } from '@/components/data-display/DataTable/DataTableToolbar';
import { useChemicalMasters } from '@/api/chemicals/chemicals.queries';
import { useTableState } from '@/hooks/useTableState';
import { useDebounce } from '@/hooks/useDebounce';
import type { ChemicalMaster } from '@/types/chemical.types';

const col = createColumnHelper<ChemicalMaster>();

export default function ChemicalMasterListPage() {
  const nav = useNavigate();
  const { globalFilter, setGlobalFilter, pagination, setPagination } = useTableState();
  const search = useDebounce(globalFilter);
  const { data, isLoading } = useChemicalMasters({ search });

  const columns = [
    col.accessor('chemicalCode', { header: 'Code', cell: (i) => <strong>{i.getValue()}</strong> }),
    col.accessor('chemicalName', { header: 'Name' }),
    col.accessor('casNumber', { header: 'CAS No.' }),
    col.accessor('grade', { header: 'Grade' }),
    col.accessor('storageCondition', { header: 'Storage Condition' }),
    col.accessor('defaultUom', { header: 'UOM' }),
    col.display({ id: 'actions', header: 'Actions', cell: (i) => (
      <Button size="small" onClick={() => nav(`/app/chemicals/${i.row.original.id}`)}>View</Button>
    )}),
  ];

  return (
    <PageWrapper title="Chemical Masters" breadcrumbs={[{ label: 'Chemicals' }]}
      action={
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => nav('/app/chemicals/new')}>Add Chemical</Button>
      }>
      <DataTableToolbar search={globalFilter} onSearch={setGlobalFilter} />
      <DataTable data={data?.content ?? []} columns={columns} isLoading={isLoading} pagination={pagination} onPaginationChange={setPagination} totalRows={data?.totalElements} />
    </PageWrapper>
  );
}
