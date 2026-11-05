import React from 'react';
import { Alert, Box, Card, CircularProgress, Grid, Typography } from '@mui/material';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import StatCard from '../components/StatCard';
import useAnalytics from '../hooks/useAnalytics';
import { formatWhole } from '../utils/format';

export const PALETTE = ['#673ab7', '#1e88e5', '#2e9e5b', '#ffab00', '#e33d3d', '#90caf9'];

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

export default function Analytics() {
  const { data, loading, error } = useAnalytics();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error || !data) {
    return <Alert severity="error">{error || 'Data nahi mila'}</Alert>;
  }

  const t = data.totals;
  return (
    <>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        Analytics
      </Typography>

      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard label="Total Revenue (orders)" value={formatWhole(t.revenue)} icon={<AttachMoneyIcon />} color="success" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard label="Orders" value={t.orders} icon={<ShoppingCartOutlinedIcon />} color="secondary" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard label="Customers" value={t.customers} icon={<SupportAgentOutlinedIcon />} color="primary" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard label="Invoices" value={t.invoices} icon={<ReceiptLongOutlinedIcon />} color="warning" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard label="Products" value={t.products} icon={<Inventory2OutlinedIcon />} color="secondary" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard label="Users" value={t.users} icon={<PeopleOutlineIcon />} color="primary" />
        </Grid>

        <Grid item xs={12} md={7}>
          <ChartCard title="Orders by month (revenue $)">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.ordersByMonth}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="total" name="Revenue" fill="#673ab7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
        <Grid item xs={12} md={5}>
          <ChartCard title="Invoices by status">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.invoicesByStatus} dataKey="count" nameKey="name" outerRadius={85} label>
                  {data.invoicesByStatus.map((entry, i) => (
                    <Cell key={entry.name} fill={PALETTE[i % PALETTE.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
        <Grid item xs={12}>
          <ChartCard title="Products by category">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.productsByCategory}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" name="Products" fill="#1e88e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>
    </>
  );
}
