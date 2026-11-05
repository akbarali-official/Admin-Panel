import React, { useState } from 'react';
import { formatWhole } from '../../utils/format';
import { Card, Box, Stack, Typography, ButtonGroup, Button } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const sparkData = [
  { v: 20 }, { v: 45 }, { v: 15 }, { v: 55 }, { v: 25 }, { v: 48 }, { v: 18 }, { v: 40 }
];

export default function TotalOrderCard({ total, series, range: rangeProp, onRangeChange }) {
  // Dashboard page se range aaye to wahi use hoti hai, warna card apni state chalata hai
  const [localRange, setLocalRange] = useState('year');
  const range = rangeProp || localRange;
  const setRange = onRangeChange || setLocalRange;
  const chartData = total !== undefined ? series || [] : sparkData;

  return (
    <Card
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'secondary.main',
        color: '#fff',
        borderRadius: '16px',
        p: 2.5,
        height: '100%'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: 160,
          height: 160,
          borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.08)',
          top: -60,
          right: -40
        }}
      />

      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ position: 'relative' }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: '10px',
            bgcolor: 'rgba(255,255,255,0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ShoppingBagIcon fontSize="small" />
        </Box>

        <ButtonGroup size="small" sx={{ bgcolor: 'rgba(255,255,255,0.15)', borderRadius: '8px' }}>
          <Button
            onClick={() => setRange('month')}
            sx={{
              color: '#fff',
              border: 'none',
              bgcolor: range === 'month' ? 'rgba(255,255,255,0.25)' : 'transparent',
              '&:hover': { border: 'none' }
            }}
          >
            Month
          </Button>
          <Button
            onClick={() => setRange('year')}
            sx={{
              color: '#fff',
              border: 'none',
              bgcolor: range === 'year' ? 'rgba(255,255,255,0.25)' : 'transparent',
              '&:hover': { border: 'none' }
            }}
          >
            Year
          </Button>
        </ButtonGroup>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 3, position: 'relative' }}>
        <Box>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h4" fontWeight={700}>
              {formatWhole(total !== undefined ? total : 961)}
            </Typography>
            <Box
              sx={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                bgcolor: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ArrowDownwardIcon sx={{ fontSize: 13 }} />
            </Box>
          </Stack>
          <Typography variant="body2" sx={{ opacity: 0.85, mt: 0.5 }}>
            Total Order
          </Typography>
        </Box>

        <Box sx={{ width: 90, height: 45 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line type="monotone" dataKey="v" stroke="#fff" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Stack>
    </Card>
  );
}