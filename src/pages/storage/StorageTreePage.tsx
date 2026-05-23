import { Box, Card, CardContent, Typography, List, ListItemButton, ListItemText, ListItemIcon, Chip, Grid, LinearProgress, Button } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { useState } from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';

const TREE = [
  { id: 1, name: 'Lab Room A', type: 'ROOM', capacity: 100, used: 72, children: [
    { id: 11, name: 'Shelf A-1', type: 'SHELF', capacity: 20, used: 15, children: [
      { id: 111, name: 'Rack A-1-1', type: 'RACK', capacity: 8, used: 5, children: [] },
      { id: 112, name: 'Rack A-1-2', type: 'RACK', capacity: 8, used: 7, children: [] },
    ]},
    { id: 12, name: 'Shelf A-2', type: 'SHELF', capacity: 20, used: 12, children: [] },
  ]},
  { id: 2, name: 'Cold Storage B', type: 'ROOM', capacity: 50, used: 38, children: [
    { id: 21, name: 'Refrigerator B-1', type: 'FRIDGE', capacity: 25, used: 23, children: [] },
    { id: 22, name: 'Freezer B-2', type: 'FREEZER', capacity: 25, used: 15, children: [] },
  ]},
];

interface Node { id: number; name: string; type: string; capacity: number; used: number; children: Node[]; }
const NodeItem = ({ node, depth = 0 }: { node: Node; depth?: number }) => {
  const [open, setOpen] = useState(false);
  const pct = Math.round((node.used / node.capacity) * 100);
  return (
    <>
      <ListItemButton sx={{ pl: 2 + depth * 3 }} onClick={() => setOpen(!open)}>
        <ListItemIcon sx={{ minWidth: 32 }}>{open ? <FolderOpenIcon color="primary" fontSize="small" /> : <FolderIcon color="primary" fontSize="small" />}</ListItemIcon>
        <ListItemText primary={node.name} secondary={node.type} primaryTypographyProps={{ fontWeight: 500 }} secondaryTypographyProps={{ fontSize: '0.75rem' }} />
        <Chip label={`${node.used}/${node.capacity}`} size="small" color={pct > 90 ? 'error' : pct > 70 ? 'warning' : 'success'} />
      </ListItemButton>
      {open && node.children.map((child) => <NodeItem key={child.id} node={child} depth={depth + 1} />)}
    </>
  );
};

export default function StorageTreePage() {
  return (
    <PageWrapper title="Storage Hierarchy" breadcrumbs={[{ label: 'Storage' }]}
      action={<Button variant="contained">Place Container</Button>}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent sx={{ p: 0 }}>
              <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h6">Locations</Typography>
              </Box>
              <List dense disablePadding>
                {TREE.map((node) => <NodeItem key={node.id} node={node} />)}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Capacity Summary</Typography>
              {TREE.map((loc) => (
                <Box key={loc.id} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" fontWeight={500}>{loc.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{Math.round((loc.used/loc.capacity)*100)}%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={Math.round((loc.used/loc.capacity)*100)} color={loc.used/loc.capacity > 0.9 ? 'error' : 'primary'} sx={{ height: 8, borderRadius: 4 }} />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageWrapper>
  );
}
