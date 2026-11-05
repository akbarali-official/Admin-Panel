import React from 'react';
import {
  Drawer,
  Box,
  Stack,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Chip,
  Avatar,
  LinearProgress
} from '@mui/material';
import * as Icons from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GridViewIcon from '@mui/icons-material/GridView';
import menuItems from '../data/menu-items';

const DRAWER_WIDTH = 260;

function NavIcon({ name }) {
  const IconComponent = Icons[name] || Icons.CircleOutlined;
  return <IconComponent fontSize="small" />;
}

function NavChip({ chip }) {
  if (!chip) return null;
  if (chip.avatar) {
    return (
      <Chip
        size="small"
        avatar={<Avatar sx={{ bgcolor: 'secondary.main', color: '#fff' }}>{chip.avatar}</Avatar>}
        label={chip.label}
        sx={{ bgcolor: 'secondary.light', color: 'secondary.dark' }}
      />
    );
  }
  return (
    <Chip
      size="small"
      label={chip.label}
      variant={chip.variant || 'filled'}
      color={chip.color === 'primary' ? 'primary' : chip.color === 'secondary' ? 'secondary' : undefined}
    />
  );
}

function NavItem({ item }) {
  return (
    <ListItemButton
      disabled={item.disabled}
      sx={{
        borderRadius: '10px',
        mb: 0.5,
        py: 1.1,
        ...(item.selected && {
          bgcolor: 'primary.light',
          color: 'primary.main',
          '& .MuiListItemIcon-root': { color: 'primary.main' }
        })
      }}
    >
      <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>
        <NavIcon name={item.icon} />
      </ListItemIcon>
      <ListItemText
        primary={item.title}
        secondary={item.caption}
        primaryTypographyProps={{ fontSize: 14.5, fontWeight: item.selected ? 600 : 400 }}
        secondaryTypographyProps={{ fontSize: 11.5 }}
      />
      {item.chip && <NavChip chip={item.chip} />}
      {item.type === 'collapse' && <ExpandMoreIcon fontSize="small" sx={{ color: 'text.secondary' }} />}
    </ListItemButton>
  );
}

export default function Sidebar({ open, onClose }) {
  const content = (
    <Box sx={{ width: DRAWER_WIDTH, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ px: 2.5, py: 2.5 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '8px',
            bgcolor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18
          }}
        >
          🍇
        </Box>
        <Typography variant="h5" fontWeight={700} letterSpacing={1}>
          BERRY
        </Typography>
      </Stack>

      <Box sx={{ flex: 1, overflowY: 'auto', px: 1.5, pb: 2 }}>
        {menuItems.map((group) => (
          <Box key={group.id} sx={{ mb: 1.5 }}>
            {group.title && (
              <Box sx={{ px: 1.5, mb: 0.5 }}>
                <Typography variant="caption" fontWeight={700} color="text.secondary">
                  {group.title}
                </Typography>
                {group.caption && (
                  <Typography variant="caption" display="block" color="text.secondary" sx={{ opacity: 0.7 }}>
                    {group.caption}
                  </Typography>
                )}
              </Box>
            )}
            <List disablePadding>
              {group.children.map((item) => (
                <NavItem key={item.id} item={item} />
              ))}
            </List>
          </Box>
        ))}

        <Box
          sx={{
            mt: 2,
            p: 2,
            borderRadius: '14px',
            bgcolor: 'secondary.light',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '8px',
                bgcolor: 'secondary.main',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <GridViewIcon fontSize="small" />
            </Box>
            <Box>
              <Typography variant="body2" fontWeight={700} color="secondary.dark">
                Get Extra Space
              </Typography>
              <Typography variant="caption" color="text.secondary">
                28/23 GB
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" justifyContent="space-between" sx={{ mt: 1.5, mb: 0.5 }}>
            <Typography variant="caption" fontWeight={600} color="secondary.dark">
              Progress
            </Typography>
            <Typography variant="caption" fontWeight={600} color="secondary.dark">
              80%
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={80}
            sx={{ height: 6, borderRadius: 3, bgcolor: 'rgba(30,136,229,0.2)' }}
          />
        </Box>

        <Stack alignItems="center" sx={{ mt: 2 }}>
          <Chip size="small" label="v5.2.0" sx={{ bgcolor: 'grey.200' }} />
        </Stack>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          border: 'none'
        }
      }}
    >
      {content}
    </Drawer>
  );
}

export { DRAWER_WIDTH };