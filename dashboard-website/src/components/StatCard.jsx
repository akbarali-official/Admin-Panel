import React from 'react';
import { Box, Card, Stack, Typography } from '@mui/material';

// Chhota number-wala card (Analytics / Statistics pages)
export default function StatCard({ label, value, icon, color = 'primary' }) {
  return (
    <Card sx={{ borderRadius: '16px', p: 2.5, height: '100%' }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '12px',
            bgcolor: `${color}.light`,
            color: `${color}.main`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography variant="h5" fontWeight={700}>
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}
