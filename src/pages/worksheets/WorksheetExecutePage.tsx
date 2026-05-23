import { useState, useCallback } from 'react';
import { Box, Button, Card, CardContent, Typography, TextField, Select, MenuItem, FormControl, InputLabel,
  Dialog, DialogTitle, DialogContent, DialogActions, Alert, Chip, Tooltip, IconButton, LinearProgress } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import EditIcon from '@mui/icons-material/Edit';
import HistoryIcon from '@mui/icons-material/History';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { useUiStore } from '@/store/uiStore';

interface FieldEntry {
  fieldId: string; fieldName: string; fieldType: string; unit?: string;
  minValue?: number; maxValue?: number; required?: boolean;
}
interface FieldState {
  value: string; chemicalId: string; instrumentId: string; usedAmount: string;
  locked: boolean; isOos: boolean;
}
interface EditDialog { open: boolean; fieldId: string; oldValue: string; reason: string; }

const MOCK_FIELDS: FieldEntry[] = [
  { fieldId: 'F001', fieldName: 'Sample Weight (g)', fieldType: 'number', unit: 'g', minValue: 0.09, maxValue: 0.11 },
  { fieldId: 'F002', fieldName: 'Mobile Phase pH', fieldType: 'number', unit: 'pH', minValue: 3.0, maxValue: 3.2 },
  { fieldId: 'F003', fieldName: 'Column Temperature (°C)', fieldType: 'number', unit: '°C', minValue: 25, maxValue: 35 },
  { fieldId: 'F004', fieldName: 'Analyst Observation', fieldType: 'text' },
];
const MOCK_CHEMICALS = [{ value: 'C001', label: 'Acetonitrile (HPLC Grade)' }, { value: 'C002', label: 'Water (HPLC Grade)' }, { value: 'C003', label: 'TFA (0.1%)' }];
const MOCK_INSTRUMENTS = [{ value: 'I001', label: 'HPLC-001 (Agilent 1260)' }, { value: 'I002', label: 'Balance-003 (Mettler)' }, { value: 'I003', label: 'pH Meter-002' }];

