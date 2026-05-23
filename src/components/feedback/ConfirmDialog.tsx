import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

interface Props {
  open: boolean; title: string; message: string;
  onConfirm: () => void; onCancel: () => void;
  confirmText?: string; cancelText?: string; danger?: boolean;
}
export const ConfirmDialog = ({ open, title, message, onConfirm, onCancel, confirmText = 'Confirm', cancelText = 'Cancel', danger }: Props) => (
  <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent><DialogContentText>{message}</DialogContentText></DialogContent>
    <DialogActions sx={{ p: 2, gap: 1 }}>
      <Button onClick={onCancel} variant="outlined">{cancelText}</Button>
      <Button onClick={onConfirm} variant="contained" color={danger ? 'error' : 'primary'}>{confirmText}</Button>
    </DialogActions>
  </Dialog>
);
