import { Card, CardContent, Box, Typography } from '@mui/material';
import type { SvgIconComponent } from '@mui/icons-material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface Props { title: string; value: string | number; subtitle?: string; trend?: number; icon?: SvgIconComponent; color?: string; }
export const InfoCard = ({ title, value, subtitle, trend, icon: Icon, color = '#1565C0' }: Props) => (
  <Card>
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>{title}</Typography>
          <Typography variant="h4" fontWeight={700} sx={{ mt: 0.5, color }}>{value}</Typography>
          {subtitle && <Typography variant="caption" color="text.secondary">{subtitle}</Typography>}
          {trend !== undefined && (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, gap: 0.5 }}>
              {trend >= 0 ? <TrendingUpIcon fontSize="small" color="success" /> : <TrendingDownIcon fontSize="small" color="error" />}
              <Typography variant="caption" color={trend >= 0 ? 'success.main' : 'error.main'} fontWeight={600}>
                {Math.abs(trend)}%
              </Typography>
            </Box>
          )}
        </Box>
        {Icon && <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: `${color}18` }}><Icon sx={{ color, fontSize: 28 }} /></Box>}
      </Box>
    </CardContent>
  </Card>
);
