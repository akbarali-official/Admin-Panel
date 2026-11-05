import React from 'react';
import { Card, Box, Stack, Typography, IconButton } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function EarningCard() {
  return (
    <Card
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'primary.main',
        color: '#fff',
        borderRadius: '16px',
        p: 2.5,
        height: '100%'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: 160,
          height: 160,
          borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.08)',
          top: -60,
          right: -40
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: 110,
          height: 110,
          borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.08)',
          top: 30,
          right: 30
        }}
      />

      <Stack direction="row" justifyContent="space-between" sx={{ position: 'relative' }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: '10px',
            bgcolor: 'rgba(255,255,255,0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <CreditCardIcon fontSize="small" />
        </Box>
        <IconButton size="small" sx={{ color: 'rgba(255,255,255,0.8)' }}>
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Stack>

      <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 3, position: 'relative' }}>
        <Typography variant="h4" fontWeight={700}>
          $500.00
        </Typography>
        <Box
          sx={{
            width: 22,
            height: 22,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ArrowUpwardIcon sx={{ fontSize: 13 }} />
        </Box>
      </Stack>
      <Typography variant="body2" sx={{ opacity: 0.85, mt: 0.5, position: 'relative' }}>
        Total Earning
      </Typography>
    </Card>
  );
}