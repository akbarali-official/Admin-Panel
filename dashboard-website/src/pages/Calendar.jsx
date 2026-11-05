import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import api from '../services/api';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const COLORS = ['primary', 'secondary', 'success', 'warning', 'error'];

const pad = (n) => String(n).padStart(2, '0');
// Date -> "2026-10-31T09:00" (datetime-local input ke liye)
const toLocalInput = (value) => {
  const d = new Date(value);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};
const sameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const emptyForm = { title: '', description: '', start: '', end: '', color: 'primary' };

export default function Calendar() {
  const today = new Date();
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      const data = await api.get('/events');
      setEvents(Array.isArray(data) ? data : []);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // 6 hafte x 7 din ka grid
  const firstWeekday = cursor.getDay();
  const cells = Array.from({ length: 42 }, (_, i) => new Date(cursor.getFullYear(), cursor.getMonth(), 1 - firstWeekday + i));

  const openCreate = (day) => {
    const start = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 9, 0);
    setEditing(null);
    setForm({ ...emptyForm, start: toLocalInput(start) });
    setFormError('');
    setDialogOpen(true);
  };

  const openEdit = (event) => {
    setEditing(event);
    setForm({
      title: event.title,
      description: event.description || '',
      start: toLocalInput(event.start),
      end: event.end ? toLocalInput(event.end) : '',
      color: event.color || 'primary'
    });
    setFormError('');
    setDialogOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.start) {
      setFormError('Title aur start time zaroori hain');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        title: form.title.trim(),
        description: form.description,
        color: form.color,
        start: new Date(form.start).toISOString()
      };
      if (form.end) payload.end = new Date(form.end).toISOString();
      if (editing) await api.put(`/events/${editing._id}`, payload);
      else await api.post('/events', payload);
      setDialogOpen(false);
      load();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!editing || !window.confirm('Ye event delete karna hai?')) return;
    setSaving(true);
    try {
      await api.delete(`/events/${editing._id}`);
      setDialogOpen(false);
      load();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const goMonth = (step) => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + step, 1));

  return (
    <Card sx={{ borderRadius: '16px', p: { xs: 1, sm: 2.5 } }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h5" fontWeight={700}>
          {MONTHS[cursor.getMonth()]} {cursor.getFullYear()}
        </Typography>
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Button size="small" onClick={() => setCursor(new Date(today.getFullYear(), today.getMonth(), 1))}>
            Today
          </Button>
          <IconButton onClick={() => goMonth(-1)} aria-label="previous month">
            <ChevronLeftIcon />
          </IconButton>
          <IconButton onClick={() => goMonth(1)} aria-label="next month">
            <ChevronRightIcon />
          </IconButton>
        </Stack>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ overflowX: 'auto' }}>
        <Box sx={{ minWidth: 560 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', mb: 0.5 }}>
            {WEEKDAYS.map((d) => (
              <Typography key={d} variant="caption" fontWeight={700} color="text.secondary" textAlign="center">
                {d}
              </Typography>
            ))}
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
            {cells.map((day) => {
              const inMonth = day.getMonth() === cursor.getMonth();
              const isToday = sameDay(day, today);
              const dayEvents = events.filter((ev) => sameDay(new Date(ev.start), day));
              return (
                <Box
                  key={day.toISOString()}
                  onClick={() => openCreate(day)}
                  sx={{
                    minHeight: 92,
                    p: 0.5,
                    borderRadius: '10px',
                    border: '1px solid #eee',
                    bgcolor: inMonth ? '#fff' : '#fafafa',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'primary.light' }
                  }}
                >
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      fontWeight: 600,
                      color: isToday ? '#fff' : inMonth ? 'text.primary' : 'text.secondary',
                      bgcolor: isToday ? 'primary.main' : 'transparent',
                      mb: 0.25
                    }}
                  >
                    {day.getDate()}
                  </Box>
                  {dayEvents.slice(0, 2).map((ev) => (
                    <Chip
                      key={ev._id}
                      size="small"
                      label={ev.title}
                      color={ev.color}
                      onClick={(e) => {
                        e.stopPropagation();
                        openEdit(ev);
                      }}
                      sx={{ display: 'flex', width: '100%', justifyContent: 'flex-start', mb: 0.25, height: 20, fontSize: 11 }}
                    />
                  ))}
                  {dayEvents.length > 2 && (
                    <Typography variant="caption" color="text.secondary">
                      +{dayEvents.length - 2} aur
                    </Typography>
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>

      <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1.5 }}>
        Kisi din par click karke event add karo, event par click karke edit/delete karo.
      </Typography>

      <Dialog open={dialogOpen} onClose={() => !saving && setDialogOpen(false)} fullWidth maxWidth="sm">
        <form onSubmit={handleSave} noValidate>
          <DialogTitle>{editing ? 'Edit Event' : 'Add Event'}</DialogTitle>
          <DialogContent>
            {formError && (
              <Alert severity="error" sx={{ mb: 1 }}>
                {formError}
              </Alert>
            )}
            <TextField
              autoFocus
              fullWidth
              margin="dense"
              size="small"
              label="Title"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <TextField
              fullWidth
              margin="dense"
              size="small"
              label="Description"
              multiline
              minRows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <TextField
                fullWidth
                margin="dense"
                size="small"
                type="datetime-local"
                label="Start"
                required
                InputLabelProps={{ shrink: true }}
                value={form.start}
                onChange={(e) => setForm({ ...form, start: e.target.value })}
              />
              <TextField
                fullWidth
                margin="dense"
                size="small"
                type="datetime-local"
                label="End (optional)"
                InputLabelProps={{ shrink: true }}
                value={form.end}
                onChange={(e) => setForm({ ...form, end: e.target.value })}
              />
            </Stack>
            <TextField
              select
              fullWidth
              margin="dense"
              size="small"
              label="Color"
              value={form.color}
              onChange={(e) => setForm({ ...form, color: e.target.value })}
            >
              {COLORS.map((c) => (
                <MenuItem key={c} value={c} sx={{ textTransform: 'capitalize' }}>
                  {c}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            {editing && (
              <Button color="error" onClick={handleDelete} disabled={saving} sx={{ mr: 'auto' }}>
                Delete
              </Button>
            )}
            <Button onClick={() => setDialogOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={saving}>
              {saving ? 'Saving...' : 'Save'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Card>
  );
}
