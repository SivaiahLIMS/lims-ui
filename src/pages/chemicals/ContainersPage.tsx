import { Typography } from '@mui/material';
import { PageWrapper } from '@/components/layout/PageWrapper';
export default function ContainersPage() {
  return <PageWrapper title="Containers" breadcrumbs={[{ label: 'Chemicals', to: '/app/chemicals' }, { label: 'Containers' }]}><Typography color="text.secondary">Content coming soon.</Typography></PageWrapper>;
}
