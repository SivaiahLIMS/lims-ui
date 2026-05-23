import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { usePermission } from '@/hooks/usePermission';
import type { NavItem } from './sidebarConfig';

export const SidebarItem = ({ item, open }: { item: NavItem; open: boolean }) => {
  const allowed = usePermission(item.permission ?? '');
  if (item.permission && !allowed) return null;
  return (
    <NavLink to={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
      {({ isActive }) => (
        <ListItemButton selected={isActive} sx={{ minHeight: 44 }}>
          <ListItemIcon sx={{ minWidth: open ? 40 : 'unset', color: isActive ? 'primary.main' : 'inherit' }}>
            <item.icon fontSize="small" />
          </ListItemIcon>
          {open && <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: isActive ? 600 : 400 }} />}
        </ListItemButton>
      )}
    </NavLink>
  );
};
