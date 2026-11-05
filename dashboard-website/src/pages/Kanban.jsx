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
  Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import api from '../services/api';

const COLUMNS = [
  { id: 'todo', title: 'To Do', bg: '#e3f2fd' },
  { id: 'inprogress', title: 'In Progress', bg: '#fff8e1' },
  { id: 'done', title: 'Done', bg: '#e6f9ea' }
];
const PRIORITY_COLOR = { low: 'success', medium: 'warning', high: 'error' };
const emptyForm = { title: '', description: '', status: 'todo', priority: 'medium', assignee: '', dueDate: '' };

export default function Kanban() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.get('/tasks');
      setTasks(Array.isArray(data) ? data : []);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Task ka column badalna (drag-drop aur arrow buttons dono yahi use karte hain)
  const moveTask = async (id, status) => {
    const task = tasks.find((t) => t._id === id);
    if (!task || task.status === status) return;
    const previous = tasks;
    setTasks(tasks.map((t) => (t._id === id ? { ...t, status } : t)));
    try {
      await api.put(`/tasks/${id}`, { status });
    } catch (err) {
      setTasks(previous); // fail hua to wapas purani jagah
      setError(err.message);
    }
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    setDragOver('');
    moveTask(e.dataTransfer.getData('text/plain'), status);
  };

  const openCreate = (status = 'todo') => {
    setEditing(null);
    setForm({ ...emptyForm, status });
    setFormError('');
    setDialogOpen(true);
  };

  const openEdit = (task) => {
    setEditing(task);
    setForm({
      title: task.title || '',
      description: task.description || '',
      status: task.status,
      priority: task.priority,
      assignee: task.assignee || '',
      dueDate: task.dueDate ? String(task.dueDate).slice(0, 10) : ''
    });
    setFormError('');
    setDialogOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setFormError('Title zaroori hai');
      return;
    }
    setSaving(true);
    try {
      const payload = { ...form, title: form.title.trim() };
      if (!payload.dueDate) delete payload.dueDate;
      if (editing) await api.put(`/tasks/${editing._id}`, payload);
      else await api.post('/tasks', payload);
      setDialogOpen(false);
      load();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (task) => {
    if (!window.confirm('Ye task delete karna hai?')) return;
    try {
      await api.delete(`/tasks/${task._id}`);
      setTasks((list) => list.filter((t) => t._id !== task._id));
    } catch (err) {
      setError(err.message);
    }
  };

  const shift = (task, step) => {
    const index = COLUMNS.findIndex((c) => c.id === task.status) + step;
    if (index >= 0 && index < COLUMNS.length) moveTask(task._id, COLUMNS[index].id);
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h5" fontWeight={700}>
          Kanban Board
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => openCreate('todo')}>
          Add Task
        </Button>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {COLUMNS.map((col) => {
            const items = tasks.filter((t) => t.status === col.id);
            return (
              <Grid item xs={12} md={4} key={col.id}>
                <Box
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(col.id);
                  }}
                  onDragLeave={() => setDragOver('')}
                  onDrop={(e) => handleDrop(e, col.id)}
                  sx={{
                    bgcolor: col.bg,
                    borderRadius: '16px',
                    p: 1.5,
                    minHeight: 320,
                    outline: dragOver === col.id ? '2px dashed #673ab7' : '2px dashed transparent'
                  }}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5, px: 0.5 }}>
                    <Typography fontWeight={700}>
                      {col.title} <Chip size="small" label={items.length} sx={{ ml: 0.5 }} />
                    </Typography>
                    <IconButton size="small" onClick={() => openCreate(col.id)} aria-label="add task">
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Stack>

                  <Stack spacing={1.25}>
                    {items.map((task) => (
                      <Card
                        key={task._id}
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData('text/plain', task._id)}
                        sx={{ p: 1.5, borderRadius: '12px', cursor: 'grab' }}
                      >
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                          <Typography fontWeight={600} sx={{ wordBreak: 'break-word' }}>
                            {task.title}
                          </Typography>
                          <Chip size="small" label={task.priority} color={PRIORITY_COLOR[task.priority]} sx={{ ml: 1 }} />
                        </Stack>
                        {task.description && (
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            {task.description}
                          </Typography>
                        )}
                        <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.75 }}>
                          {task.assignee ? `👤 ${task.assignee}` : ''}
                          {task.assignee && task.dueDate ? '  •  ' : ''}
                          {task.dueDate ? `📅 ${new Date(task.dueDate).toLocaleDateString()}` : ''}
                        </Typography>
                        <Stack direction="row" justifyContent="space-between" sx={{ mt: 0.5 }}>
                          <Box>
                            <IconButton size="small" disabled={col.id === 'todo'} onClick={() => shift(task, -1)} aria-label="move left">
                              <ChevronLeftIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" disabled={col.id === 'done'} onClick={() => shift(task, 1)} aria-label="move right">
                              <ChevronRightIcon fontSize="small" />
                            </IconButton>
                          </Box>
                          <Box>
                            <IconButton size="small" onClick={() => openEdit(task)} aria-label="edit">
                              <EditOutlinedIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" color="error" onClick={() => handleDelete(task)} aria-label="delete">
                              <DeleteOutlineIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Stack>
                      </Card>
                    ))}
                    {items.length === 0 && (
                      <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ py: 3 }}>
                        Yahan task drag karo
                      </Typography>
                    )}
                  </Stack>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      )}

      <Dialog open={dialogOpen} onClose={() => !saving && setDialogOpen(false)} fullWidth maxWidth="sm">
        <form onSubmit={handleSave} noValidate>
          <DialogTitle>{editing ? 'Edit Task' : 'Add Task'}</DialogTitle>
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
            <Stack direction="row" spacing={1.5}>
              <TextField
                select
                fullWidth
                margin="dense"
                size="small"
                label="Status"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                {COLUMNS.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.title}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                fullWidth
                margin="dense"
                size="small"
                label="Priority"
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
              >
                {['low', 'medium', 'high'].map((p) => (
                  <MenuItem key={p} value={p} sx={{ textTransform: 'capitalize' }}>
                    {p}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Stack direction="row" spacing={1.5}>
              <TextField
                fullWidth
                margin="dense"
                size="small"
                label="Assignee"
                value={form.assignee}
                onChange={(e) => setForm({ ...form, assignee: e.target.value })}
              />
              <TextField
                fullWidth
                margin="dense"
                size="small"
                type="date"
                label="Due Date"
                InputLabelProps={{ shrink: true }}
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              />
            </Stack>
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
    </>
  );
}
