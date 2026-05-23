import type { TypographyVariantsOptions } from '@mui/material/styles';

export const typography: TypographyVariantsOptions = {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  h1: { fontSize: '2.25rem', fontWeight: 700, lineHeight: 1.2 },
  h2: { fontSize: '1.875rem', fontWeight: 700, lineHeight: 1.2 },
  h3: { fontSize: '1.5rem',   fontWeight: 600, lineHeight: 1.2 },
  h4: { fontSize: '1.25rem',  fontWeight: 600, lineHeight: 1.2 },
  h5: { fontSize: '1.125rem', fontWeight: 600, lineHeight: 1.2 },
  h6: { fontSize: '1rem',     fontWeight: 600, lineHeight: 1.2 },
  body1: { fontSize: '0.9375rem', lineHeight: 1.6 },
  body2: { fontSize: '0.875rem',  lineHeight: 1.5 },
  caption: { fontSize: '0.75rem', lineHeight: 1.4, color: '#64748B' },
  button: { fontWeight: 600, textTransform: 'none', letterSpacing: '0.01em' },
};
