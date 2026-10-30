import mongoose from 'mongoose';

// EarningCard (Total Earning) ka data
const earningSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: [true, 'Amount zaroori hai'], min: 0 },
    note: { type: String, trim: true, default: '' },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model('Earning', earningSchema);
