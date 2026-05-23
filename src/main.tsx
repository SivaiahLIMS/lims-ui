import '@/lib/i18n';
import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CircularProgress, Box } from '@mui/material';
import queryClient from '@/config/queryClient';
import theme from '@/theme';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<Box sx={{ display:'flex', height:'100vh', alignItems:'center', justifyContent:'center' }}><CircularProgress /></Box>}>
          <App />
        </Suspense>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
