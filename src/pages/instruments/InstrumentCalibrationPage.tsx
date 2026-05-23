import { Typography } from '@mui/material';
import { PageWrapper } from '@/components/layout/PageWrapper';
export default function InstrumentCalibrationPage() {
  return <PageWrapper title="InstrumentCalibration" breadcrumbs={[{ label: 'Instruments', to: '/app/instruments' }, { label: 'InstrumentCalibration' }]}><Typography color="text.secondary">Content coming soon.</Typography></PageWrapper>;
}
