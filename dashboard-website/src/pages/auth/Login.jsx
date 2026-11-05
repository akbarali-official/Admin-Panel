import React, { useState } from 'react';
import { Link as RouterLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Alert, Box, Button, CircularProgress, Link, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import AuthCard from './AuthCard';

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email.trim(), password);
      navigate((location.state && location.state.from) || '/', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Hi, Welcome Back" subtitle="Dashboard mein jaane ke liye login karo">
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={2}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            autoFocus
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading || !email || !password}
            startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
          >
            Sign in
          </Button>
          <Typography variant="body2" textAlign="center" color="text.secondary">
            Account nahi hai?{' '}
            <Link component={RouterLink} to="/register" underline="hover" fontWeight={600}>
              Register karo
            </Link>
          </Typography>
        </Stack>
      </Box>
    </AuthCard>
  );
}
