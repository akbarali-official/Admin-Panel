import React from 'react';
import { Card, Typography } from '@mui/material';

// Ye sirf sample text hai. Asli project ke liye apni policy likhwa lena.
export default function PrivacyPolicy() {
  return (
    <Card sx={{ borderRadius: '16px', p: { xs: 2, sm: 3 } }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        Privacy Policy
      </Typography>
      <Typography color="text.secondary" paragraph>
        Ye ek sample page hai. Isme apni website ki asli privacy policy likhni hai.
      </Typography>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Hum kya data jama karte hain
      </Typography>
      <Typography color="text.secondary" paragraph>
        Account banate waqt naam, email aur (hashed) password. Passwords kabhi plain text mein save nahi hote.
      </Typography>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Data ka istemal
      </Typography>
      <Typography color="text.secondary">Data sirf dashboard chalane ke liye istemal hota hai.</Typography>
    </Card>
  );
}
