import React, { useState } from 'react';
import {
  Alert, Avatar, AvatarGroup, Badge, Button, Card, Checkbox, Chip, Divider, FormControlLabel, LinearProgress, Radio, RadioGroup,
  Stack, Switch, Tab, Tabs, Typography
} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';

function Section({ title, children }) {
  return (
    <>
      <Typography fontWeight={700} sx={{ mb: 1 }}>
        {title}
      </Typography>
      {children}
      <Divider sx={{ my: 2.5 }} />
    </>
  );
}

export default function UiBasic() {
  const [tab, setTab] = useState(0);
  const [radio, setRadio] = useState('a');

  return (
    <Card sx={{ borderRadius: '16px', p: { xs: 2, sm: 3 } }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        UI Elements: Basic
      </Typography>

      <Section title="Buttons">
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="text">Text</Button>
          <Button variant="contained" color="success">Success</Button>
          <Button variant="contained" color="error">Error</Button>
          <Button variant="contained" disabled>Disabled</Button>
        </Stack>
      </Section>

      <Section title="Chips, Badge, Avatars">
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
          <Chip label="Default" />
          <Chip label="Primary" color="primary" />
          <Chip label="Outlined" variant="outlined" />
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
          <AvatarGroup max={3}>
            <Avatar>A</Avatar>
            <Avatar sx={{ bgcolor: 'secondary.main' }}>B</Avatar>
            <Avatar sx={{ bgcolor: 'success.main' }}>C</Avatar>
            <Avatar>D</Avatar>
          </AvatarGroup>
        </Stack>
      </Section>

      <Section title="Alerts">
        <Stack spacing={1}>
          <Alert severity="success">Success alert</Alert>
          <Alert severity="info">Info alert</Alert>
          <Alert severity="warning">Warning alert</Alert>
          <Alert severity="error">Error alert</Alert>
        </Stack>
      </Section>

      <Section title="Progress">
        <Stack spacing={1.5}>
          <LinearProgress variant="determinate" value={30} />
          <LinearProgress variant="determinate" value={70} color="success" />
          <LinearProgress />
        </Stack>
      </Section>

      <Section title="Selection controls">
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
          <FormControlLabel control={<Checkbox defaultChecked />} label="Checkbox" />
          <FormControlLabel control={<Switch defaultChecked />} label="Switch" />
          <RadioGroup row value={radio} onChange={(e) => setRadio(e.target.value)}>
            <FormControlLabel value="a" control={<Radio />} label="Option A" />
            <FormControlLabel value="b" control={<Radio />} label="Option B" />
          </RadioGroup>
        </Stack>
      </Section>

      <Typography fontWeight={700} sx={{ mb: 1 }}>
        Tabs
      </Typography>
      <Tabs value={tab} onChange={(e, v) => setTab(v)}>
        <Tab label="One" />
        <Tab label="Two" />
        <Tab label="Three" />
      </Tabs>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Tab number {tab + 1} ka content.
      </Typography>
    </Card>
  );
}
