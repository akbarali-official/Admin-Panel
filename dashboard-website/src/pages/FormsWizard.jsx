import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Box, Button, Card, MenuItem, Step, StepLabel, Stepper, Stack, TextField, Typography } from '@mui/material';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const STEPS = ['Customer', 'Invoice', 'Review'];

// 3 step ka wizard: pehle customer, phir uska invoice. Asli data save hota hai.
export default function FormsWizard() {
  const { isAdmin } = useAuth();
  const [step, setStep] = useState(0);
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '', company: '' });
  const [invoice, setInvoice] = useState({ amount: '', status: 'pending', dueDate: '', notes: '' });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  const next = () => {
    if (step === 0 && !customer.name.trim()) return setError('Customer ka naam zaroori hai');
    if (step === 1 && (invoice.amount === '' || Number(invoice.amount) < 0)) return setError('Amount sahi likho');
    setError('');
    setStep(step + 1);
  };

  const finish = async () => {
    setSaving(true);
    setError('');
    try {
      await api.post('/customers', { ...customer, name: customer.name.trim(), status: 'active' });
      const payload = {
        customer: customer.name.trim(),
        amount: Number(invoice.amount),
        status: invoice.status,
        notes: invoice.notes
      };
      if (invoice.dueDate) payload.dueDate = invoice.dueDate;
      await api.post('/invoices', payload);
      setDone(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const reset = () => {
    setStep(0);
    setCustomer({ name: '', email: '', phone: '', company: '' });
    setInvoice({ amount: '', status: 'pending', dueDate: '', notes: '' });
    setDone(false);
    setError('');
  };

  if (!isAdmin) {
    return <Alert severity="info">Ye wizard data save karta hai, isliye sirf admin istemal kar sakta hai.</Alert>;
  }

  return (
    <Card sx={{ borderRadius: '16px', p: { xs: 2, sm: 3 }, maxWidth: 620 }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        Forms Wizard
      </Typography>
      <Stepper activeStep={done ? STEPS.length : step} sx={{ mb: 3 }}>
        {STEPS.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {done ? (
        <Box>
          <Alert severity="success" sx={{ mb: 2 }}>
            Customer aur invoice dono save ho gaye.
          </Alert>
          <Stack direction="row" spacing={1.5}>
            <Button variant="contained" component={RouterLink} to="/invoices">
              Invoices dekho
            </Button>
            <Button onClick={reset}>Naya banao</Button>
          </Stack>
        </Box>
      ) : (
        <>
          {step === 0 && (
            <Stack spacing={2}>
              <TextField size="small" label="Name" required value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
              <TextField size="small" label="Email" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} />
              <TextField size="small" label="Phone" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} />
              <TextField size="small" label="Company" value={customer.company} onChange={(e) => setCustomer({ ...customer, company: e.target.value })} />
            </Stack>
          )}
          {step === 1 && (
            <Stack spacing={2}>
              <TextField size="small" type="number" label="Amount ($)" required value={invoice.amount} onChange={(e) => setInvoice({ ...invoice, amount: e.target.value })} />
              <TextField size="small" select label="Status" value={invoice.status} onChange={(e) => setInvoice({ ...invoice, status: e.target.value })}>
                {['pending', 'paid', 'overdue'].map((s) => (
                  <MenuItem key={s} value={s} sx={{ textTransform: 'capitalize' }}>
                    {s}
                  </MenuItem>
                ))}
              </TextField>
              <TextField size="small" type="date" label="Due Date" InputLabelProps={{ shrink: true }} value={invoice.dueDate} onChange={(e) => setInvoice({ ...invoice, dueDate: e.target.value })} />
              <TextField size="small" label="Notes" multiline minRows={2} value={invoice.notes} onChange={(e) => setInvoice({ ...invoice, notes: e.target.value })} />
            </Stack>
          )}
          {step === 2 && (
            <Stack spacing={0.75}>
              <Typography fontWeight={700}>Customer</Typography>
              <Typography variant="body2">
                {customer.name} {customer.company ? `(${customer.company})` : ''}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {customer.email || 'no email'} • {customer.phone || 'no phone'}
              </Typography>
              <Typography fontWeight={700} sx={{ mt: 1 }}>
                Invoice
              </Typography>
              <Typography variant="body2">
                ${invoice.amount} • {invoice.status} {invoice.dueDate ? `• due ${invoice.dueDate}` : ''}
              </Typography>
              {invoice.notes && (
                <Typography variant="body2" color="text.secondary">
                  {invoice.notes}
                </Typography>
              )}
            </Stack>
          )}

          <Stack direction="row" justifyContent="space-between" sx={{ mt: 3 }}>
            <Button disabled={step === 0 || saving} onClick={() => setStep(step - 1)}>
              Back
            </Button>
            {step < STEPS.length - 1 ? (
              <Button variant="contained" onClick={next}>
                Next
              </Button>
            ) : (
              <Button variant="contained" onClick={finish} disabled={saving}>
                {saving ? 'Saving...' : 'Save'}
              </Button>
            )}
          </Stack>
        </>
      )}
    </Card>
  );
}
