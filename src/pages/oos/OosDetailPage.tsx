import { Box, Card, CardContent, Typography, TextField, Button, Grid, Chip, Alert } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { FormFileUpload } from '@/components/forms/FormFileUpload';
import { useUiStore } from '@/store/uiStore';
import { useForm } from 'react-hook-form';

export default function OosDetailPage() {
  const { id } = useParams();
  const { showSnackbar } = useUiStore();
  const [rootCause, setRootCause] = useState('');
  const { control } = useForm();

  return (
    <PageWrapper title={`OOS Investigation #${id}`} breadcrumbs={[{ label: 'OOS', to: '/app/oos' }, { label: `Case #${id}` }]}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>OOS Details</Typography>
              {[{ label: 'Test', value: 'Mobile Phase pH' }, { label: 'Value', value: '2.95' }, { label: 'Limit', value: '3.0 – 3.2' }, { label: 'Deviation', value: '-0.05' }].map((r) => (
                <Box key={r.label} sx={{ py: 1, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">{r.label}</Typography>
                  <Typography variant="body2" fontWeight={500}>{r.value}</Typography>
                </Box>
              ))}
              <Box sx={{ mt: 2 }}><Chip label="INVESTIGATING" color="info" /></Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Alert severity="warning" sx={{ mb: 2 }}>Document root cause analysis and attach supporting evidence.</Alert>
              <Typography variant="subtitle2" gutterBottom>Root Cause Analysis</Typography>
              <TextField multiline rows={5} fullWidth placeholder="Describe root cause..." value={rootCause} onChange={(e) => setRootCause(e.target.value)} />
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Attachments</Typography>
                <FormFileUpload name="attachments" control={control} label="Attach evidence files" multiple />
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'flex-end' }}>
                <Button variant="outlined" color="error">Close as Invalid</Button>
                <Button variant="contained" onClick={() => showSnackbar('Investigation saved', 'success')}>Save Investigation</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageWrapper>
  );
}
