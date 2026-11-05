import React from 'react';
import {
  Alert, Box, Card, Chip, CircularProgress, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography
} from '@mui/material';
import useAnalytics from '../hooks/useAnalytics';

const STATUS_COLOR = {
  paid: 'success', pending: 'warning', overdue: 'error', completed: 'success', cancelled: 'error'
};

export default function WidgetData() {
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
        Data Widgets
      </Typography>
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: '16px', p: 2.5, overflowX: 'auto' }}>
            <Typography fontWeight={700} sx={{ mb: 1 }}>
              Recent Orders
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Customer</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.recentOrders.map((o) => (
                  <TableRow key={o._id}>
                    <TableCell>{o.customer || '—'}</TableCell>
                    <TableCell>${o.amount}</TableCell>
                    <TableCell>
                      <Chip size="small" label={o.status} color={STATUS_COLOR[o.status] || 'default'} />
                    </TableCell>
                    <TableCell>{new Date(o.date).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: '16px', p: 2.5, overflowX: 'auto' }}>
            <Typography fontWeight={700} sx={{ mb: 1 }}>
              Recent Invoices
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Invoice #</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.recentInvoices.map((i) => (
                  <TableRow key={i._id}>
                    <TableCell>{i.invoiceNumber}</TableCell>
                    <TableCell>{i.customer}</TableCell>
                    <TableCell>${i.amount}</TableCell>
                    <TableCell>
                      <Chip size="small" label={i.status} color={STATUS_COLOR[i.status] || 'default'} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
