import React from 'react';
import { AppBar, Toolbar, Box, IconButton, Avatar, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function IconBox({ children, bg, color }) {
  return (
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: '10px',
        bgcolor: bg,
        color: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {children}
    </Box>
  );
}

export default function Header({ onMenuClick }) {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ bgcolor: 'background.default', color: 'text.primary', borderBottom: '1px solid #eee' }}
    >
      <Toolbar sx={{ gap: 1.25, py: 1 }}>
        <IconButton onClick={onMenuClick} sx={{ p: 0 }}>
          <IconBox bg="primary.light" color="primary.main">
            <MenuIcon fontSize="small" />
          </IconBox>
        </IconButton>

        <IconButton sx={{ p: 0 }}>
          <IconBox bg="primary.light" color="primary.main">
            <SearchIcon fontSize="small" />
          </IconBox>
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton sx={{ p: 0 }}>
          <IconBox bg="warning.light" color="warning.dark">
            <Badge color="error" variant="dot">
              <NotificationsIcon fontSize="small" />
            </Badge>
          </IconBox>
        </IconButton>

        <Avatar sx={{ width: 40, height: 40, bgcolor: 'secondary.main' }}>A</Avatar>

        <IconButton sx={{ p: 0 }}>
          <IconBox bg="secondary.light" color="secondary.main">
            <SettingsIcon fontSize="small" />
          </IconBox>
        </IconButton>

        <IconButton size="small">
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}