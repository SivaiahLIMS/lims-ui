import { useState } from 'react';
import { IconButton, Badge, Popover, Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';

export const NotificationBell = () => {
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
  const nav = useNavigate();
  return (
    <>
      <IconButton onClick={(e) => setAnchor(e.currentTarget)} color="inherit">
        <Badge badgeContent={3} color="error"><NotificationsIcon /></Badge>
      </IconButton>
      <Popover open={!!anchor} anchorEl={anchor} onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Box sx={{ width: 320, p: 0 }}>
          <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle2" fontWeight={600}>Notifications</Typography>
          </Box>
          <List dense>
            {['Calibration due: HPLC-001', 'OOS detected in WS-2024-001', 'Chemical expiring: NaOH-Batch-05'].map((msg, i) => (
              <ListItem key={i} divider><ListItemText primary={msg} primaryTypographyProps={{ fontSize: '0.8125rem' }} /></ListItem>
            ))}
          </List>
          <Box sx={{ p: 1.5, borderTop: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
            <Button size="small" onClick={() => { nav('/app/notifications'); setAnchor(null); }}>View All</Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
};
