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
import userRoutes from './routes/userRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import invoiceRoutes from './routes/invoiceRoutes.js';
import productRoutes from './routes/productRoutes.js';
import postRoutes from './routes/postRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import mailRoutes from './routes/mailRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';

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
app.use('/api/users', userRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/products', productRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/mails', mailRoutes);
app.use('/api/contact-messages', contactRoutes);
app.use('/api/analytics', analyticsRoutes);

// Error handlers hamesha sab se last mein
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
module.exports = app;