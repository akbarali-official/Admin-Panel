import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Card, Stack, Typography } from '@mui/material';

export default function NotFound() {
  return (
    <Card sx={{ borderRadius: '16px', p: 4 }}>
      <Stack alignItems="center" spacing={2} sx={{ py: 4 }}>
        <Typography variant="h2" fontWeight={700} color="primary.main">
          404
        </Typography>
        <Typography color="text.secondary">Ye page maujood nahi hai.</Typography>
        <Button component={RouterLink} to="/" variant="contained">
          Dashboard par wapas
        </Button>
      </Stack>
    </Card>
  );
}
