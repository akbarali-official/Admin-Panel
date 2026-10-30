import mongoose from 'mongoose';

// TotalIncomeCards (dark + light dono cards) ka data
const incomeSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: [true, 'Amount zaroori hai'], min: 0 },
    source: { type: String, trim: true, default: 'General' },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model('Income', incomeSchema);
