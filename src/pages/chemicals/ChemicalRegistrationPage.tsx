import { Typography } from '@mui/material';
import { PageWrapper } from '@/components/layout/PageWrapper';
export default function ChemicalRegistrationPage() {
  return <PageWrapper title="ChemicalRegistration" breadcrumbs={[{ label: 'Chemicals', to: '/app/chemicals' }, { label: 'ChemicalRegistration' }]}><Typography color="text.secondary">Content coming soon.</Typography></PageWrapper>;
}
