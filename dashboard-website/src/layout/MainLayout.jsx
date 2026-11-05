import React, { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';
import FloatingSettings from '../components/FloatingSettings';

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <Box sx={{ p: { xs: 1.5, sm: 2.5 }, maxWidth: 1400, mx: 'auto' }}>{children}</Box>
      </Box>

      <FloatingSettings />
    </Box>
  );
}