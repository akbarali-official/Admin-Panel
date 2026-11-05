import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

const levels = [0, 1, 2, 3, 4, 6, 8, 12, 16, 24];

export default function Shadow() {
  return (
    <>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        Shadow
      </Typography>
      <Grid container spacing={3}>
        {levels.map((n) => (
          <Grid item xs={6} sm={4} md={3} key={n}>
            <Paper elevation={n} sx={{ height: 100, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography fontWeight={600}>elevation {n}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
