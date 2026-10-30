import mongoose from 'mongoose';

// PopularStocks card ka data
const stockSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Stock ka naam zaroori hai'], trim: true },
    amount: { type: Number, required: [true, 'Amount zaroori hai'], min: 0 },
    changePercent: { type: Number, default: 0, min: 0 },
    isProfit: { type: Boolean, default: true }, // true = profit, false = loss
    featured: { type: Boolean, default: false }, // upar wala bada area-chart wala stock
    history: { type: [Number], default: [] } // area chart ke points
  },
  { timestamps: true }
);

export default mongoose.model('Stock', stockSchema);
