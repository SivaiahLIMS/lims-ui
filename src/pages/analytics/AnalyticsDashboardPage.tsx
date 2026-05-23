import { Grid, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { ChartContainer } from '@/components/charts/ChartContainer';
import { TrendLineChart } from '@/components/charts/TrendLineChart';
import { BarChartComp } from '@/components/charts/BarChartComp';
import { PieDonutChart } from '@/components/charts/PieDonutChart';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun'];
const OOS_TREND = MONTHS.map((m, i) => ({ date: m, oos: [2,1,3,0,2,1][i], tests: [45,52,48,61,55,58][i] }));
const CHEM_UTIL = MONTHS.map((m, i) => ({ date: m, acetonitrile: [12,14,11,16,13,15][i], methanol: [8,9,7,10,9,11][i] }));
const INSTR_UTIL = [{ label:'HPLC-001', util:87 },{ label:'HPLC-002', util:62 },{ label:'Balance-003', util:45 },{ label:'pH Meter', util:31 }];
const STORAGE_PIE = [{ name:'Available', value:42, color:'#2E7D32' },{ name:'Occupied', value:51, color:'#1565C0' },{ name:'Reserved', value:7, color:'#E65100' }];

export default function AnalyticsDashboardPage() {
  const [tab, setTab] = useState(0);
  return (
    <PageWrapper title="Analytics" breadcrumbs={[{ label: 'Analytics' }]}>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="Quality" /> <Tab label="Chemicals" /> <Tab label="Instruments" /> <Tab label="Storage" />
      </Tabs>

      {tab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <ChartContainer title="OOS Rate Trend">
              <TrendLineChart data={OOS_TREND} lines={[{ key: 'oos', color: '#C62828', name: 'OOS Cases' }, { key: 'tests', color: '#1565C0', name: 'Total Tests' }]} />
            </ChartContainer>
          </Grid>
          <Grid item xs={12} md={4}>
            <ChartContainer title="OOS by Category">
              <PieDonutChart data={[{ name:'Assay', value:5, color:'#C62828' },{ name:'pH', value:3, color:'#E65100' },{ name:'Dissolution', value:2, color:'#F9A825' }]} />
            </ChartContainer>
          </Grid>
        </Grid>
      )}

      {tab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ChartContainer title="Chemical Utilization Trend (L/Kg)">
              <TrendLineChart data={CHEM_UTIL} lines={[{ key:'acetonitrile', color:'#1565C0', name:'Acetonitrile' },{ key:'methanol', color:'#00897B', name:'Methanol' }]} />
            </ChartContainer>
          </Grid>
        </Grid>
      )}

      {tab === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <ChartContainer title="Instrument Utilization (%)">
              <BarChartComp data={INSTR_UTIL} bars={[{ key:'util', color:'#1565C0', name:'Utilization %' }]} />
            </ChartContainer>
          </Grid>
          <Grid item xs={12} md={4}>
            <ChartContainer title="Calibration Status">
              <PieDonutChart data={[{ name:'Calibrated', value:12, color:'#2E7D32' },{ name:'Due', value:3, color:'#E65100' },{ name:'Overdue', value:1, color:'#C62828' }]} />
            </ChartContainer>
          </Grid>
        </Grid>
      )}

      {tab === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <ChartContainer title="Storage Capacity Distribution">
              <PieDonutChart data={STORAGE_PIE} />
            </ChartContainer>
          </Grid>
          <Grid item xs={12} md={6}>
            <ChartContainer title="Violations per Month">
              <BarChartComp data={MONTHS.map((m, i) => ({ label: m, violations: [0,1,0,2,0,1][i] }))} bars={[{ key:'violations', color:'#C62828', name:'Violations' }]} />
            </ChartContainer>
          </Grid>
        </Grid>
      )}
    </PageWrapper>
  );
}
