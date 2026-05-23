import { Grid, Card, CardContent, Typography, Box, Tabs, Tab, Chip, List, ListItem, Alert } from '@mui/material';
import ScienceIcon from '@mui/icons-material/Science';
import WarningIcon from '@mui/icons-material/Warning';
import BuildIcon from '@mui/icons-material/Build';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useState } from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { InfoCard } from '@/components/data-display/InfoCard';
import { ChartContainer } from '@/components/charts/ChartContainer';
import { TrendLineChart } from '@/components/charts/TrendLineChart';
import { BarChartComp } from '@/components/charts/BarChartComp';

const MOCK_TREND = [
  { date: 'Jan', oos: 2, worksheets: 14 }, { date: 'Feb', oos: 1, worksheets: 18 },
  { date: 'Mar', oos: 3, worksheets: 22 }, { date: 'Apr', oos: 0, worksheets: 16 },
  { date: 'May', oos: 2, worksheets: 24 },
];
const MOCK_STOCK = [
  { label: 'Acetonitrile', qty: 45 }, { label: 'Methanol', qty: 12 },
  { label: 'NaOH', qty: 8 }, { label: 'HCl', qty: 67 }, { label: 'KOH', qty: 3 },
];

export default function DashboardPage() {
  const [tab, setTab] = useState(0);
  return (
    <PageWrapper title="Dashboard">
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="Overview" /> <Tab label="Quality" /> <Tab label="Inventory" />
      </Tabs>

      {tab === 0 && (
        <Box>
          <Grid container spacing={3} mb={3}>
            {[
              { title: 'Active Worksheets', value: 12, icon: ScienceIcon, trend: 8, color: '#1565C0' },
              { title: 'Pending OOS Cases', value: 3,  icon: WarningIcon,  trend: -25, color: '#C62828' },
              { title: 'Calibration Due',   value: 5,  icon: BuildIcon,    trend: 0,   color: '#E65100' },
              { title: 'Open Tasks',        value: 18, icon: AssignmentIcon, trend: 12, color: '#00897B' },
            ].map((kpi) => (
              <Grid item xs={12} sm={6} md={3} key={kpi.title}>
                <InfoCard {...kpi} />
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <ChartContainer title="Worksheet & OOS Trend">
                <TrendLineChart data={MOCK_TREND} lines={[{ key: 'worksheets', color: '#1565C0', name: 'Worksheets' }, { key: 'oos', color: '#C62828', name: 'OOS Cases' }]} />
              </ChartContainer>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Critical Alerts</Typography>
                  <List dense>
                    {['Calibration overdue: HPLC-001', 'Chemical expiring: NaOH Batch 05', 'OOS under investigation: WS-2024-042'].map((alert, i) => (
                      <ListItem key={i} sx={{ px: 0 }}>
                        <Alert severity={i === 0 ? 'error' : i === 1 ? 'warning' : 'info'} sx={{ width: '100%', py: 0.5 }}>
                          <Typography variant="body2">{alert}</Typography>
                        </Alert>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}

      {tab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <ChartContainer title="OOS Rate by Product">
              <BarChartComp data={[{ label:'Product A', oos:2 },{ label:'Product B', oos:0 },{ label:'Product C', oos:1 }]}
                bars={[{ key:'oos', color:'#C62828', name:'OOS Cases' }]} />
            </ChartContainer>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Pending QA Actions</Typography>
                {['2 OOS investigations pending', '1 CAPA overdue', '3 deviations open'].map((item, i) => (
                  <Box key={i} sx={{ display:'flex', justifyContent:'space-between', py:1, borderBottom:'1px solid', borderColor:'divider' }}>
                    <Typography variant="body2">{item}</Typography>
                    <Chip label="Action" color="warning" size="small" />
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {tab === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <ChartContainer title="Chemical Stock Levels">
              <BarChartComp data={MOCK_STOCK} bars={[{ key:'qty', color:'#00897B', name:'Qty (L/Kg)' }]} />
            </ChartContainer>
          </Grid>
          <Grid item xs={12} md={5}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Low Stock Alerts</Typography>
                {[{ name:'KOH', qty:'3 Kg', critical:true },{ name:'Methanol', qty:'12 L', critical:false },{ name:'NaOH', qty:'8 Kg', critical:false }].map((c) => (
                  <Box key={c.name} sx={{ display:'flex', justifyContent:'space-between', py:1, borderBottom:'1px solid', borderColor:'divider' }}>
                    <Typography variant="body2" fontWeight={500}>{c.name}</Typography>
                    <Box sx={{ display:'flex', gap:1, alignItems:'center' }}>
                      <Typography variant="body2" color="text.secondary">{c.qty}</Typography>
                      <Chip label={c.critical ? 'Critical' : 'Low'} color={c.critical ? 'error' : 'warning'} size="small" />
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </PageWrapper>
  );
}
