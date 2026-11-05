import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Card, Container, Grid, Stack, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const features = [
  ['📊', 'Live Dashboard', 'Earning, orders, income aur growth charts ek jagah.'],
  ['🗂️', 'Kanban + Calendar', 'Tasks drag karo, events plan karo.'],
  ['💬', 'Chat + Mail', 'Team ke saath baat karo, andar hi mail bhejo.'],
  ['🔐', 'Secure Login', 'JWT login, admin aur user roles.']
];

// Ye page login ke baghair bhi khulta hai
export default function Landing() {
  const { user } = useAuth();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box sx={{ bgcolor: 'primary.main', color: '#fff', py: { xs: 8, md: 12 }, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography fontSize={48}>🍇</Typography>
          <Typography variant="h3" fontWeight={800} sx={{ mb: 1 }}>
            BERRY Admin Dashboard
          </Typography>
          <Typography sx={{ opacity: 0.85, mb: 3 }}>React + Material UI + Node + MongoDB se bana full-stack dashboard</Typography>
          <Stack direction="row" spacing={1.5} justifyContent="center">
            {user ? (
              <Button variant="contained" color="secondary" component={RouterLink} to="/">
                Dashboard kholo
              </Button>
            ) : (
              <>
                <Button variant="contained" color="secondary" component={RouterLink} to="/login">
                  Login
                </Button>
                <Button variant="outlined" sx={{ color: '#fff', borderColor: '#fff' }} component={RouterLink} to="/register">
                  Register
                </Button>
              </>
            )}
          </Stack>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={2.5}>
          {features.map(([icon, title, text]) => (
            <Grid item xs={12} sm={6} md={3} key={title}>
              <Card sx={{ borderRadius: '16px', p: 3, height: '100%', textAlign: 'center' }}>
                <Typography fontSize={36}>{icon}</Typography>
                <Typography fontWeight={700} sx={{ mt: 1 }}>
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {text}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
