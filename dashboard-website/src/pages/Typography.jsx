import React from 'react';
import { Card, Divider, Stack, Typography } from '@mui/material';

const variants = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption', 'overline'];

export default function TypographyPage() {
  return (
    <Card sx={{ borderRadius: '16px', p: { xs: 2, sm: 3 } }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        Typography
      </Typography>
      <Stack divider={<Divider flexItem />} spacing={1.5}>
        {variants.map((v) => (
          <Stack key={v} direction="row" alignItems="baseline" spacing={3}>
            <Typography variant="caption" color="text.secondary" sx={{ width: 80, flexShrink: 0 }}>
              {v}
            </Typography>
            <Typography variant={v}>The quick brown fox</Typography>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}
