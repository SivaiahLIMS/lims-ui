import { Box, Typography, List } from '@mui/material';
import { SidebarItem } from './SidebarItem';
import type { NavGroup } from './sidebarConfig';

export const SidebarGroup = ({ group, open }: { group: NavGroup; open: boolean }) => (
  <Box sx={{ mb: 1 }}>
    {open && <Typography variant="caption" sx={{ px: 2.5, py: 1, display: 'block', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'text.disabled', fontSize: '0.7rem' }}>{group.group}</Typography>}
    <List dense disablePadding>
      {group.items.map((item) => <SidebarItem key={item.path} item={item} open={open} />)}
    </List>
  </Box>
);
