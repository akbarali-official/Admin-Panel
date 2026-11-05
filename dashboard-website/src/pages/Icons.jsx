import React, { useMemo, useState } from 'react';
import { Box, Card, Grid, InputAdornment, TextField, Tooltip, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import * as MuiIcons from '@mui/icons-material';

const ALL_NAMES = Object.keys(MuiIcons).filter((n) => /^[A-Z]/.test(n) && !/(Outlined|Rounded|Sharp|TwoTone)$/.test(n));
const LIMIT = 120;

export default function Icons() {
  const [query, setQuery] = useState('');

  const names = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q.length >= 2 ? ALL_NAMES.filter((n) => n.toLowerCase().includes(q)) : ALL_NAMES;
    return list.slice(0, LIMIT);
  }, [query]);

  return (
    <Card sx={{ borderRadius: '16px', p: { xs: 2, sm: 3 } }}>
      <Typography variant="h5" fontWeight={700}>
        Icons
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Material icons ({ALL_NAMES.length} se zyada). Search karo, pehle {LIMIT} dikhte hain.
      </Typography>
      <TextField
        size="small"
        fullWidth
        placeholder="Search icon (e.g. home, mail, cart)..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mb: 2 }}
        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
      />
      <Grid container spacing={1}>
        {names.map((name) => {
          const Icon = MuiIcons[name];
          return (
            <Grid item xs={4} sm={3} md={2} key={name}>
              <Tooltip title={name}>
                <Box sx={{ textAlign: 'center', p: 1, borderRadius: '10px', border: '1px solid #eee', '&:hover': { bgcolor: 'primary.light' } }}>
                  <Icon />
                  <Typography variant="caption" display="block" noWrap>
                    {name}
                  </Typography>
                </Box>
              </Tooltip>
            </Grid>
          );
        })}
        {names.length === 0 && (
          <Grid item xs={12}>
            <Typography color="text.secondary" textAlign="center" sx={{ py: 4 }}>
              Koi icon nahi mila
            </Typography>
          </Grid>
        )}
      </Grid>
    </Card>
  );
}
