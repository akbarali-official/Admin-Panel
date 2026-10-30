import Earning from '../models/Earning.js';
import Order from '../models/Order.js';
import Income from '../models/Income.js';
import Growth, { MONTHS } from '../models/Growth.js';
import Stock from '../models/Stock.js';
import asyncHandler from '../utils/asyncHandler.js';

// Kisi bhi collection ke "amount" ka total nikalta hai
const sumAmount = async (Model) => {
  const result = await Model.aggregate([
    { $group: { _id: null, total: { $sum: '$amount' } } }
  ]);
  return result[0] ? result[0].total : 0;
};

// GET /api/dashboard?orderRange=year|month&year=2026
// Frontend ke saare cards ka data ek hi call mein
export const getDashboard = asyncHandler(async (req, res) => {
  const orderRange = req.query.orderRange === 'month' ? 'month' : 'year';
  const year = Number(req.query.year) || new Date().getFullYear();

  // Order ka time window: month = pichle 30 din (din ke hisaab se),
  // year = pichle 12 mahine (mahine ke hisaab se)
  const start = new Date();
  let groupFormat;
  if (orderRange === 'month') {
    start.setDate(start.getDate() - 30);
    groupFormat = '%Y-%m-%d';
  } else {
    start.setFullYear(start.getFullYear() - 1);
    groupFormat = '%Y-%m';
  }

  const [earningTotal, incomeTotal, orderBuckets, growthDocs, stocks] = await Promise.all([
    sumAmount(Earning),
    sumAmount(Income),
    Order.aggregate([
      { $match: { date: { $gte: start } } },
      {
        $group: {
          _id: { $dateToString: { format: groupFormat, date: '$date' } },
          total: { $sum: '$amount' }
        }
      },
      { $sort: { _id: 1 } }
    ]),
    Growth.find({ year }),
    Stock.find().sort({ createdAt: 1 })
  ]);

  // Growth ko Jan -> Dec order mein lagao
  const growthData = growthDocs
    .sort((a, b) => MONTHS.indexOf(a.month) - MONTHS.indexOf(b.month))
    .map((g) => ({
      month: g.month,
      investment: g.investment,
      loss: g.loss,
      profit: g.profit,
      maintenance: g.maintenance
    }));

  const growthTotal = growthData.reduce(
    (sum, g) => sum + g.investment + g.loss + g.profit + g.maintenance,
    0
  );

  const orderTotal = orderBuckets.reduce((sum, b) => sum + b.total, 0);

  res.json({
    earning: { total: earningTotal },
    order: {
      range: orderRange,
      total: orderTotal,
      series: orderBuckets.map((b) => ({ label: b._id, v: b.total }))
    },
    income: { total: incomeTotal },
    growth: { year, total: growthTotal, data: growthData },
    stocks: {
      featured: stocks.find((s) => s.featured) || null,
      list: stocks
    }
  });
});
