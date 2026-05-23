import { Typography } from '@mui/material';
import { PageWrapper } from '@/components/layout/PageWrapper';
export default function UserDetailPage() {
  return <PageWrapper title="User Profile" breadcrumbs={[{ label:'Users', to:'/app/users' },{ label:'Profile' }]}><Typography color="text.secondary">User profile details coming soon.</Typography></PageWrapper>;
}
