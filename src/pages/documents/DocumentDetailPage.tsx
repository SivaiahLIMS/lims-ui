import { Box, Button, Card, CardContent, Chip, Grid, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import UploadIcon from '@mui/icons-material/Upload';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { StatusChip } from '@/components/data-display/StatusChip';
import { SectionLoader } from '@/components/feedback/SectionLoader';
import { useDocument, useDocVersions, usePublishVersion, useRetireVersion } from '@/api/documents/documents.queries';
import { useUiStore } from '@/store/uiStore';
import type { DocumentVersion } from '@/types/document.types';

export default function DocumentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();
  const { showSnackbar } = useUiStore();
  const docId = Number(id);
  const { data: doc, isLoading: docLoading } = useDocument(docId);
  const { data: versions, isLoading: verLoading } = useDocVersions(docId);
  const { mutate: publish } = usePublishVersion(docId, 0);
  const { mutate: retire } = useRetireVersion(docId, 0);

  if (docLoading) return <SectionLoader />;

  return (
    <PageWrapper title={doc?.documentName ?? ''} breadcrumbs={[{ label: 'Documents', to: '/app/documents' }, { label: doc?.documentName ?? '' }]}
      action={<Button variant="contained" startIcon={<UploadIcon />} onClick={() => nav(`/app/documents/${id}/upload`)}>Upload Version</Button>}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>Document Info</Typography>
              {[{ label: 'Code', value: doc?.documentCode }, { label: 'Type', value: doc?.documentType }, { label: 'Created', value: doc?.createdAt ? new Date(doc.createdAt).toLocaleDateString() : '' }].map((r) => (
                <Box key={r.label} sx={{ py: 1, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">{r.label}</Typography>
                  <Typography variant="body2" fontWeight={500}>{r.value}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent sx={{ p: 0 }}>
              <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h6">Versions</Typography>
              </Box>
              {verLoading ? <SectionLoader rows={3} /> : (
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Version</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Uploaded By</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(versions ?? []).map((v: DocumentVersion) => (
                      <TableRow key={v.id}>
                        <TableCell><Chip label={`v${v.versionNo}`} size="small" /></TableCell>
                        <TableCell><StatusChip status={v.lifecycleState} /></TableCell>
                        <TableCell>{v.uploadedBy?.username ?? '—'}</TableCell>
                        <TableCell>{new Date(v.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          {v.lifecycleState === 'APPROVED' && <Button size="small" onClick={() => publish(undefined, { onSuccess: () => showSnackbar('Published', 'success') })}>Publish</Button>}
                          {v.lifecycleState === 'PUBLISHED' && <Button size="small" color="warning" onClick={() => retire(undefined, { onSuccess: () => showSnackbar('Retired', 'success') })}>Retire</Button>}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageWrapper>
  );
}
