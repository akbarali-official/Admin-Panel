import React from 'react';
import { Box, Stack, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{ mt: 4, mb: 3 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={1.5}
      >
        <Box>
          <Typography variant="caption" color="text.secondary" display="block">
            © All rights reserved
          </Typography>
          <Link href="#" underline="none" variant="body2" fontWeight={600}>
            CodedThemes
          </Link>
        </Box>
        <Stack direction="row" spacing={3} flexWrap="wrap">
          <Link href="#" underline="hover" variant="body2" color="text.secondary">
            License
          </Link>
          <Link href="#" underline="hover" variant="body2" color="text.secondary">
            Hire us
          </Link>
          <Link href="#" underline="hover" variant="body2" color="text.secondary">
            Terms
          </Link>
          <Link href="#" underline="hover" variant="body2" color="text.secondary">
            Figma Design System
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
}