export default function WorksheetExecutePage() {
  const { showSnackbar } = useUiStore();
  const [fieldStates, setFieldStates] = useState<Record<string, FieldState>>(() =>
    Object.fromEntries(MOCK_FIELDS.map((f) => [f.fieldId, { value: '', chemicalId: '', instrumentId: '', usedAmount: '', locked: false, isOos: false }]))
  );
  const [editDialog, setEditDialog] = useState<EditDialog>({ open: false, fieldId: '', oldValue: '', reason: '' });
  const [oosDialog, setOosDialog] = useState<{ open: boolean; field: FieldEntry | null }>({ open: false, field: null });
  const [progress, setProgress] = useState(0);

  const checkOos = useCallback((field: FieldEntry, value: string): boolean => {
    if (field.fieldType !== 'number') return false;
    const num = parseFloat(value);
    if (isNaN(num)) return false;
    if (field.minValue !== undefined && num < field.minValue) return true;
    if (field.maxValue !== undefined && num > field.maxValue) return true;
    return false;
  }, []);

  const handleValueChange = (fieldId: string, value: string) => {
    setFieldStates((prev) => ({ ...prev, [fieldId]: { ...prev[fieldId], value } }));
  };

  const handleValueBlur = (field: FieldEntry) => {
    const state = fieldStates[field.fieldId];
    if (!state.value.trim() || state.locked) return;
    const isOos = checkOos(field, state.value);
    setFieldStates((prev) => ({ ...prev, [field.fieldId]: { ...prev[field.fieldId], locked: true, isOos } }));
    if (isOos) setOosDialog({ open: true, field });
    const locked = Object.values({ ...fieldStates, [field.fieldId]: { ...fieldStates[field.fieldId], locked: true } }).filter((s) => s.locked).length;
    setProgress(Math.round((locked / MOCK_FIELDS.length) * 100));
  };

  const handleEditRequest = (fieldId: string) => {
    setEditDialog({ open: true, fieldId, oldValue: fieldStates[fieldId].value, reason: '' });
  };

  const handleEditConfirm = () => {
    setFieldStates((prev) => ({ ...prev, [editDialog.fieldId]: { ...prev[editDialog.fieldId], locked: false } }));
    setEditDialog({ open: false, fieldId: '', oldValue: '', reason: '' });
    showSnackbar('Field unlocked for editing. Reason recorded.', 'info');
  };

  const handleSubmit = () => {
    const incomplete = MOCK_FIELDS.filter((f) => f.required && !fieldStates[f.fieldId].locked);
    if (incomplete.length) { showSnackbar(`${incomplete.length} required field(s) not completed`, 'warning'); return; }
    showSnackbar('Worksheet submitted for review', 'success');
  };

  return (
    <PageWrapper title="Worksheet Execution" breadcrumbs={[{ label: 'Worksheets', to: '/app/worksheets' }, { label: 'Execute' }]}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">Completion</Typography>
          <Typography variant="body2" fontWeight={600}>{progress}%</Typography>
        </Box>
        <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4 }} />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {MOCK_FIELDS.map((field) => {
          const state = fieldStates[field.fieldId];
          return (
            <Card key={field.fieldId} sx={{ border: state.isOos ? '2px solid' : '1px solid', borderColor: state.isOos ? 'error.main' : 'divider' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>{field.fieldName}</Typography>
                    {field.unit && <Typography variant="caption" color="text.secondary">Unit: {field.unit}</Typography>}
                    {field.minValue !== undefined && <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>Range: {field.minValue} – {field.maxValue}</Typography>}
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    {state.locked && <Chip icon={<LockIcon />} label="Locked" size="small" color="default" />}
                    {state.isOos && <Chip icon={<WarningAmberIcon />} label="OOS" size="small" color="error" />}
                    {state.locked && !state.isOos && <Chip icon={<CheckCircleIcon />} label="OK" size="small" color="success" />}
                    <Tooltip title="Audit Trail"><IconButton size="small"><HistoryIcon fontSize="small" /></IconButton></Tooltip>
                  </Box>
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr auto' }, gap: 2, alignItems: 'center' }}>
                  <TextField size="small" label="Field Value" placeholder="--"
                    value={state.value} disabled={state.locked}
                    onChange={(e) => handleValueChange(field.fieldId, e.target.value)}
                    onBlur={() => handleValueBlur(field)}
                    sx={{ '& .MuiInputBase-root.Mui-disabled': { bgcolor: '#F1F5F9' } }} />

                  <FormControl size="small" disabled={state.locked}>
                    <InputLabel>Chemical</InputLabel>
                    <Select value={state.chemicalId} label="Chemical" onChange={(e) => setFieldStates((p) => ({ ...p, [field.fieldId]: { ...p[field.fieldId], chemicalId: e.target.value } }))}
                      sx={{ '& .Mui-disabled': { bgcolor: '#F1F5F9' } }}>
                      <MenuItem value=""><em>None</em></MenuItem>
                      {MOCK_CHEMICALS.map((c) => <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>)}
                    </Select>
                  </FormControl>

                  <FormControl size="small" disabled={state.locked}>
                    <InputLabel>Instrument</InputLabel>
                    <Select value={state.instrumentId} label="Instrument" onChange={(e) => setFieldStates((p) => ({ ...p, [field.fieldId]: { ...p[field.fieldId], instrumentId: e.target.value } }))}>
                      <MenuItem value=""><em>None</em></MenuItem>
                      {MOCK_INSTRUMENTS.map((i) => <MenuItem key={i.value} value={i.value}>{i.label}</MenuItem>)}
                    </Select>
                  </FormControl>

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {state.locked && <Tooltip title="Request Edit"><IconButton size="small" color="warning" onClick={() => handleEditRequest(field.fieldId)}><EditIcon fontSize="small" /></IconButton></Tooltip>}
                    <Tooltip title="Scan Container"><IconButton size="small" color="primary"><QrCodeScannerIcon fontSize="small" /></IconButton></Tooltip>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
        <Button variant="outlined">Save Draft</Button>
        <Button variant="contained" onClick={handleSubmit}>Submit for Review</Button>
      </Box>

      {/* Edit Reason Dialog */}
      <Dialog open={editDialog.open} onClose={() => setEditDialog((p) => ({ ...p, open: false }))} maxWidth="sm" fullWidth>
        <DialogTitle>Reason for Edit</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>Editing a locked field requires a documented reason for audit purposes.</Alert>
          <Typography variant="body2" color="text.secondary" gutterBottom>Current value: <strong>{editDialog.oldValue}</strong></Typography>
          <TextField fullWidth multiline rows={3} label="Reason for edit" value={editDialog.reason}
            onChange={(e) => setEditDialog((p) => ({ ...p, reason: e.target.value }))} sx={{ mt: 2 }} />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setEditDialog((p) => ({ ...p, open: false }))}>Cancel</Button>
          <Button variant="contained" disabled={!editDialog.reason.trim()} onClick={handleEditConfirm}>Confirm Edit</Button>
        </DialogActions>
      </Dialog>

      {/* OOS Detection Dialog */}
      <Dialog open={oosDialog.open} onClose={() => setOosDialog({ open: false, field: null })} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: 'error.main' }}>⚠ Out of Specification Detected</DialogTitle>
        <DialogContent>
          <Alert severity="error" sx={{ mb: 2 }}>
            <strong>{oosDialog.field?.fieldName}</strong> is outside the specified limits.<br />
            Expected: {oosDialog.field?.minValue} – {oosDialog.field?.maxValue} {oosDialog.field?.unit}
          </Alert>
          <Typography variant="body2">An OOS investigation task will be created automatically upon submission.</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOosDialog({ open: false, field: null })}>Acknowledge</Button>
          <Button variant="contained" color="error" onClick={() => setOosDialog({ open: false, field: null })}>Create Investigation</Button>
        </DialogActions>
      </Dialog>
    </PageWrapper>
  );
}
