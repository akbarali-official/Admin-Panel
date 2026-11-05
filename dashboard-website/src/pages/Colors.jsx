import React from 'react';
import { Box, Card, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Theme (theme.js) ke saare rang dikhata hai
export default function Colors() {
  const theme = useTheme();
  const groups = ['primary', 'secondary', 'warning', 'success', 'error'];

  return (
    <Card sx={{ borderRadius: '16px', p: { xs: 2, sm: 3 } }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        Color
      </Typography>
      <Grid container spacing={2}>
        {groups.map((g) =>
          Object.entries(theme.palette[g])
            .filter(([shade, value]) => ['light', 'main', 'dark'].includes(shade) && typeof value === 'string')
            .map(([shade, value]) => (
              <Grid item xs={6} sm={4} md={3} key={`${g}-${shade}`}>
                <Box sx={{ bgcolor: value, height: 80, borderRadius: '12px', border: '1px solid #eee' }} />
                <Typography variant="body2" fontWeight={600} sx={{ mt: 0.5 }}>
                  {g}.{shade}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {value}
                </Typography>
              </Grid>
            ))
        )}
      </Grid>
    </Card>
  );
}
