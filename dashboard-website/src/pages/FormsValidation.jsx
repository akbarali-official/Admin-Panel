import React, { useState } from 'react';
import { Alert, Button, Card, Checkbox, FormControlLabel, FormHelperText, Stack, TextField, Typography } from '@mui/material';

// Form validation ka demo: data kahin save nahi hota
const validate = (v) => {
  const e = {};
  if (!v.name.trim()) e.name = 'Name zaroori hai';
  else if (v.name.trim().length < 3) e.name = 'Name kam az kam 3 letters ka ho';
  if (!v.email) e.email = 'Email zaroori hai';
  else if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Email sahi format mein likho';
  if (!v.age) e.age = 'Age zaroori hai';
  else if (Number(v.age) < 18 || Number(v.age) > 100) e.age = 'Age 18 se 100 ke beech ho';
  if (!v.password) e.password = 'Password zaroori hai';
  else if (v.password.length < 6) e.password = 'Password kam az kam 6 characters ka ho';
  if (v.confirm !== v.password) e.confirm = 'Dono password same hone chahiye';
  if (!v.terms) e.terms = 'Terms accept karna zaroori hai';
  return e;
};

const initial = { name: '', email: '', age: '', password: '', confirm: '', terms: false };

export default function FormsValidation() {
  const [values, setValues] = useState(initial);
  const [touched, setTouched] = useState({});
  const [done, setDone] = useState(false);

  const errors = validate(values);
  const show = (field) => (touched[field] ? errors[field] : undefined);
  const bind = (field) => ({
    value: values[field],
    onChange: (e) => setValues({ ...values, [field]: e.target.value }),
    onBlur: () => setTouched({ ...touched, [field]: true }),
    error: !!show(field),
    helperText: show(field),
    fullWidth: true,
    size: 'small'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, age: true, password: true, confirm: true, terms: true });
    if (Object.keys(errors).length === 0) {
      setDone(true);
      setValues(initial);
      setTouched({});
    } else {
      setDone(false);
    }
  };

  return (
    <Card sx={{ borderRadius: '16px', p: { xs: 2, sm: 3 }, maxWidth: 560 }}>
      <Typography variant="h5" fontWeight={700}>
        Forms Validation
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Demo form: galat data daalo to har field apna error dikhati hai. Data save nahi hota.
      </Typography>
      {done && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Sab fields sahi thin. Form valid hai!
        </Alert>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <Stack spacing={2}>
          <TextField label="Name" {...bind('name')} />
          <TextField label="Email" {...bind('email')} />
          <TextField label="Age" type="number" {...bind('age')} />
          <TextField label="Password" type="password" {...bind('password')} />
          <TextField label="Confirm Password" type="password" {...bind('confirm')} />
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.terms}
                  onChange={(e) => setValues({ ...values, terms: e.target.checked })}
                  onBlur={() => setTouched({ ...touched, terms: true })}
                />
              }
              label="Main terms accept karta hoon"
            />
            {show('terms') && <FormHelperText error>{show('terms')}</FormHelperText>}
          </div>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </form>
    </Card>
  );
}
