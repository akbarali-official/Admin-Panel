import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Card, Chip, Grid, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

// Sample pricing page (static). Rate apne hisaab se badal lo.
const plans = [
  { name: 'Basic', price: 49, features: ['1 page website', 'Mobile responsive', 'Contact form', '1 revision'] },
  { name: 'Standard', price: 149, popular: true, features: ['5 pages website', 'Admin dashboard', 'MongoDB backend', '3 revisions'] },
  { name: 'Premium', price: 349, features: ['Full MERN app', 'Login + roles', 'Deploy on cloud', '1 month support'] }
];

export default function Pricing() {
  return (
    <>
      <Typography variant="h5" fontWeight={700} textAlign="center">
        Pricing
      </Typography>
      <Typography color="text.secondary" textAlign="center" sx={{ mb: 3 }}>
        Freelance services ke sample plans
      </Typography>
      <Grid container spacing={2.5} justifyContent="center">
        {plans.map((p) => (
          <Grid item xs={12} sm={6} md={4} key={p.name}>
            <Card
              sx={{
                borderRadius: '16px',
                p: 3,
                height: '100%',
                border: p.popular ? '2px solid #673ab7' : '1px solid #eee'
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight={700}>
                  {p.name}
                </Typography>
                {p.popular && <Chip size="small" color="primary" label="Popular" />}
              </Stack>
              <Typography variant="h3" fontWeight={700} sx={{ my: 1 }}>
                ${p.price}
              </Typography>
              <List dense>
                {p.features.map((f) => (
                  <ListItem key={f} disableGutters>
                    <CheckIcon fontSize="small" color="success" sx={{ mr: 1 }} />
                    <ListItemText primary={f} />
                  </ListItem>
                ))}
              </List>
              <Button fullWidth variant={p.popular ? 'contained' : 'outlined'} component={RouterLink} to="/contact-us" sx={{ mt: 1 }}>
                Contact karo
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
