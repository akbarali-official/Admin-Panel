import React from 'react';
import { Box, Card, Grid, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';

const spin = keyframes`from { transform: rotate(0deg); } to { transform: rotate(360deg); }`;
const pulse = keyframes`0%, 100% { transform: scale(1); } 50% { transform: scale(1.25); }`;
const bounce = keyframes`0%, 100% { transform: translateY(0); } 50% { transform: translateY(-24px); }`;
const fade = keyframes`0%, 100% { opacity: 1; } 50% { opacity: 0.2; }`;

const items = [
  { name: 'Spin', animation: `${spin} 2s linear infinite` },
  { name: 'Pulse', animation: `${pulse} 1.5s ease-in-out infinite` },
  { name: 'Bounce', animation: `${bounce} 1s ease-in-out infinite` },
  { name: 'Fade', animation: `${fade} 1.8s ease-in-out infinite` }
];

export default function Animation() {
  return (
    <>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        Animation
      </Typography>
      <Grid container spacing={2.5}>
        {items.map((it) => (
          <Grid item xs={6} md={3} key={it.name}>
            <Card sx={{ borderRadius: '16px', p: 3, textAlign: 'center', height: 170 }}>
              <Box sx={{ width: 56, height: 56, borderRadius: '14px', bgcolor: 'primary.main', mx: 'auto', mt: 2, animation: it.animation }} />
              <Typography fontWeight={600} sx={{ mt: 3 }}>
                {it.name}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
