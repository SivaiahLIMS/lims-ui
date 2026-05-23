import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Menu, MenuItem, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
import { useUiStore } from '@/store/uiStore';
import { useAuthStore } from '@/store/authStore';
import { NotificationBell } from './NotificationBell';
import { useLogout } from '@/api/auth/auth.queries';

const DRAWER_WIDTH = 240;
const COLLAPSED_WIDTH = 72;

export const TopBar = () => {
  const { sidebarOpen, toggleSidebar } = useUiStore();
  const username = useAuthStore((s) => s.username);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const { mutate: logout } = useLogout();

  return (
    <AppBar position="fixed" elevation={0}
      sx={{ width: `calc(100% - ${sidebarOpen ? DRAWER_WIDTH : COLLAPSED_WIDTH}px)`,
        ml: `${sidebarOpen ? DRAWER_WIDTH : COLLAPSED_WIDTH}px`, transition: 'width 0.2s, margin-left 0.2s',
        bgcolor: 'background.paper', color: 'text.primary', borderBottom: '1px solid', borderColor: 'divider' }}>
      <Toolbar sx={{ minHeight: '64px !important' }}>
        <IconButton edge="start" onClick={toggleSidebar} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" fontWeight={600} sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <NotificationBell />
          <IconButton onClick={(e) => setAnchor(e.currentTarget)} sx={{ p: 0.5 }}>
            <Avatar sx={{ width: 34, height: 34, bgcolor: 'primary.main', fontSize: '0.875rem' }}>
              {username?.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
        </Box>
        <Menu anchorEl={anchor} open={!!anchor} onClose={() => setAnchor(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="body2" fontWeight={600}>{username}</Typography>
          </Box>
          <Divider />
          <MenuItem onClick={() => logout()} sx={{ gap: 1 }}>
            <LogoutIcon fontSize="small" /> Sign Out
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
