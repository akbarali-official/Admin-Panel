import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import earningRoutes from './routes/earningRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import incomeRoutes from './routes/incomeRoutes.js';
import growthRoutes from './routes/growthRoutes.js';
import stockRoutes from './routes/stockRoutes.js';

// .env file ki values load karo (sab se pehle)
dotenv.config();

// Database connect karo
connectDB();

const app = express();

// Middlewares
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

// Test route: check karne ke liye ke server chal raha hai
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Dashboard backend is running' });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/earnings', earningRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/growth', growthRoutes);
app.use('/api/stocks', stockRoutes);

// Error handlers hamesha sab se last mein
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
