import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar/Sidebar';
import { TopBar } from './TopBar/TopBar';
import { useUiStore } from '@/store/uiStore';

const DRAWER_WIDTH = 240;
const COLLAPSED_WIDTH = 72;

export const AppShell = () => {
  const { sidebarOpen, setSidebarOpen } = useUiStore();
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(!sidebarOpen)} />
      <Box component="main" sx={{ flexGrow: 1, ml: `${sidebarOpen ? DRAWER_WIDTH : COLLAPSED_WIDTH}px`, transition: 'margin-left 0.2s', mt: '64px' }}>
        <TopBar />
        <Outlet />
      </Box>
    </Box>
  );
};
