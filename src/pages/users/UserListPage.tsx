import { Button, Avatar, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { createColumnHelper } from '@tanstack/react-table';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { DataTable } from '@/components/data-display/DataTable/DataTable';
import { DataTableToolbar } from '@/components/data-display/DataTable/DataTableToolbar';
import { StatusChip } from '@/components/data-display/StatusChip';
import { useTableState } from '@/hooks/useTableState';
import type { AppUser } from '@/types/user.types';

const col = createColumnHelper<AppUser>();
const MOCK: AppUser[] = [
  { id:1, username:'analyst01', fullName:'Alice Johnson', email:'alice@lab.com', department:'QC', status:'ACTIVE', tenantId:1, roles:['ANALYST'], createdAt:'2024-01-15' },
  { id:2, username:'qa_mgr',    fullName:'Bob Smith',    email:'bob@lab.com',   department:'QA', status:'ACTIVE', tenantId:1, roles:['QA_MANAGER'], createdAt:'2024-01-10' },
  { id:3, username:'store01',   fullName:'Carol White',  email:'carol@lab.com', department:'Store', status:'INACTIVE', tenantId:1, roles:['STOREKEEPER'], createdAt:'2024-02-01' },
];

export default function UserListPage() {
  const nav = useNavigate();
  const { globalFilter, setGlobalFilter } = useTableState();
  const columns = [
    col.accessor('fullName', { header: 'Name', cell: (i) => (
      <Box sx={{ display:'flex', alignItems:'center', gap:1.5 }}>
        <Avatar sx={{ width:28, height:28, bgcolor:'primary.main', fontSize:'0.75rem' }}>{i.getValue()?.charAt(0)}</Avatar>
        <strong>{i.getValue()}</strong>
      </Box>
    )}),
    col.accessor('username',   { header: 'Username' }),
    col.accessor('email',      { header: 'Email' }),
    col.accessor('department', { header: 'Department' }),
    col.accessor('roles',      { header: 'Roles', cell: (i) => i.getValue().join(', ') }),
    col.accessor('status',     { header: 'Status', cell: (i) => <StatusChip status={i.getValue()} /> }),
    col.display({ id:'actions', cell: (i) => <Button size="small" onClick={() => nav(`/app/users/${i.row.original.id}`)}>View</Button> }),
  ];
  return (
    <PageWrapper title="Users" breadcrumbs={[{ label:'Users' }]}
      action={<Button variant="contained" startIcon={<AddIcon />} onClick={() => nav('/app/users/new')}>Create User</Button>}>
      <DataTableToolbar search={globalFilter} onSearch={setGlobalFilter} />
      <DataTable data={MOCK} columns={columns} />
    </PageWrapper>
  );
}
