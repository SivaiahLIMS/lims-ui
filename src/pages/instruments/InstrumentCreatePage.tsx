import { Box, Button, Card, CardContent } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { FormTextField } from '@/components/forms/FormTextField';
import { FormSelect } from '@/components/forms/FormSelect';
import { useCreateInstrument } from '@/api/instruments/instruments.queries';
import { useUiStore } from '@/store/uiStore';

const schema = z.object({
  instrumentCode: z.string().min(1, 'Required'), instrumentName: z.string().min(1, 'Required'),
  model: z.string().optional(), serialNumber: z.string().optional(), manufacturer: z.string().optional(),
  calibrationFrequency: z.string().optional(), status: z.string().optional(),
});
type Form = z.infer<typeof schema>;
const FREQ = [{ value: 'DAILY', label: 'Daily' }, { value: 'WEEKLY', label: 'Weekly' }, { value: 'MONTHLY', label: 'Monthly' }, { value: 'QUARTERLY', label: 'Quarterly' }, { value: 'ANNUALLY', label: 'Annually' }];
const STATUS = [{ value: 'AVAILABLE', label: 'Available' }, { value: 'OUT_OF_SERVICE', label: 'Out of Service' }];

export default function InstrumentCreatePage() {
  const nav = useNavigate();
  const { showSnackbar } = useUiStore();
  const { mutate, isPending } = useCreateInstrument();
  const { control, handleSubmit } = useForm<Form>({ resolver: zodResolver(schema) });
  const onSubmit = (data: Form) => mutate(data, {
    onSuccess: () => { showSnackbar('Instrument created', 'success'); nav('/app/instruments'); },
    onError: () => showSnackbar('Failed to create instrument', 'error'),
  });
  return (
    <PageWrapper title="Add Instrument" breadcrumbs={[{ label: 'Instruments', to: '/app/instruments' }, { label: 'Create' }]}>
      <Card sx={{ maxWidth: 720 }}>
        <CardContent sx={{ p: 3 }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2.5 }}>
            <FormTextField name="instrumentCode" control={control} label="Instrument Code" required />
            <FormTextField name="instrumentName" control={control} label="Instrument Name" required />
            <FormTextField name="model" control={control} label="Model" />
            <FormTextField name="serialNumber" control={control} label="Serial Number" />
            <FormTextField name="manufacturer" control={control} label="Manufacturer" />
            <FormSelect name="calibrationFrequency" control={control} label="Calibration Frequency" options={FREQ} />
            <FormSelect name="status" control={control} label="Status" options={STATUS} />
            <Box sx={{ gridColumn: '1 / -1', display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" onClick={() => nav('/app/instruments')}>Cancel</Button>
              <Button type="submit" variant="contained" disabled={isPending}>Save Instrument</Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
