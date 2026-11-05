import React from 'react';
import { Card, Typography } from '@mui/material';

export default function SamplePage() {
  return (
    <Card sx={{ borderRadius: '16px', p: { xs: 2, sm: 3 } }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
        Sample Page
      </Typography>
      <Typography color="text.secondary">
        Naya page banane ke liye is file ko copy karo, src/App.jsx mein route lagao, aur src/data/menu-items.js mein path do.
      </Typography>
    </Card>
  );
}
