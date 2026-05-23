import { Box, Button, Card, CardContent } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { FormTextField } from '@/components/forms/FormTextField';
import { FormSelect } from '@/components/forms/FormSelect';
import { useCreateChemical } from '@/api/chemicals/chemicals.queries';
import { useUiStore } from '@/store/uiStore';

const schema = z.object({
  chemicalCode: z.string().min(1, 'Required'), chemicalName: z.string().min(1, 'Required'),
  casNumber: z.string().optional(), grade: z.string().optional(),
  manufacturer: z.string().optional(), hazardClass: z.string().optional(),
  storageCondition: z.string().optional(), defaultUom: z.string().optional(),
  description: z.string().optional(),
});
type Form = z.infer<typeof schema>;

const GRADES = [{ value: 'AR', label: 'AR (Analytical Reagent)' }, { value: 'LR', label: 'LR (Laboratory Reagent)' }, { value: 'HPLC', label: 'HPLC Grade' }, { value: 'USP', label: 'USP Grade' }];
const STORAGE = [{ value: 'ROOM_TEMP', label: 'Room Temperature' }, { value: '2_8C', label: '2–8°C (Refrigerated)' }, { value: 'MINUS_20C', label: '-20°C (Frozen)' }, { value: 'FLAMMABLE', label: 'Flammable Cabinet' }];
const UOMS = [{ value: 'mL', label: 'mL' }, { value: 'L', label: 'L' }, { value: 'g', label: 'g' }, { value: 'Kg', label: 'Kg' }, { value: 'mg', label: 'mg' }];

export default function ChemicalCreatePage() {
  const nav = useNavigate();
  const { showSnackbar } = useUiStore();
  const { mutate, isPending } = useCreateChemical();
  const { control, handleSubmit } = useForm<Form>({ resolver: zodResolver(schema) });

  const onSubmit = (data: Form) => mutate(data, {
    onSuccess: () => { showSnackbar('Chemical created', 'success'); nav('/app/chemicals'); },
    onError: () => showSnackbar('Failed to create chemical', 'error'),
  });

  return (
    <PageWrapper title="Add Chemical Master" breadcrumbs={[{ label: 'Chemicals', to: '/app/chemicals' }, { label: 'Create' }]}>
      <Card sx={{ maxWidth: 720 }}>
        <CardContent sx={{ p: 3 }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2.5 }}>
            <FormTextField name="chemicalCode" control={control} label="Chemical Code" required />
            <FormTextField name="chemicalName" control={control} label="Chemical Name" required />
            <FormTextField name="casNumber" control={control} label="CAS Number" />
            <FormSelect name="grade" control={control} label="Grade" options={GRADES} />
            <FormTextField name="manufacturer" control={control} label="Manufacturer" />
            <FormTextField name="hazardClass" control={control} label="Hazard Class" />
            <FormSelect name="storageCondition" control={control} label="Storage Condition" options={STORAGE} />
            <FormSelect name="defaultUom" control={control} label="Default UOM" options={UOMS} />
            <Box sx={{ gridColumn: '1 / -1' }}>
              <FormTextField name="description" control={control} label="Description" multiline rows={3} />
            </Box>
            <Box sx={{ gridColumn: '1 / -1', display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" onClick={() => nav('/app/chemicals')}>Cancel</Button>
              <Button type="submit" variant="contained" disabled={isPending}>Save Chemical</Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
