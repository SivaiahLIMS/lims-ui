import { Card, CardContent, Typography, Box } from '@mui/material';
import { SectionLoader } from '@/components/feedback/SectionLoader';
interface Props { title: string; children: React.ReactNode; isLoading?: boolean; action?: React.ReactNode; }
export const ChartContainer = ({ title, children, isLoading, action }: Props) => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
        <Typography variant="h6">{title}</Typography>
        {action}
      </Box>
      {isLoading ? <SectionLoader rows={3} /> : children}
    </CardContent>
  </Card>
);
