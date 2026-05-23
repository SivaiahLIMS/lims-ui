import { Box, Skeleton } from '@mui/material';
export const SectionLoader = ({ rows = 5 }: { rows?: number }) => (
  <Box sx={{ p: 2 }}>
    {Array.from({ length: rows }).map((_, i) => <Skeleton key={i} height={48} sx={{ mb: 1 }} />)}
  </Box>
);
