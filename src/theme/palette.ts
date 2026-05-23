import type { PaletteOptions } from '@mui/material';

export const palette: PaletteOptions = {
  mode: 'light',
  primary:   { main: '#1565C0', light: '#5E92F3', dark: '#003C8F', contrastText: '#fff' },
  secondary: { main: '#00897B', light: '#4EBAAA', dark: '#005B4F', contrastText: '#fff' },
  error:     { main: '#C62828', light: '#EF5350', dark: '#8E0000' },
  warning:   { main: '#E65100', light: '#FF8330', dark: '#AC1900' },
  success:   { main: '#2E7D32', light: '#60AD5E', dark: '#005005' },
  info:      { main: '#0277BD', light: '#58A5F0', dark: '#004C8C' },
  grey: {
    50: '#F8FAFC', 100: '#F1F5F9', 200: '#E2E8F0', 300: '#CBD5E1',
    400: '#94A3B8', 500: '#64748B', 600: '#475569', 700: '#334155',
    800: '#1E293B', 900: '#0F172A',
  },
  background: { default: '#F8FAFC', paper: '#FFFFFF' },
  text: { primary: '#1E293B', secondary: '#475569', disabled: '#94A3B8' },
  divider: '#E2E8F0',
};
