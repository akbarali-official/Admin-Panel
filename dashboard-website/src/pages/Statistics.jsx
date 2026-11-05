import React from 'react';
import { Alert, Box, Card, CircularProgress, Grid, LinearProgress, Stack, Typography } from '@mui/material';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import ViewKanbanOutlinedIcon from '@mui/icons-material/ViewKanbanOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StatCard from '../components/StatCard';
import useAnalytics from '../hooks/useAnalytics';
import { formatWhole } from '../utils/format';

function Breakdown({ title, rows, color }) {
  const total = rows.reduce((sum, r) => sum + r.count, 0) || 1;
  return (
    <Card sx={{ borderRadius: '16px', p: 2.5, height: '100%' }}>
      <Typography fontWeight={700} sx={{ mb: 1.5 }}>
        {title}
      </Typography>
      <Stack spacing={1.5}>
        {rows.length === 0 && <Typography color="text.secondary">Data nahi hai</Typography>}
        {rows.map((r) => (
          <Box key={r.name}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                {r.name}
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {r.count}
              </Typography>
            </Stack>
            <LinearProgress variant="determinate" value={(r.count / total) * 100} color={color} sx={{ height: 6, borderRadius: 3 }} />
          </Box>
        ))}
      </Stack>
    </Card>
  );
}

export default function Statistics() {
  const { data, loading, error } = useAnalytics();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error || !data) return <Alert severity="error">{error || 'Data nahi mila'}</Alert>;

  const t = data.totals;
  const cards = [
    ['Users', t.users, <PeopleOutlineIcon key="u" />, 'primary'],
    ['Customers', t.customers, <SupportAgentOutlinedIcon key="c" />, 'secondary'],
    ['Products', t.products, <Inventory2OutlinedIcon key="p" />, 'warning'],
    ['Invoices', t.invoices, <ReceiptLongOutlinedIcon key="i" />, 'primary'],
    ['Orders', t.orders, <ShoppingCartOutlinedIcon key="o" />, 'secondary'],
    ['Blog posts', t.posts, <ArticleOutlinedIcon key="b" />, 'success'],
    ['Tasks', t.tasks, <ViewKanbanOutlinedIcon key="t" />, 'warning'],
    ['Revenue', formatWhole(t.revenue), <AttachMoneyIcon key="r" />, 'success']
  ];

  return (
    <>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        Statistics
      </Typography>
      <Grid container spacing={2.5}>
        {cards.map(([label, value, icon, color]) => (
          <Grid item xs={12} sm={6} md={3} key={label}>
            <StatCard label={label} value={value} icon={icon} color={color} />
          </Grid>
        ))}
        <Grid item xs={12} md={4}>
          <Breakdown title="Customers by status" rows={data.customersByStatus} color="primary" />
        </Grid>
        <Grid item xs={12} md={4}>
          <Breakdown title="Orders by status" rows={data.ordersByStatus} color="secondary" />
        </Grid>
        <Grid item xs={12} md={4}>
          <Breakdown title="Tasks by status" rows={data.tasksByStatus} color="success" />
        </Grid>
      </Grid>
    </>
  );
}
