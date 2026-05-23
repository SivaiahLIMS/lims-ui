import type { Components, Theme } from '@mui/material';

export const components: Components<Theme> = {
  MuiButton: {
    styleOverrides: {
      root: { borderRadius: 8, fontWeight: 600, padding: '8px 20px', boxShadow: 'none',
        '&:hover': { boxShadow: 'none' } },
      contained: { '&:hover': { boxShadow: '0 2px 8px rgba(0,0,0,0.15)' } },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: { borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
        border: '1px solid #E2E8F0' },
    },
  },
  MuiTableHead: {
    styleOverrides: {
      root: { '& .MuiTableCell-head': { backgroundColor: '#F1F5F9', fontWeight: 600,
        fontSize: '0.8125rem', color: '#334155', borderBottom: '2px solid #E2E8F0' } },
    },
  },
  MuiTableRow: {
    styleOverrides: {
      root: { '&:hover': { backgroundColor: '#F8FAFC' }, '&:last-child td': { borderBottom: 0 } },
    },
  },
  MuiChip: {
    styleOverrides: { root: { borderRadius: 6, fontWeight: 500, fontSize: '0.75rem' } },
  },
  MuiTextField: { defaultProps: { variant: 'outlined', size: 'small' } },
  MuiSelect: { defaultProps: { size: 'small' } },
  MuiPaper: {
    styleOverrides: {
      root: { backgroundImage: 'none' },
      elevation1: { boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
    },
  },
  MuiTooltip: {
    styleOverrides: { tooltip: { borderRadius: 6, fontSize: '0.8125rem' } },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: { borderRadius: 8, margin: '1px 8px', padding: '8px 12px',
        '&.Mui-selected': { fontWeight: 600 } },
    },
  },
  MuiDivider: { styleOverrides: { root: { borderColor: '#E2E8F0' } } },
};
