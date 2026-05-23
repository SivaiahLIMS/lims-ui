import { Box, Button, Card, CardContent, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useNavigate } from 'react-router-dom';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { FormFileUpload } from '@/components/forms/FormFileUpload';
import { useUploadDocxVersion } from '@/api/documents/documents.queries';
import { useUiStore } from '@/store/uiStore';

const schema = z.object({ file: z.instanceof(File, { message: 'Please select a .docx file' }) });
type Form = z.infer<typeof schema>;

export default function DocumentUploadPage() {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();
  const { showSnackbar } = useUiStore();
  const { mutate: upload, isPending } = useUploadDocxVersion(Number(id));
  const { control, handleSubmit } = useForm<Form>({ resolver: zodResolver(schema) });

  const onSubmit = (data: Form) => {
    const form = new FormData();
    form.append('file', data.file);
    upload(form, {
      onSuccess: () => { showSnackbar('Version uploaded successfully', 'success'); nav(`/app/documents/${id}`); },
      onError: () => showSnackbar('Upload failed', 'error'),
    });
  };

  return (
    <PageWrapper title="Upload DOCX Version" breadcrumbs={[{ label: 'Documents', to: '/app/documents' }, { label: 'Upload' }]}>
      <Card sx={{ maxWidth: 600 }}>
        <CardContent sx={{ p: 3 }}>
          <Alert severity="info" sx={{ mb: 3 }}>Upload a .docx worksheet template. The system will parse field definitions automatically.</Alert>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <FormFileUpload name="file" control={control} label="Drop .docx file here or click to browse" accept={{ 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] }} />
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" onClick={() => nav(`/app/documents/${id}`)}>Cancel</Button>
              <Button type="submit" variant="contained" disabled={isPending}>Upload</Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
