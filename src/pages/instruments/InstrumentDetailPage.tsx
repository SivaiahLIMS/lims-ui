import { Typography } from '@mui/material';
import { PageWrapper } from '@/components/layout/PageWrapper';
export default function InstrumentDetailPage() {
  return <PageWrapper title="InstrumentDetail" breadcrumbs={[{ label: 'Instruments', to: '/app/instruments' }, { label: 'InstrumentDetail' }]}><Typography color="text.secondary">Content coming soon.</Typography></PageWrapper>;
}
