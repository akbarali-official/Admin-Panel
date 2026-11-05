import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Card, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  {
    q: 'Dashboard ka data kahan se aata hai?',
    a: 'Backend (Express + MongoDB) se. Dashboard page ek hi API call (/api/dashboard) se saare cards bhar leta hai.'
  },
  {
    q: 'Add / edit / delete kaun kar sakta hai?',
    a: 'Sirf admin. Pehla register hone wala user khud admin ban jata hai, aur seed script ka admin@dashboard.com bhi admin hai.'
  },
  {
    q: 'Login token kahan save hota hai?',
    a: 'Browser ki localStorage mein. Logout karne par hat jata hai.'
  },
  {
    q: 'Kuch menu items par "jaldi aayega" kyun aata hai?',
    a: 'Un pages ka frontend aur backend abhi bana nahi. Banne ke baad un ke link khud kaam karne lagenge.'
  }
];

export default function FAQs() {
  return (
    <Card sx={{ borderRadius: '16px', p: { xs: 2, sm: 3 } }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        FAQs
      </Typography>
      {faqs.map((f) => (
        <Accordion key={f.q} disableGutters elevation={0} sx={{ border: '1px solid #eee', mb: 1, borderRadius: '10px !important' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={600}>{f.q}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="text.secondary">{f.a}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Card>
  );
}
