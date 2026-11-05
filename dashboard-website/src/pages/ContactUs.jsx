import React, { useState } from 'react';
import { Alert, Button, Card, Stack, TextField, Typography } from '@mui/material';
import api from '../services/api';

const empty = { name: '', email: '', subject: '', message: '' };

// Form ka message backend mein save hota hai (admin "Contact" page par dekhta hai)
export default function ContactUs() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState({ type: '', text: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email) || !form.message.trim()) {
      setStatus({ type: 'error', text: 'Name, sahi email aur message zaroori hain' });
      return;
    }
    setSending(true);
    try {
      const res = await api.post('/contact-messages', form);
      setStatus({ type: 'success', text: res.message || 'Message bhej diya gaya' });
      setForm(empty);
    } catch (err) {
      setStatus({ type: 'error', text: err.message });
    } finally {
      setSending(false);
    }
  };

  const bind = (field) => ({
    value: form[field],
    onChange: (e) => setForm({ ...form, [field]: e.target.value }),
    fullWidth: true,
    size: 'small'
  });

  return (
    <Card sx={{ borderRadius: '16px', p: { xs: 2, sm: 3 }, maxWidth: 560 }}>
      <Typography variant="h5" fontWeight={700}>
        Contact Us
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Apna message bhejo. Admin ko "Contact" menu mein nazar aayega.
      </Typography>
      {status.text && (
        <Alert severity={status.type} sx={{ mb: 2 }}>
          {status.text}
        </Alert>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <Stack spacing={2}>
          <TextField label="Name" {...bind('name')} />
          <TextField label="Email" {...bind('email')} />
          <TextField label="Subject" {...bind('subject')} />
          <TextField label="Message" multiline minRows={4} {...bind('message')} />
          <Button type="submit" variant="contained" disabled={sending}>
            {sending ? 'Sending...' : 'Send message'}
          </Button>
        </Stack>
      </form>
    </Card>
  );
}
