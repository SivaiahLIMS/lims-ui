import { Typography } from '@mui/material';
import { PageWrapper } from '@/components/layout/PageWrapper';
export default function CoaDetailPage() {
  return <PageWrapper title="CoaDetail" breadcrumbs={[{ label:'Samples', to:'/app/samples' },{ label:'CoaDetail' }]}><Typography color="text.secondary">Content coming soon.</Typography></PageWrapper>;
}
