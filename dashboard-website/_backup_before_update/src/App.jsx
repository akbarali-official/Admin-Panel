import React from 'react';
import { Grid } from '@mui/material';
import MainLayout from './layout/MainLayout';
import EarningCard from './components/cards/EarningCard';
import TotalOrderCard from './components/cards/TotalOrderCard';
import { TotalIncomeDarkCard, TotalIncomeLightCard } from './components/cards/TotalIncomeCards';
import TotalGrowthBarChart from './components/cards/TotalGrowthBarChart';
import PopularStocks from './components/cards/PopularStocks';
import Footer from './components/Footer';

export default function App() {
  return (
    <MainLayout>
      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6} md={3}>
          <EarningCard />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TotalOrderCard />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TotalIncomeDarkCard />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TotalIncomeLightCard />
        </Grid>

        <Grid item xs={12} md={8}>
          <TotalGrowthBarChart />
        </Grid>
        <Grid item xs={12} md={4}>
          <PopularStocks />
        </Grid>
      </Grid>

      <Footer />
    </MainLayout>
  );
}