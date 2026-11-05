import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Avatar, Box, Card, IconButton, Stack, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const POLL_MS = 3000; // har 3 second mein naye messages check

export default function Chat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);

  const load = useCallback(async () => {
    try {
      const data = await api.get('/chat');
      setMessages((prev) => {
        const sameEnd = prev.length === data.length && (data.length === 0 || prev[prev.length - 1]._id === data[data.length - 1]._id);
        return sameEnd ? prev : data;
      });
      setError('');
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    load();
    const timer = setInterval(load, POLL_MS);
    return () => clearInterval(timer);
  }, [load]);

  useEffect(() => {
    if (bottomRef.current && bottomRef.current.scrollIntoView) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length]);

  const handleSend = async (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value || sending) return;
    setSending(true);
    try {
      const saved = await api.post('/chat', { text: value });
      setMessages((prev) => [...prev, saved]);
      setText('');
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <Card sx={{ borderRadius: '16px', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 190px)', minHeight: 420 }}>
      <Box sx={{ p: 2, borderBottom: '1px solid #eee' }}>
        <Typography variant="h6" fontWeight={700}>
          Group Chat
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Sab logged-in users ek hi room mein hain. Naye messages khud aa jate hain.
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ m: 1 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
        <Stack spacing={1.5}>
          {messages.map((m) => {
            const mine = user && String(m.sender) === String(user._id);
            return (
              <Stack key={m._id} direction={mine ? 'row-reverse' : 'row'} spacing={1} alignItems="flex-end">
                <Avatar sx={{ width: 32, height: 32, bgcolor: mine ? 'primary.main' : 'secondary.main', fontSize: 14 }}>
                  {(m.senderName || '?').charAt(0).toUpperCase()}
                </Avatar>
                <Box
                  sx={{
                    maxWidth: '75%',
                    px: 1.5,
                    py: 1,
                    borderRadius: '14px',
                    bgcolor: mine ? 'primary.main' : 'grey.100',
                    color: mine ? '#fff' : 'text.primary'
                  }}
                >
                  {!mine && (
                    <Typography variant="caption" fontWeight={700} color="primary.main" display="block">
                      {m.senderName}
                    </Typography>
                  )}
                  <Typography variant="body2" sx={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
                    {m.text}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.7 }} display="block" textAlign="right">
                    {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                </Box>
              </Stack>
            );
          })}
          {messages.length === 0 && (
            <Typography color="text.secondary" textAlign="center" sx={{ py: 6 }}>
              Abhi koi message nahi. Pehla message tum bhejo!
            </Typography>
          )}
          <div ref={bottomRef} />
        </Stack>
      </Box>

      <Box component="form" onSubmit={handleSend} sx={{ p: 1.5, borderTop: '1px solid #eee' }}>
        <Stack direction="row" spacing={1}>
          <TextField
            fullWidth
            size="small"
            placeholder="Message likho..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            inputProps={{ maxLength: 1000 }}
          />
          <IconButton type="submit" color="primary" disabled={!text.trim() || sending} aria-label="send">
            <SendIcon />
          </IconButton>
        </Stack>
      </Box>
    </Card>
  );
}
