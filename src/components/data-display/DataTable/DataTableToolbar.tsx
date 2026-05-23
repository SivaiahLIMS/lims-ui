import { Box, TextField, InputAdornment, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';

interface Props { search: string; onSearch: (v: string) => void; onExport?: () => void; children?: React.ReactNode; }
export const DataTableToolbar = ({ search, onSearch, onExport, children }: Props) => (
  <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap', alignItems: 'center' }}>
    <TextField placeholder="Search..." value={search} onChange={(e) => onSearch(e.target.value)} size="small"
      InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
      sx={{ minWidth: 260 }} />
    {children}
    {onExport && (
      <Button variant="outlined" size="small" startIcon={<DownloadIcon />} onClick={onExport} sx={{ ml: 'auto' }}>Export</Button>
    )}
  </Box>
);
