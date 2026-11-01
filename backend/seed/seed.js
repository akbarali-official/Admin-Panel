import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import Earning from '../models/Earning.js';
import Order from '../models/Order.js';
import Income from '../models/Income.js';
import Growth from '../models/Growth.js';
import Stock from '../models/Stock.js';
import Customer from '../models/Customer.js';
import Invoice from '../models/Invoice.js';
import Product from '../models/Product.js';
import Post from '../models/Post.js';
import Task from '../models/Task.js';
import Event from '../models/Event.js';
import ChatMessage from '../models/ChatMessage.js';
import Mail from '../models/Mail.js';
import ContactMessage from '../models/ContactMessage.js';

dotenv.config();

const DAY = 24 * 60 * 60 * 1000;

const seed = async () => {
  await connectDB();

  try {
    // Pehle purana data saaf
    await Promise.all([
      User.deleteMany(),
      Earning.deleteMany(),
      Order.deleteMany(),
      Income.deleteMany(),
      Growth.deleteMany(),
      Stock.deleteMany(),
      Customer.deleteMany(),
      Invoice.deleteMany(),
      Product.deleteMany(),
      Post.deleteMany(),
      Task.deleteMany(),
      Event.deleteMany(),
      ChatMessage.deleteMany(),
      Mail.deleteMany(),
      ContactMessage.deleteMany()
    ]);

    // 1) Admin user (create() use kiya taake password hash ho)
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@dashboard.com',
      password: 'admin123',
      role: 'admin'
    });
    // Chat / Mail test karne ke liye ek normal user bhi
    const demo = await User.create({
      name: 'Demo User',
      email: 'user@dashboard.com',
      password: 'user123',
      role: 'user'
    });

    // 2) Earning: total = 500
    await Earning.insertMany(
      [100, 100, 100, 100, 100].map((amount) => ({ amount, note: 'Seed earning' }))
    );

    // 3) Income: total = 203000 (card par $203k)
    await Income.insertMany(
      [50000, 60000, 43000, 50000].map((amount) => ({ amount, source: 'Seed income' }))
    );

    // 4) Orders: total = 961
    const now = new Date();
    const olderMonths = [120, 210, 95, 160, 140, 105, 75]; // 7 purane mahine
    const names = ['Ali Raza', 'Sara Khan', 'Ahmed Traders', 'Hina Store', 'Bilal & Co', 'Zara Boutique', 'Usman Tech'];
    const olderOrders = olderMonths.map((amount, i) => ({
      customer: names[i % names.length],
      amount,
      date: new Date(now.getFullYear(), now.getMonth() - (7 - i), 15)
    }));
    const recentOrders = [2, 9, 16, 23].map((daysAgo, i) => ({
      customer: names[(i + 2) % names.length],
      amount: 14, // 4 x 14 = 56 (pichle 30 din)
      date: new Date(now.getTime() - daysAgo * DAY)
    }));
    await Order.insertMany([...olderOrders, ...recentOrders]);

    // 5) Growth chart: frontend ka wahi hardcoded data
    const year = now.getFullYear();
    const growth = [
      ['Jan', 40, 25, 30, 10],
      ['Feb', 60, 70, 145, 5],
      ['Mar', 45, 20, 15, 65],
      ['Apr', 55, 20, 25, 8],
      ['May', 60, 25, 25, 12],
      ['Jun', 80, 55, 95, 15],
      ['Jul', 75, 40, 100, 10],
      ['Aug', 25, 15, 10, 8],
      ['Sep', 45, 30, 40, 10],
      ['Oct', 85, 45, 55, 60],
      ['Nov', 20, 25, 15, 65],
      ['Dec', 75, 40, 35, 8]
    ].map(([month, investment, loss, profit, maintenance]) => ({
      year,
      month,
      investment,
      loss,
      profit,
      maintenance
    }));
    await Growth.insertMany(growth);

    // 6) Popular stocks
    await Stock.insertMany([
      {
        name: 'Bajaj Finserv',
        amount: 1839,
        changePercent: 10,
        isProfit: true,
        featured: true,
        history: [20, 45, 30, 70, 40, 55, 65, 50]
      },
      { name: 'TTML', amount: 100, changePercent: 10, isProfit: false },
      { name: 'Reliance', amount: 200, changePercent: 10, isProfit: true },
      { name: 'TTML', amount: 189, changePercent: 10, isProfit: false },
      { name: 'Stolon', amount: 189, changePercent: 10, isProfit: false }
    ]);

    // 7) Customers
    await Customer.insertMany([
      { name: 'Ali Raza', email: 'ali@example.com', phone: '0300-1111111', company: 'Raza Traders', status: 'active' },
      { name: 'Sara Khan', email: 'sara@example.com', phone: '0301-2222222', company: 'Sara Boutique', status: 'active' },
      { name: 'Bilal Ahmed', email: 'bilal@example.com', phone: '0302-3333333', company: 'Bilal & Co', status: 'lead' },
      { name: 'Hina Malik', email: 'hina@example.com', phone: '0303-4444444', company: 'Hina Store', status: 'inactive' }
    ]);

    // 8) Invoices
    const inDays = (d) => new Date(now.getTime() + d * DAY);
    await Invoice.insertMany([
      { invoiceNumber: 'INV-1001', customer: 'Ali Raza', amount: 450, status: 'paid', dueDate: inDays(-10), notes: 'Website design' },
      { invoiceNumber: 'INV-1002', customer: 'Sara Khan', amount: 1200, status: 'pending', dueDate: inDays(7), notes: 'E-commerce setup' },
      { invoiceNumber: 'INV-1003', customer: 'Bilal Ahmed', amount: 300, status: 'overdue', dueDate: inDays(-20), notes: 'Logo + banner' },
      { invoiceNumber: 'INV-1004', customer: 'Hina Malik', amount: 800, status: 'pending', dueDate: inDays(14), notes: 'Landing page' }
    ]);

    // 9) Products
    await Product.insertMany([
      { name: 'Wireless Headphones', category: 'Electronics', price: 59, stock: 40, description: 'Bluetooth 5.0, 20h battery' },
      { name: 'Running Shoes', category: 'Fashion', price: 85, stock: 25, description: 'Light weight, all sizes' },
      { name: 'Coffee Mug', category: 'Home', price: 12, stock: 120, description: 'Ceramic, 350ml' },
      { name: 'Backpack', category: 'Fashion', price: 45, stock: 0, description: 'Waterproof, 25L' }
    ]);

    // 10) Blog posts
    await Post.insertMany([
      { title: 'MERN stack kya hota hai?', content: 'MongoDB, Express, React aur Node.js ka combination...', author: 'Admin', status: 'published' },
      { title: 'Freelancing ke pehle 5 steps', content: 'Portfolio banao, profile set karo, pehla gig daalo...', author: 'Admin', status: 'draft' }
    ]);

    // 11) Kanban tasks
    await Task.insertMany([
      { title: 'Login page design karo', description: 'Figma se React mein', status: 'done', priority: 'high', assignee: 'Admin' },
      { title: 'Dashboard API connect karo', description: 'Cards ko backend se jodo', status: 'done', priority: 'high', assignee: 'Admin' },
      { title: 'Invoice page banao', description: 'CRUD + status chips', status: 'inprogress', priority: 'medium', assignee: 'Demo User', dueDate: inDays(3) },
      { title: 'Deploy on Render', description: 'Backend + Atlas', status: 'todo', priority: 'medium', assignee: 'Admin', dueDate: inDays(10) },
      { title: 'README likho', description: 'Setup steps aur screenshots', status: 'todo', priority: 'low', assignee: '' }
    ]);

    // 12) Calendar events
    const at = (days, hour) => {
      const d = new Date(now.getTime() + days * DAY);
      d.setHours(hour, 0, 0, 0);
      return d;
    };
    await Event.insertMany([
      { title: 'Assignment submission', description: 'SMIT portal par upload', start: at(2, 10), end: at(2, 11), color: 'error' },
      { title: 'Client meeting', description: 'Website requirements', start: at(4, 15), end: at(4, 16), color: 'primary' },
      { title: 'Team standup', start: at(1, 9), end: at(1, 9), color: 'success' },
      { title: 'Invoice follow-up', start: at(7, 12), color: 'warning' }
    ]);

    // 13) Chat messages
    await ChatMessage.insertMany([
      { sender: admin._id, senderName: admin.name, text: 'Salam! Dashboard chat mein khush amdeed.' },
      { sender: demo._id, senderName: demo.name, text: 'Walaikum salam! Kanban board dekha, kaafi acha hai.' },
      { sender: admin._id, senderName: admin.name, text: 'Shukriya. Mail aur calendar bhi try karo.' }
    ]);

    // 14) Mails
    await Mail.insertMany([
      { from: demo._id, to: admin._id, subject: 'Invoice ka sawal', body: 'INV-1002 ka status kab paid hoga? Please confirm.' },
      { from: admin._id, to: demo._id, subject: 'Welcome to the dashboard', body: 'Aap ka account ban gaya hai. Koi masla ho to batana.' },
      { from: demo._id, to: admin._id, subject: 'Product stock', body: 'Backpack ka stock khatam hai, dobara order karna hai.', read: true }
    ]);

    // 15) Contact messages
    await ContactMessage.insertMany([
      { name: 'Hamza Ali', email: 'hamza@example.com', subject: 'Website quote', message: 'Mujhe apne shop ke liye website chahiye. Rate kya hoga?' },
      { name: 'Ayesha', email: 'ayesha@example.com', subject: 'Support', message: 'Login par masla aa raha hai, please help.' }
    ]);

    console.log('Seed complete!');
    console.log('Admin login -> email: admin@dashboard.com | password: admin123');
    console.log('Demo user  -> email: user@dashboard.com  | password: user123');
  } catch (error) {
    console.error('Seed error:', error.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

seed();
