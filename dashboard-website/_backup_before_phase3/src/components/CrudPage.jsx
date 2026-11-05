import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  MenuItem,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SearchIcon from '@mui/icons-material/Search';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

/*
 * Ek reusable page: list + search + add + edit + delete.
 * Users, Customers, Invoices, Products, Orders, Blog, Stocks sab isi se bane hain.
 *
 * columns: [{ key, label, type: 'text'|'money'|'date'|'status', colors: {value: 'success'}, render(row) }]
 * fields : [{ name, label, type: 'text'|'number'|'date'|'select'|'password'|'multiline',
 *             options: ['a', 'b'] ya [{ value, label }], valueType: 'boolean',
 *             required, requiredOnCreate, createOnly, helperText, defaultValue }]
 */

const optionValue = (o) => (typeof o === 'object' ? o.value : o);
const optionLabel = (o) => (typeof o === 'object' ? o.label : o);

function formatCell(col, row) {
  if (col.render) return col.render(row);
  const value = row[col.key];
  if (value === undefined || value === null || value === '') return '—';

  switch (col.type) {
    case 'money':
      return `$${Number(value).toLocaleString('en-US')}`;
    case 'date':
      return new Date(value).toLocaleDateString();
    case 'status':
      return (
        <Chip
          size="small"
          label={String(value)}
          color={(col.colors && col.colors[value]) || 'default'}
          sx={{ textTransform: 'capitalize' }}
        />
      );
    default:
      return String(value);
  }
}

const emptyForm = (fields) =>
  Object.fromEntries(fields.map((f) => [f.name, f.defaultValue !== undefined ? f.defaultValue : '']));

function rowToForm(fields, row) {
  const form = {};
  fields.forEach((f) => {
    const value = row[f.name];
    if (f.type === 'password') form[f.name] = '';
    else if (f.type === 'date') form[f.name] = value ? String(value).slice(0, 10) : '';
    else if (f.valueType === 'boolean') form[f.name] = String(!!value);
    else form[f.name] = value === undefined || value === null ? '' : value;
  });
  return form;
}

function formToPayload(fields, form) {
  const payload = {};
  fields.forEach((f) => {
    const value = form[f.name];
    if (f.type === 'password' && value === '') return; // khali password = badlo mat
    if (f.type === 'number') {
      if (value !== '') payload[f.name] = Number(value);
    } else if (f.type === 'date') {
      if (value !== '') payload[f.name] = value;
    } else if (f.valueType === 'boolean') {
      payload[f.name] = value === 'true';
    } else {
      payload[f.name] = typeof value === 'string' ? value.trim() : value;
    }
  });
  return payload;
}

