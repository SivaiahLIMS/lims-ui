import { Snackbar, Alert } from '@mui/material';
import { useUiStore } from '@/store/uiStore';

export const GlobalSnackbar = () => {
  const { snackbars, dismissSnackbar } = useUiStore();
  return (
    <>
      {snackbars.map((s, i) => (
        <Snackbar
          key={s.id}
          open
          autoHideDuration={4000}
          onClose={() => dismissSnackbar(s.id)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          style={{ bottom: 24 + i * 72 }}
        >
          <Alert severity={s.severity} onClose={() => dismissSnackbar(s.id)} variant="filled" sx={{ minWidth: 300 }}>
            {s.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};
