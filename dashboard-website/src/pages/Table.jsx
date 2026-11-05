import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert, Card, Chip, CircularProgress, Box, InputAdornment, Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TableSortLabel, TextField, Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import api from '../services/api';

const STATUS_COLOR = { completed: 'success', pending: 'warning', cancelled: 'error' };
const COLUMNS = [
  { key: 'customer', label: 'Customer' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' },
  { key: 'date', label: 'Date' }
];

// Sortable table ka demo (data /api/orders se)
export default function TablePage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [orderBy, setOrderBy] = useState('date');
  const [direction, setDirection] = useState('desc');
  const [search, setSearch] = useState('');

  useEffect(() => {
    api
      .get('/orders')
      .then((d) => setRows(Array.isArray(d) ? d : []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const sorted = useMemo(() => {
    const q = search.toLowerCase();
    const filtered = rows.filter((r) => !q || `${r.customer} ${r.status} ${r.amount}`.toLowerCase().includes(q));
    return [...filtered].sort((a, b) => {
      const x = a[orderBy] === undefined ? '' : a[orderBy];
      const y = b[orderBy] === undefined ? '' : b[orderBy];
      const result = orderBy === 'amount' ? x - y : String(x).localeCompare(String(y));
      return direction === 'asc' ? result : -result;
    });
  }, [rows, orderBy, direction, search]);

  const handleSort = (key) => {
    if (orderBy === key) setDirection(direction === 'asc' ? 'desc' : 'asc');
    else {
      setOrderBy(key);
      setDirection('asc');
    }
  };

  return (
    <Card sx={{ borderRadius: '16px', p: { xs: 1.5, sm: 2.5 } }}>
      <Typography variant="h5" fontWeight={700}>
        Sortable Table
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Column ke naam par click karke sort karo.
      </Typography>
      <TextField
        size="small"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
      />
      {error && <Alert severity="error">{error}</Alert>}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer>
          <MuiTable size="small">
            <TableHead>
              <TableRow>
                {COLUMNS.map((c) => (
                  <TableCell key={c.key} sortDirection={orderBy === c.key ? direction : false} sx={{ fontWeight: 700 }}>
                    <TableSortLabel active={orderBy === c.key} direction={orderBy === c.key ? direction : 'asc'} onClick={() => handleSort(c.key)}>
                      {c.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sorted.map((r) => (
                <TableRow key={r._id} hover>
                  <TableCell>{r.customer || '—'}</TableCell>
                  <TableCell>${r.amount}</TableCell>
                  <TableCell>
                    <Chip size="small" label={r.status} color={STATUS_COLOR[r.status] || 'default'} />
                  </TableCell>
                  <TableCell>{new Date(r.date).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
              {sorted.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                    Koi record nahi
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </MuiTable>
        </TableContainer>
      )}
    </Card>
  );
}