export default function CrudPage({ title, singular, endpoint, columns, fields }) {
  const { isAdmin } = useAuth();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null); // jis row ko edit kar rahe hain
  const [form, setForm] = useState(() => emptyForm(fields));
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });

  const notify = (message, severity = 'success') => setSnack({ open: true, message, severity });

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api.get(endpoint);
      setRows(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = rows.filter((row) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return columns.some((c) => String(row[c.key] === undefined || row[c.key] === null ? '' : row[c.key]).toLowerCase().includes(q));
  });
  const visible = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm(fields));
    setErrors({});
    setDialogOpen(true);
  };

  const openEdit = (row) => {
    setEditing(row);
    setForm(rowToForm(fields, row));
    setErrors({});
    setDialogOpen(true);
  };

  const validate = () => {
    const found = {};
    fields.forEach((f) => {
      if (f.createOnly && editing) return;
      const value = form[f.name];
      const empty = value === '' || value === undefined || value === null;
      if (f.required && empty) found[f.name] = `${f.label} zaroori hai`;
      if (f.requiredOnCreate && !editing && empty) found[f.name] = `${f.label} zaroori hai`;
    });
    setErrors(found);
    return Object.keys(found).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      const activeFields = fields.filter((f) => !(f.createOnly && editing));
      const payload = formToPayload(activeFields, form);
      if (editing) await api.put(`${endpoint}/${editing._id}`, payload);
      else await api.post(endpoint, payload);
      setDialogOpen(false);
      notify(editing ? `${singular} update ho gaya` : `${singular} add ho gaya`);
      load();
    } catch (err) {
      notify(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (row) => {
    if (!window.confirm(`Pakka ye ${singular} delete karna hai?`)) return;
    try {
      await api.delete(`${endpoint}/${row._id}`);
      notify(`${singular} delete ho gaya`);
      load();
    } catch (err) {
      notify(err.message, 'error');
    }
  };

  const inputType = (f) => {
    if (f.type === 'number') return 'number';
    if (f.type === 'date') return 'date';
    if (f.type === 'password') return 'password';
    return 'text';
  };

  return (
    <Card sx={{ borderRadius: '16px', p: { xs: 1.5, sm: 2.5 } }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', sm: 'center' }}
        spacing={1.5}
        sx={{ mb: 2 }}
      >
        <Typography variant="h5" fontWeight={700}>
          {title}
        </Typography>
        <Stack direction="row" spacing={1.5}>
          <TextField
            size="small"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              )
            }}
          />
          {isAdmin && (
            <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate} sx={{ whiteSpace: 'nowrap' }}>
              Add {singular}
            </Button>
          )}
        </Stack>
      </Stack>

      {!isAdmin && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Aap sirf dekh sakte hain. Add / edit / delete sirf admin kar sakta hai.
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {columns.map((c) => (
                    <TableCell key={c.key} sx={{ fontWeight: 700 }}>
                      {c.label}
                    </TableCell>
                  ))}
                  {isAdmin && (
                    <TableCell align="right" sx={{ fontWeight: 700 }}>
                      Actions
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {visible.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={columns.length + (isAdmin ? 1 : 0)} align="center" sx={{ py: 5, color: 'text.secondary' }}>
                      Koi record nahi mila
                    </TableCell>
                  </TableRow>
                )}
                {visible.map((row) => (
                  <TableRow key={row._id} hover>
                    {columns.map((c) => (
                      <TableCell key={c.key}>{formatCell(c, row)}</TableCell>
                    ))}
                    {isAdmin && (
                      <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                        <IconButton size="small" onClick={() => openEdit(row)} aria-label="edit">
                          <EditOutlinedIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="error" onClick={() => handleDelete(row)} aria-label="delete">
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={filtered.length}
            page={page}
            onPageChange={(e, p) => setPage(p)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </>
      )}

      <Dialog open={dialogOpen} onClose={() => !saving && setDialogOpen(false)} fullWidth maxWidth="sm">
        <form onSubmit={handleSubmit} noValidate>
          <DialogTitle>{editing ? `Edit ${singular}` : `Add ${singular}`}</DialogTitle>
          <DialogContent>
            {fields
              .filter((f) => !(f.createOnly && editing))
              .map((f) => (
                <TextField
                  key={f.name}
                  fullWidth
                  margin="dense"
                  size="small"
                  label={f.label}
                  type={f.type === 'select' ? undefined : inputType(f)}
                  select={f.type === 'select'}
                  multiline={f.type === 'multiline'}
                  minRows={f.type === 'multiline' ? 4 : undefined}
                  value={form[f.name]}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                  required={!!f.required || (!!f.requiredOnCreate && !editing)}
                  InputLabelProps={f.type === 'date' ? { shrink: true } : undefined}
                  error={!!errors[f.name]}
                  helperText={errors[f.name] || f.helperText}
                >
                  {f.type === 'select' &&
                    (f.options || []).map((o) => (
                      <MenuItem key={optionValue(o)} value={optionValue(o)} sx={{ textTransform: 'capitalize' }}>
                        {optionLabel(o)}
                      </MenuItem>
                    ))}
                </TextField>
              ))}
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={() => setDialogOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={saving}>
              {saving ? 'Saving...' : 'Save'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={snack.open}
        autoHideDuration={3500}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snack.severity} variant="filled" onClose={() => setSnack({ ...snack, open: false })}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Card>
  );
}
