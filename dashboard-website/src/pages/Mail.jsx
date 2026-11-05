import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Snackbar,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import api from '../services/api';

const emptyCompose = { toEmail: '', subject: '', body: '' };

export default function Mail() {
  const [box, setBox] = useState('inbox');
  const [mails, setMails] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [composeOpen, setComposeOpen] = useState(false);
  const [compose, setCompose] = useState(emptyCompose);
  const [recipients, setRecipients] = useState([]);
  const [composeError, setComposeError] = useState('');
  const [sending, setSending] = useState(false);
  const [snack, setSnack] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.get(`/mails?box=${box}`);
      setMails(Array.isArray(data) ? data : []);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [box]);

  useEffect(() => {
    setSelected(null);
    load();
  }, [load]);

  const openMail = async (mail) => {
    try {
      const full = await api.get(`/mails/${mail._id}`);
      setSelected(full);
      // list mein bhi "read" nishaan lagao
      setMails((list) => list.map((m) => (m._id === mail._id ? { ...m, read: true } : m)));
    } catch (err) {
      setError(err.message);
    }
  };

  const openCompose = async () => {
    setCompose(emptyCompose);
    setComposeError('');
    setComposeOpen(true);
    try {
      setRecipients(await api.get('/mails/recipients'));
    } catch (err) {
      setComposeError(err.message);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!compose.toEmail || !compose.body.trim()) {
      setComposeError('Receiver aur message dono zaroori hain');
      return;
    }
    setSending(true);
    try {
      await api.post('/mails', compose);
      setComposeOpen(false);
      setSnack('Mail bhej di gayi');
      if (box === 'sent') load();
    } catch (err) {
      setComposeError(err.message);
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async () => {
    if (!selected || !window.confirm('Ye mail delete karni hai?')) return;
    try {
      await api.delete(`/mails/${selected._id}`);
      setMails((list) => list.filter((m) => m._id !== selected._id));
      setSelected(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const unread = box === 'inbox' ? mails.filter((m) => !m.read).length : 0;

  return (
    <Card sx={{ borderRadius: '16px', p: { xs: 1.5, sm: 2.5 } }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
        <Typography variant="h5" fontWeight={700}>
          Mail
        </Typography>
        <Button variant="contained" startIcon={<CreateOutlinedIcon />} onClick={openCompose}>
          Compose
        </Button>
      </Stack>

      <Tabs value={box} onChange={(e, v) => setBox(v)} sx={{ mb: 1 }}>
        <Tab value="inbox" label={unread ? `Inbox (${unread})` : 'Inbox'} />
        <Tab value="sent" label="Sent" />
      </Tabs>

      {error && (
        <Alert severity="error" sx={{ mb: 1 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
              <CircularProgress size={28} />
            </Box>
          ) : mails.length === 0 ? (
            <Typography color="text.secondary" textAlign="center" sx={{ py: 5 }}>
              Koi mail nahi
            </Typography>
          ) : (
            <Stack divider={<Divider />} sx={{ border: '1px solid #eee', borderRadius: '12px' }}>
              {mails.map((m) => {
                const person = box === 'inbox' ? m.from : m.to;
                const isUnread = box === 'inbox' && !m.read;
                const active = selected && selected._id === m._id;
                return (
                  <Box
                    key={m._id}
                    onClick={() => openMail(m)}
                    sx={{
                      p: 1.5,
                      cursor: 'pointer',
                      bgcolor: active ? 'primary.light' : '#fff',
                      '&:hover': { bgcolor: 'primary.light' }
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" fontWeight={isUnread ? 800 : 500}>
                        {box === 'sent' ? 'To: ' : ''}
                        {person ? person.name : 'Deleted user'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(m.createdAt).toLocaleDateString()}
                      </Typography>
                    </Stack>
                    <Typography variant="body2" fontWeight={isUnread ? 700 : 400} noWrap>
                      {isUnread ? '● ' : ''}
                      {m.subject}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" noWrap display="block">
                      {m.body}
                    </Typography>
                  </Box>
                );
              })}
            </Stack>
          )}
        </Grid>

        <Grid item xs={12} md={7}>
          <Box sx={{ border: '1px solid #eee', borderRadius: '12px', p: 2, minHeight: 240 }}>
            {selected ? (
              <>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                  <Box>
                    <Typography variant="h6" fontWeight={700}>
                      {selected.subject}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      From: {selected.from ? `${selected.from.name} <${selected.from.email}>` : 'Deleted user'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      To: {selected.to ? `${selected.to.name} <${selected.to.email}>` : 'Deleted user'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(selected.createdAt).toLocaleString()}
                    </Typography>
                  </Box>
                  <IconButton color="error" onClick={handleDelete} aria-label="delete mail">
                    <DeleteOutlineIcon />
                  </IconButton>
                </Stack>
                <Divider sx={{ my: 1.5 }} />
                <Typography sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{selected.body}</Typography>
              </>
            ) : (
              <Typography color="text.secondary" textAlign="center" sx={{ py: 8 }}>
                Padhne ke liye koi mail chuno
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>

      <Dialog open={composeOpen} onClose={() => !sending && setComposeOpen(false)} fullWidth maxWidth="sm">
        <form onSubmit={handleSend} noValidate>
          <DialogTitle>New Mail</DialogTitle>
          <DialogContent>
            {composeError && (
              <Alert severity="error" sx={{ mb: 1 }}>
                {composeError}
              </Alert>
            )}
            <TextField
              select
              fullWidth
              margin="dense"
              size="small"
              label="To"
              value={compose.toEmail}
              onChange={(e) => setCompose({ ...compose, toEmail: e.target.value })}
              helperText={recipients.length === 0 ? 'Koi dusra user nahi mila (pehle ek aur account banao)' : ''}
            >
              {recipients.map((r) => (
                <MenuItem key={r._id} value={r.email}>
                  {r.name} ({r.email})
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              margin="dense"
              size="small"
              label="Subject"
              value={compose.subject}
              onChange={(e) => setCompose({ ...compose, subject: e.target.value })}
            />
            <TextField
              fullWidth
              margin="dense"
              size="small"
              label="Message"
              multiline
              minRows={5}
              value={compose.body}
              onChange={(e) => setCompose({ ...compose, body: e.target.value })}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={() => setComposeOpen(false)} disabled={sending}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={sending}>
              {sending ? 'Sending...' : 'Send'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar open={!!snack} autoHideDuration={3000} onClose={() => setSnack('')} message={snack} />
    </Card>
  );
}
