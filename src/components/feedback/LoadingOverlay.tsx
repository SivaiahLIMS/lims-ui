import { Backdrop, CircularProgress } from '@mui/material';
export const LoadingOverlay = ({ open }: { open: boolean }) => (
  <Backdrop open={open} sx={{ color: '#fff', zIndex: (t) => t.zIndex.drawer + 1 }}>
    <CircularProgress color="inherit" />
  </Backdrop>
);
