import { Typography } from '@mui/material';
import { PageWrapper } from '@/components/layout/PageWrapper';
export default function ChemicalDetailPage() {
  return <PageWrapper title="ChemicalDetail" breadcrumbs={[{ label: 'Chemicals', to: '/app/chemicals' }, { label: 'ChemicalDetail' }]}><Typography color="text.secondary">Content coming soon.</Typography></PageWrapper>;
}
