import React from 'react';
import { Fab } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

export default function FloatingSettings() {
  return (
    <Fab
      color="primary"
      sx={{
        position: 'fixed',
        right: 20,
        top: '45%',
        boxShadow: '0 8px 20px rgba(103,58,183,0.4)'
      }}
    >
      <SettingsIcon />
    </Fab>
  );
}