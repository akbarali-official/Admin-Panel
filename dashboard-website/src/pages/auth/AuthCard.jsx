import React from 'react';
import { Box, Card, Stack, Typography } from '@mui/material';

// Login aur Register dono ka common dabba
export default function AuthCard({ title, subtitle, children }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 2
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 420, p: { xs: 2.5, sm: 4 }, borderRadius: '16px' }}>
        <Stack alignItems="center" spacing={1} sx={{ mb: 3 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: '10px',
              bgcolor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24
            }}
          >
            🍇
          </Box>
          <Typography variant="h5" fontWeight={700} color="primary.main">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            {subtitle}
          </Typography>
        </Stack>
        {children}
      </Card>
    </Box>
  );
}
