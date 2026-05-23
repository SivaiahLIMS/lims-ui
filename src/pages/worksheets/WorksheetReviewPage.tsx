import { Box, Button, Card, CardContent, Typography, TextField, Chip, Table, TableHead, TableRow, TableCell, TableBody, Alert } from '@mui/material';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { useUiStore } from '@/store/uiStore';

export default function WorksheetReviewPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const { showSnackbar } = useUiStore();
  const [comments, setComments] = useState('');

  const handleApprove = () => { showSnackbar('Worksheet approved', 'success'); nav('/app/worksheets'); };
  const handleReject  = () => { showSnackbar('Worksheet rejected', 'warning'); nav('/app/worksheets'); };

  return (
    <PageWrapper title={`Review Worksheet WS-2024-00${id}`} breadcrumbs={[{ label: 'Worksheets', to: '/app/worksheets' }, { label: 'Review' }]}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Alert severity="info">Review all field values before approving. OOS fields are highlighted.</Alert>
        <Card>
          <CardContent>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Field</TableCell><TableCell>Value</TableCell><TableCell>Chemical</TableCell>
                  <TableCell>Instrument</TableCell><TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  { name: 'Sample Weight (g)', value: '0.1023', chem: 'None', instr: 'Balance-003', oos: false },
                  { name: 'Mobile Phase pH', value: '2.95', chem: 'TFA (0.1%)', instr: 'pH Meter-002', oos: true },
                  { name: 'Column Temperature', value: '30', chem: 'None', instr: 'HPLC-001', oos: false },
                ].map((row, i) => (
                  <TableRow key={i} sx={{ bgcolor: row.oos ? 'error.50' : 'inherit' }}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell><strong>{row.value}</strong></TableCell>
                    <TableCell>{row.chem}</TableCell>
                    <TableCell>{row.instr}</TableCell>
                    <TableCell>{row.oos ? <Chip label="OOS" color="error" size="small" /> : <Chip label="OK" color="success" size="small" />}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="subtitle2" gutterBottom>Reviewer Comments</Typography>
            <TextField multiline rows={3} fullWidth placeholder="Add review comments..." value={comments} onChange={(e) => setComments(e.target.value)} />
            <Box sx={{ display: 'flex', gap: 2, mt: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" color="error" onClick={handleReject}>Reject</Button>
              <Button variant="contained" color="success" onClick={handleApprove}>Approve</Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </PageWrapper>
  );
}
