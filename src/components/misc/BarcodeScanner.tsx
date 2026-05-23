import { useEffect, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { Box, Typography } from '@mui/material';

interface Props { onDecode: (result: string) => void; active?: boolean; }
export const BarcodeScanner = ({ onDecode, active = true }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const readerRef = useRef<BrowserMultiFormatReader | null>(null);

  useEffect(() => {
    if (!active) return;
    const reader = new BrowserMultiFormatReader();
    readerRef.current = reader;
    reader.decodeFromVideoDevice(undefined, videoRef.current!, (result, err) => {
      if (result) onDecode(result.getText());
      void err;
    });
    return () => { BrowserMultiFormatReader.releaseAllStreams(); };
  }, [active, onDecode]);

  return (
    <Box sx={{ position: 'relative', width: '100%', maxWidth: 400, mx: 'auto' }}>
      <video ref={videoRef} style={{ width: '100%', borderRadius: 8 }} />
      <Box sx={{ position: 'absolute', inset: 0, border: '2px solid', borderColor: 'primary.main',
        borderRadius: 1, pointerEvents: 'none', m: '20%' }} />
      <Typography variant="caption" display="block" textAlign="center" mt={1} color="text.secondary">
        Point camera at barcode
      </Typography>
    </Box>
  );
};
