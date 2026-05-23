import { Drawer, Box, Divider, Typography, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { sidebarConfig } from './sidebarConfig';
import { SidebarGroup } from './SidebarGroup';

const DRAWER_WIDTH = 240;

interface Props { open: boolean; onClose: () => void; }
export const Sidebar = ({ open, onClose }: Props) => (
  <Drawer variant="permanent" open={open}
    sx={{ width: open ? DRAWER_WIDTH : 72, flexShrink: 0, whiteSpace: 'nowrap', transition: 'width 0.2s',
      '& .MuiDrawer-paper': { width: open ? DRAWER_WIDTH : 72, overflowX: 'hidden', transition: 'width 0.2s',
        borderRight: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' } }}>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: open ? 'space-between' : 'center', px: open ? 2 : 1, py: 1.5, minHeight: 64 }}>
      {open && (
        <Box>
          <Typography variant="h6" fontWeight={700} color="primary.main" lineHeight={1}>LIMS</Typography>
          <Typography variant="caption" color="text.secondary">Lab Management</Typography>
        </Box>
      )}
      <IconButton size="small" onClick={onClose} sx={{ color: 'text.secondary' }}>
        {open ? <ChevronLeftIcon /> : <ChevronLeftIcon sx={{ transform: 'rotate(180deg)' }} />}
      </IconButton>
    </Box>
    <Divider />
    <Box sx={{ overflowY: 'auto', overflowX: 'hidden', flex: 1, py: 1 }}>
      {sidebarConfig.map((g) => <SidebarGroup key={g.group} group={g} open={open} />)}
    </Box>
  </Drawer>
);
