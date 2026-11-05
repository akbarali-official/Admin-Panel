import React from 'react';
import { Card, Box, Stack, Typography, IconButton, Divider, Link } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const featureData = [
  { v: 20 }, { v: 45 }, { v: 30 }, { v: 70 }, { v: 40 }, { v: 55 }, { v: 65 }, { v: 50 }
];

const stocks = [
  { name: 'Bajaj Finserv', amount: '$1839.00', pct: '10% Profit', up: true },
  { name: 'TTML', amount: '$100.00', pct: '10% Loss', up: false },
  { name: 'Reliance', amount: '$200.00', pct: '10% Profit', up: true },
  { name: 'TTML', amount: '$189.00', pct: '10% Loss', up: false },
  { name: 'Stolon', amount: '$189.00', pct: '10% Loss', up: false }
];

export default function PopularStocks() {
  return (
    <Card sx={{ borderRadius: '16px', p: 2.5, height: '100%' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
        <Typography variant="h6" fontWeight={700}>
          Popular Stocks
        </Typography>
        <IconButton size="small">
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Stack>

      <Box
        sx={{
          bgcolor: 'primary.light',
          borderRadius: '14px',
          p: 2,
          mb: 1
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body1" fontWeight={700} color="primary.main">
            Bajaj Finery
          </Typography>
          <Typography variant="body1" fontWeight={700}>
            $1839.00
          </Typography>
        </Stack>
        <Typography variant="caption" color="text.secondary">
          10% Profit
        </Typography>
        <Box sx={{ height: 90, mt: 1 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={featureData}>
              <defs>
                <linearGradient id="stockFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#673ab7" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#673ab7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="v" stroke="#673ab7" strokeWidth={2} fill="url(#stockFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Box>

      <Box>
        {stocks.map((s, i) => (
          <Box key={i}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1.25 }}>
              <Box>
                <Typography variant="body2" fontWeight={600}>
                  {s.name}
                </Typography>
                <Typography
                  variant="caption"
                  color={s.up ? 'success.main' : 'error.main'}
                  fontWeight={600}
                >
                  {s.pct}
                </Typography>
              </Box>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Typography variant="body2" fontWeight={600}>
                  {s.amount}
                </Typography>
                <Box
                  sx={{
                    width: 26,
                    height: 26,
                    borderRadius: '8px',
                    bgcolor: s.up ? 'success.light' : 'error.light',
                    color: s.up ? 'success.main' : 'error.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {s.up ? <ArrowUpwardIcon sx={{ fontSize: 14 }} /> : <ArrowDownwardIcon sx={{ fontSize: 14 }} />}
                </Box>
              </Stack>
            </Stack>
            {i < stocks.length - 1 && <Divider />}
          </Box>
        ))}
      </Box>

      <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
        <Link href="#" underline="none" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 600 }}>
          View All <ArrowForwardIcon sx={{ fontSize: 16 }} />
        </Link>
      </Stack>
    </Card>
  );
}