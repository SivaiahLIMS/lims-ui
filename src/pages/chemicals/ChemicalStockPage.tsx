import { Typography } from '@mui/material';
import { PageWrapper } from '@/components/layout/PageWrapper';
export default function ChemicalStockPage() {
  return <PageWrapper title="ChemicalStock" breadcrumbs={[{ label: 'Chemicals', to: '/app/chemicals' }, { label: 'ChemicalStock' }]}><Typography color="text.secondary">Content coming soon.</Typography></PageWrapper>;
}
