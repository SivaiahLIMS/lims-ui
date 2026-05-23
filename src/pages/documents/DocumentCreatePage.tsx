import { Box, Button, Card, CardContent } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { FormTextField } from '@/components/forms/FormTextField';
import { FormSelect } from '@/components/forms/FormSelect';
import { useCreateDocument } from '@/api/documents/documents.queries';
import { useUiStore } from '@/store/uiStore';

const schema = z.object({
  documentCode: z.string().min(1, 'Required'),
  documentName: z.string().min(1, 'Required'),
  documentType: z.string().min(1, 'Required'),
  description:  z.string().optional(),
});
type Form = z.infer<typeof schema>;

const DOC_TYPES = [{ value: 'SOP', label: 'SOP' }, { value: 'METHOD', label: 'Method' }, { value: 'PROTOCOL', label: 'Protocol' }, { value: 'FORM', label: 'Form' }];

export default function DocumentCreatePage() {
  const nav = useNavigate();
  const { showSnackbar } = useUiStore();
  const { mutate, isPending } = useCreateDocument();
  const { control, handleSubmit } = useForm<Form>({ resolver: zodResolver(schema) });

  const onSubmit = (data: Form) => mutate(data, {
    onSuccess: (res) => { showSnackbar('Document created', 'success'); nav(`/app/documents/${res.id}`); },
    onError: () => showSnackbar('Failed to create document', 'error'),
  });

  return (
    <PageWrapper title="Create Document" breadcrumbs={[{ label: 'Documents', to: '/app/documents' }, { label: 'Create' }]}>
      <Card sx={{ maxWidth: 640 }}>
        <CardContent sx={{ p: 3 }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <FormTextField name="documentCode" control={control} label="Document Code" required />
            <FormTextField name="documentName" control={control} label="Document Name" required />
            <FormSelect name="documentType" control={control} label="Document Type" options={DOC_TYPES} required />
            <FormTextField name="description" control={control} label="Description" multiline rows={3} />
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" onClick={() => nav('/app/documents')}>Cancel</Button>
              <Button type="submit" variant="contained" disabled={isPending}>Create Document</Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
