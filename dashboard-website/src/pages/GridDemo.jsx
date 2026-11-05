import React from 'react';
import { Box, Card, Grid, Typography } from '@mui/material';

const Cell = ({ label }) => (
  <Box sx={{ bgcolor: 'primary.light', color: 'primary.main', borderRadius: '10px', p: 2, textAlign: 'center', fontWeight: 600 }}>{label}</Box>
);

export default function GridDemo() {
  return (
    <Card sx={{ borderRadius: '16px', p: { xs: 2, sm: 3 } }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        Grid
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Browser ki width badal ke dekho: ye boxes khud rearrange hote hain (xs=12, sm=6, md=3).
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[1, 2, 3, 4].map((n) => (
          <Grid item xs={12} sm={6} md={3} key={n}>
            <Cell label={`Box ${n}`} />
          </Grid>
        ))}
      </Grid>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Alag alag chorai (8 + 4, phir 4 + 4 + 4):
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}><Cell label="md=8" /></Grid>
        <Grid item xs={12} md={4}><Cell label="md=4" /></Grid>
        <Grid item xs={12} md={4}><Cell label="md=4" /></Grid>
        <Grid item xs={12} md={4}><Cell label="md=4" /></Grid>
        <Grid item xs={12} md={4}><Cell label="md=4" /></Grid>
      </Grid>
    </Card>
  );
}
