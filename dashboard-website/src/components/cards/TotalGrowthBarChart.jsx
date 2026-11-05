import React, { useState } from 'react';
import { formatMoney } from '../../utils/format';
import { Card, Stack, Typography, Select, MenuItem, Box, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const defaultData = [
  { month: 'Jan', investment: 40, loss: 25, profit: 30, maintenance: 10 },
  { month: 'Feb', investment: 60, loss: 70, profit: 145, maintenance: 5 },
  { month: 'Mar', investment: 45, loss: 20, profit: 15, maintenance: 65 },
  { month: 'Apr', investment: 55, loss: 20, profit: 25, maintenance: 8 },
  { month: 'May', investment: 60, loss: 25, profit: 25, maintenance: 12 },
  { month: 'Jun', investment: 80, loss: 55, profit: 95, maintenance: 15 },
  { month: 'Jul', investment: 75, loss: 40, profit: 100, maintenance: 10 },
  { month: 'Aug', investment: 25, loss: 15, profit: 10, maintenance: 8 },
  { month: 'Sep', investment: 45, loss: 30, profit: 40, maintenance: 10 },
  { month: 'Oct', investment: 85, loss: 45, profit: 55, maintenance: 60 },
  { month: 'Nov', investment: 20, loss: 25, profit: 15, maintenance: 65 },
  { month: 'Dec', investment: 75, loss: 40, profit: 35, maintenance: 8 }
];

const colors = {
  investment: '#90caf9',
  loss: '#1e88e5',
  profit: '#673ab7',
  maintenance: '#d1c4e9'
};

const legend = [
  { key: 'investment', label: 'Investment' },
  { key: 'loss', label: 'Loss' },
  { key: 'profit', label: 'Profit' },
  { key: 'maintenance', label: 'Maintenance' }
];

export default function TotalGrowthBarChart({ data: apiData, total }) {
  const [range, setRange] = useState('Today');
  // API ka data aaye to wo, warna purana demo data
  const data = apiData !== undefined ? apiData : defaultData;

  return (
    <Card sx={{ borderRadius: '16px', p: 2.5, height: '100%' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography variant="body2" color="text.secondary">
            Total Growth
          </Typography>
          <Typography variant="h4" fontWeight={700}>
            {formatMoney(total !== undefined ? total : 2324)}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} alignItems="center">
          <Select
            size="small"
            value={range}
            onChange={(e) => setRange(e.target.value)}
            sx={{ borderRadius: '8px', fontSize: 13 }}
          >
            <MenuItem value="Today">Today</MenuItem>
            <MenuItem value="Month">Month</MenuItem>
            <MenuItem value="Year">Year</MenuItem>
          </Select>
          <IconButton size="small">
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>

      <Box sx={{ height: 260, mt: 2 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="25%">
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#8c8c9c' }} />
            <Tooltip cursor={{ fill: '#f5f3fb' }} />
            <Bar dataKey="investment" stackId="a" fill={colors.investment} />
            <Bar dataKey="loss" stackId="a" fill={colors.loss} />
            <Bar dataKey="profit" stackId="a" fill={colors.profit} />
            <Bar dataKey="maintenance" stackId="a" fill={colors.maintenance} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      <Stack direction="row" flexWrap="wrap" justifyContent="center" spacing={3} rowGap={1} sx={{ mt: 1 }}>
        {legend.map((l) => (
          <Stack key={l.key} direction="row" alignItems="center" spacing={0.75}>
            <Box sx={{ width: 12, height: 12, borderRadius: '3px', bgcolor: colors[l.key] }} />
            <Typography variant="caption" color="text.secondary">
              {l.label}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}