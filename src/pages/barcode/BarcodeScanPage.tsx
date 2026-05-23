import { useState } from 'react';
import { Box, Card, CardContent, Tabs, Tab, TextField, Button, Typography, Alert } from '@mui/material';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { BarcodeScanner } from '@/components/misc/BarcodeScanner';

export default function BarcodeScanPage() {
  const [tab, setTab] = useState(0);
  const [manualCode, setManualCode] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const handleDecode = (code: string) => { setResult(code); };
  const handleManual = () => { if (manualCode.trim()) setResult(manualCode.trim()); };

  return (
    <PageWrapper title="Barcode Scanner" breadcrumbs={[{ label: 'Barcode Scanner' }]}>
      <Box sx={{ maxWidth: 600, mx: 'auto' }}>
        <Card>
          <CardContent>
            <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
              <Tab label="Camera Scan" /> <Tab label="Manual Entry" />
            </Tabs>
            {tab === 0 && <BarcodeScanner onDecode={handleDecode} active={tab === 0} />}
            {tab === 1 && (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField fullWidth label="Enter barcode manually" value={manualCode} onChange={(e) => setManualCode(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleManual()} />
                <Button variant="contained" onClick={handleManual} sx={{ whiteSpace: 'nowrap' }}>Look Up</Button>
              </Box>
            )}
            {result && (
              <Alert severity="success" sx={{ mt: 3 }}>
                <Typography variant="body2"><strong>Scanned:</strong> {result}</Typography>
              </Alert>
            )}
          </CardContent>
        </Card>
      </Box>
    </PageWrapper>
  );
}
