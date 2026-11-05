import React, { useState } from 'react';
import {
  Accordion, AccordionDetails, AccordionSummary, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Menu, MenuItem,
  Pagination, Rating, Slider, Snackbar, Stack, Tooltip, Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

export default function UiAdvance() {
  const [dialog, setDialog] = useState(false);
  const [snack, setSnack] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const [rating, setRating] = useState(3);
  const [slider, setSlider] = useState(40);
  const [page, setPage] = useState(1);

  return (
    <Card sx={{ borderRadius: '16px', p: { xs: 2, sm: 3 } }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        UI Elements: Advance
      </Typography>

      <Section title="Dialog, Snackbar, Menu, Tooltip">
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Button variant="contained" onClick={() => setDialog(true)}>Open dialog</Button>
          <Button variant="outlined" onClick={() => setSnack(true)}>Show snackbar</Button>
          <Button variant="outlined" onClick={(e) => setAnchor(e.currentTarget)}>Open menu</Button>
          <Tooltip title="Ye tooltip hai">
            <Button>Hover me</Button>
          </Tooltip>
        </Stack>
        <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
          <MenuItem onClick={() => setAnchor(null)}>Profile</MenuItem>
          <MenuItem onClick={() => setAnchor(null)}>Settings</MenuItem>
        </Menu>
      </Section>

      <Section title="Rating, Slider, Pagination">
        <Stack spacing={2}>
          <Rating value={rating} onChange={(e, v) => setRating(v || 1)} />
          <Slider value={slider} onChange={(e, v) => setSlider(v)} valueLabelDisplay="auto" />
          <Pagination count={8} page={page} onChange={(e, v) => setPage(v)} color="primary" />
        </Stack>
      </Section>

      <Typography fontWeight={700} sx={{ mb: 1 }}>
        Accordion
      </Typography>
      {['Pehla sawal', 'Doosra sawal'].map((q) => (
        <Accordion key={q} disableGutters elevation={0} sx={{ border: '1px solid #eee', mb: 1 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{q}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="text.secondary">Yahan jawab ya detail aati hai.</Typography>
          </AccordionDetails>
        </Accordion>
      ))}

      <Dialog open={dialog} onClose={() => setDialog(false)}>
        <DialogTitle>Sample dialog</DialogTitle>
        <DialogContent>
          <Typography>Ye ek popup (modal) dialog hai.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snack} autoHideDuration={2500} onClose={() => setSnack(false)} message="Ye snackbar message hai" />
    </Card>
  );
}
