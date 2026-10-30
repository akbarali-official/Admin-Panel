import mongoose from 'mongoose';

export const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

// TotalGrowthBarChart ka data: har mahine ki 4 values
const growthSchema = new mongoose.Schema(
  {
    year: { type: Number, required: [true, 'Year zaroori hai'] },
    month: { type: String, enum: MONTHS, required: [true, 'Month zaroori hai'] },
    investment: { type: Number, default: 0, min: 0 },
    loss: { type: Number, default: 0, min: 0 },
    profit: { type: Number, default: 0, min: 0 },
    maintenance: { type: Number, default: 0, min: 0 }
  },
  { timestamps: true }
);

// Ek saal ka ek mahina sirf ek baar
growthSchema.index({ year: 1, month: 1 }, { unique: true });

export default mongoose.model('Growth', growthSchema);
