import { Box, Typography, Button } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
interface Props { message?: string; action?: string; onAction?: () => void; }
export const EmptyState = ({ message = 'No data available', action, onAction }: Props) => (
  <Box sx={{ textAlign: 'center', py: 8, px: 2 }}>
    <InboxIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
    <Typography color="text.secondary" mb={action ? 2 : 0}>{message}</Typography>
    {action && <Button variant="outlined" onClick={onAction}>{action}</Button>}
  </Box>
);
