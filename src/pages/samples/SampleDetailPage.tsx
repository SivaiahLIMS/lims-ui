import { Typography } from '@mui/material';
import { PageWrapper } from '@/components/layout/PageWrapper';
export default function SampleDetailPage() {
  return <PageWrapper title="SampleDetail" breadcrumbs={[{ label:'Samples', to:'/app/samples' },{ label:'SampleDetail' }]}><Typography color="text.secondary">Content coming soon.</Typography></PageWrapper>;
}
