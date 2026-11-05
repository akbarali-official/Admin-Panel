import React, { useEffect, useState } from 'react';
import { Alert, Grid } from '@mui/material';
import EarningCard from '../components/cards/EarningCard';
import TotalOrderCard from '../components/cards/TotalOrderCard';
import { TotalIncomeDarkCard, TotalIncomeLightCard } from '../components/cards/TotalIncomeCards';
import TotalGrowthBarChart from '../components/cards/TotalGrowthBarChart';
import PopularStocks from '../components/cards/PopularStocks';
import api from '../services/api';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [orderRange, setOrderRange] = useState('year');
  const [error, setError] = useState('');

  // Ek hi API call se saare cards ka data. Order card ka Month/Year badle to dobara call.
  useEffect(() => {
    let cancelled = false;
    api
      .get(`/dashboard?orderRange=${orderRange}`)
      .then((d) => {
        if (!cancelled) {
          setData(d);
          setError('');
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      });
    return () => {
      cancelled = true;
    };
  }, [orderRange]);

  return (
    <>
      {error && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Backend se data nahi aaya ({error}). Abhi demo data dikh raha hai.
        </Alert>
      )}
      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6} md={3}>
          <EarningCard total={data ? data.earning.total : undefined} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TotalOrderCard
            total={data ? data.order.total : undefined}
            series={data ? data.order.series : undefined}
            range={orderRange}
            onRangeChange={setOrderRange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TotalIncomeDarkCard total={data ? data.income.total : undefined} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TotalIncomeLightCard total={data ? data.income.total : undefined} />
        </Grid>

        <Grid item xs={12} md={8}>
          <TotalGrowthBarChart
            data={data ? data.growth.data : undefined}
            total={data ? data.growth.total : undefined}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <PopularStocks
            featured={data ? data.stocks.featured : undefined}
            list={data ? data.stocks.list : undefined}
          />
        </Grid>
      </Grid>
    </>
  );
}
