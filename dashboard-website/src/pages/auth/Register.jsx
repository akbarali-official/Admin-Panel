import React, { useState } from 'react';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';
import { Alert, Box, Button, CircularProgress, Link, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import AuthCard from './AuthCard';

export default function Register() {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) {
      setError('Password kam az kam 6 characters ka ho');
      return;
    }
    setLoading(true);
    try {
      await register(name.trim(), email.trim(), password);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Sign up" subtitle="Naya account banao">
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={2}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth autoFocus />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText="Kam az kam 6 characters"
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading || !name || !email || !password}
            startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
          >
            Sign up
          </Button>
          <Typography variant="body2" textAlign="center" color="text.secondary">
            Pehle se account hai?{' '}
            <Link component={RouterLink} to="/login" underline="hover" fontWeight={600}>
              Login karo
            </Link>
          </Typography>
        </Stack>
      </Box>
    </AuthCard>
  );
}
