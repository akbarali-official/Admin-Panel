import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Card, Stack, Typography } from '@mui/material';

export default function Maintenance() {
  return (
    <Card sx={{ borderRadius: '16px', p: 4 }}>
      <Stack alignItems="center" spacing={2} sx={{ py: 4 }}>
        <Typography fontSize={56}>🛠️</Typography>
        <Typography variant="h5" fontWeight={700}>
          Site maintenance mein hai
        </Typography>
        <Typography color="text.secondary" textAlign="center">
          Ye maintenance page ka sample hai. Asli site par ye tab dikhate hain jab update chal raha ho.
        </Typography>
        <Button variant="contained" component={RouterLink} to="/">
          Dashboard par wapas
        </Button>
      </Stack>
    </Card>
  );
}
