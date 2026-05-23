import { Box, Button, Card, CardContent } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { FormTextField } from '@/components/forms/FormTextField';
import { FormSelect } from '@/components/forms/FormSelect';
import { FormDatePicker } from '@/components/forms/FormDatePicker';
import { useCreateSample } from '@/api/samples/samples.queries';
import { useUiStore } from '@/store/uiStore';

const schema = z.object({
  sampleNumber: z.string().min(1,'Required'), product: z.string().min(1,'Required'),
  batch: z.string().min(1,'Required'), sampleType: z.string().min(1,'Required'),
  receivedDate: z.string().optional(),
});
type Form = z.infer<typeof schema>;
const TYPES = [{ value:'FINISHED_PRODUCT',label:'Finished Product' },{ value:'RAW_MATERIAL',label:'Raw Material' },{ value:'IN_PROCESS',label:'In-Process' },{ value:'STABILITY',label:'Stability' }];

export default function SampleRegisterPage() {
  const nav = useNavigate();
  const { showSnackbar } = useUiStore();
  const { mutate, isPending } = useCreateSample();
  const { control, handleSubmit } = useForm<Form>({ resolver: zodResolver(schema) });
  const onSubmit = (data: Form) => mutate(data, {
    onSuccess: () => { showSnackbar('Sample registered', 'success'); nav('/app/samples'); },
    onError: () => showSnackbar('Registration failed', 'error'),
  });
  return (
    <PageWrapper title="Register Sample" breadcrumbs={[{ label:'Samples', to:'/app/samples' },{ label:'Register' }]}>
      <Card sx={{ maxWidth:640 }}>
        <CardContent sx={{ p:3 }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2.5 }}>
            <FormTextField name="sampleNumber" control={control} label="Sample Number" required />
            <FormSelect    name="sampleType"   control={control} label="Sample Type"   options={TYPES} required />
            <FormTextField name="product"      control={control} label="Product"        required />
            <FormTextField name="batch"        control={control} label="Batch Number"   required />
            <Box sx={{ gridColumn:'1 / -1' }}>
              <FormDatePicker name="receivedDate" control={control} label="Received Date" />
            </Box>
            <Box sx={{ gridColumn:'1 / -1', display:'flex', gap:2, justifyContent:'flex-end' }}>
              <Button variant="outlined" onClick={() => nav('/app/samples')}>Cancel</Button>
              <Button type="submit" variant="contained" disabled={isPending}>Register Sample</Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
