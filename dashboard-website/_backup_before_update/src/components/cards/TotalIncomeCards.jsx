import React from 'react';
import { Card, Box, Typography } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import StorefrontIcon from '@mui/icons-material/Storefront';

export function TotalIncomeDarkCard() {
  return (
    <Card
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'secondary.main',
        color: '#fff',
        borderRadius: '16px',
        p: 2.5,
        height: '100%'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: 130,
          height: 130,
          borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.08)',
          top: -50,
          right: -30
        }}
      />
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: '10px',
          bgcolor: 'rgba(255,255,255,0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        <GridViewIcon fontSize="small" />
      </Box>
      <Typography variant="h4" fontWeight={700} sx={{ mt: 3, position: 'relative' }}>
        $203k
      </Typography>
      <Typography variant="body2" sx={{ opacity: 0.85, mt: 0.5, position: 'relative' }}>
        Total Income
      </Typography>
    </Card>
  );
}

export function TotalIncomeLightCard() {
  return (
    <Card
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: '#fff',
        border: '1px solid #f0e6c8',
        borderRadius: '16px',
        p: 2.5,
        height: '100%'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: 130,
          height: 130,
          borderRadius: '50%',
          bgcolor: 'warning.light',
          opacity: 0.6,
          top: -50,
          right: -30
        }}
      />
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: '10px',
          bgcolor: 'warning.light',
          color: 'warning.dark',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        <StorefrontIcon fontSize="small" />
      </Box>
      <Typography variant="h4" fontWeight={700} sx={{ mt: 3, position: 'relative' }}>
        $203k
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, position: 'relative' }}>
        Total Income
      </Typography>
    </Card>
  );
}