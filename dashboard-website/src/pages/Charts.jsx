import React from 'react';
import { Alert, Box, Card, CircularProgress, Grid, Typography } from '@mui/material';
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts';
import useAnalytics from '../hooks/useAnalytics';

const PALETTE = ['#673ab7', '#1e88e5', '#2e9e5b', '#ffab00', '#e33d3d', '#90caf9'];

function ChartCard({ title, children }) {
  return (
    <Card sx={{ borderRadius: '16px', p: 2.5, height: '100%' }}>
      <Typography fontWeight={700} sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Box sx={{ height: 260 }}>{children}</Box>
    </Card>
  );
}

export default function Charts() {
  const { data, loading, error } = useAnalytics();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error || !data) return <Alert severity="error">{error || 'Data nahi mila'}</Alert>;

  return (
    <>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        Charts
      </Typography>
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={6}>
          <ChartCard title="Line: monthly revenue">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.ordersByMonth}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="#673ab7" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartCard title="Area: orders per month">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.ordersByMonth}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#1e88e5" fill="#e3f2fd" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartCard title="Pie: orders by status">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.ordersByStatus} dataKey="count" nameKey="name" innerRadius={50} outerRadius={85}>
                  {data.ordersByStatus.map((entry, i) => (
                    <Cell key={entry.name} fill={PALETTE[i % PALETTE.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartCard title="Bar: tasks by status">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.tasksByStatus}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" name="Tasks" fill="#2e9e5b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>
    </>
  );
}
