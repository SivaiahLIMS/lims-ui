import { Box, Typography, Breadcrumbs, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import type { ReactNode } from 'react';

interface Crumb { label: string; to?: string; }
interface Props { title: string; breadcrumbs?: Crumb[]; action?: ReactNode; children: ReactNode; }
export const PageWrapper = ({ title, breadcrumbs, action, children }: Props) => (
  <Box sx={{ p: 3 }}>
    {breadcrumbs && (
      <Breadcrumbs sx={{ mb: 1 }}>
        {breadcrumbs.map((c, i) => c.to
          ? <Link key={i} component={RouterLink} to={c.to} color="inherit" underline="hover" fontSize="0.8125rem">{c.label}</Link>
          : <Typography key={i} fontSize="0.8125rem" color="text.primary">{c.label}</Typography>
        )}
      </Breadcrumbs>
    )}
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <Typography variant="h5" fontWeight={700}>{title}</Typography>
      {action}
    </Box>
    {children}
  </Box>
);
