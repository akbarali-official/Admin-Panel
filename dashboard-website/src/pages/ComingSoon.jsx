import React from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { Button, Card, Stack, Typography } from '@mui/material';

// Jin menu items ka page abhi bana nahi, unka click yahan aata hai
export default function ComingSoon() {
  const { id } = useParams();
  const name = (id || 'Ye page').replace(/-/g, ' ');

  return (
    <Card sx={{ borderRadius: '16px', p: 4 }}>
      <Stack alignItems="center" spacing={2} sx={{ py: 4 }}>
        <Typography fontSize={48}>🚧</Typography>
        <Typography variant="h5" fontWeight={700} sx={{ textTransform: 'capitalize' }}>
          {name}
        </Typography>
        <Typography color="text.secondary" textAlign="center">
          Ye page abhi bana nahi. Jaldi aayega.
        </Typography>
        <Button component={RouterLink} to="/" variant="contained">
          Dashboard par wapas
        </Button>
      </Stack>
    </Card>
  );
}
