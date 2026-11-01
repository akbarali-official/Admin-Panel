import User from '../models/User.js';
import Customer from '../models/Customer.js';
import Product from '../models/Product.js';
import Invoice from '../models/Invoice.js';
import Order from '../models/Order.js';
import Post from '../models/Post.js';
import Task from '../models/Task.js';
import asyncHandler from '../utils/asyncHandler.js';

// field ke hisaab se group karke count + total nikalta hai
const groupBy = async (Model, field, sumField) => {
  const rows = await Model.aggregate([
    {
      $group: {
        _id: `$${field}`,
        count: { $sum: 1 },
        total: sumField ? { $sum: `$${sumField}` } : { $sum: 0 }
      }
    },
    { $sort: { count: -1 } }
  ]);
  return rows.map((r) => ({ name: r._id || 'other', count: r.count, total: r.total }));
};

// GET /api/analytics  (login zaroori)
export const getAnalytics = asyncHandler(async (req, res) => {
  const yearAgo = new Date();
  yearAgo.setFullYear(yearAgo.getFullYear() - 1);

  const [
    users,
    customers,
    products,
    invoices,
    orders,
    posts,
    tasks,
    revenueRows,
    ordersByMonth,
    invoicesByStatus,
    productsByCategory,
    customersByStatus,
    ordersByStatus,
    tasksByStatus,
    recentOrders,
    recentInvoices
  ] = await Promise.all([
    User.countDocuments(),
    Customer.countDocuments(),
    Product.countDocuments(),
    Invoice.countDocuments(),
    Order.countDocuments(),
    Post.countDocuments(),
    Task.countDocuments(),
    Order.aggregate([{ $group: { _id: null, total: { $sum: '$amount' } } }]),
    Order.aggregate([
      { $match: { date: { $gte: yearAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$date' } },
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]),
    groupBy(Invoice, 'status', 'amount'),
    groupBy(Product, 'category'),
    groupBy(Customer, 'status'),
    groupBy(Order, 'status', 'amount'),
    groupBy(Task, 'status'),
    Order.find().sort({ date: -1 }).limit(5),
    Invoice.find().sort({ createdAt: -1 }).limit(5)
  ]);

  res.json({
    totals: {
      users,
      customers,
      products,
      invoices,
      orders,
      posts,
      tasks,
      revenue: revenueRows[0] ? revenueRows[0].total : 0
    },
    ordersByMonth: ordersByMonth.map((m) => ({ month: m._id, total: m.total, count: m.count })),
    invoicesByStatus,
    productsByCategory,
    customersByStatus,
    ordersByStatus,
    tasksByStatus,
    recentOrders,
    recentInvoices
  });
});
