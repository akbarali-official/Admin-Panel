import mongoose from 'mongoose';

// TotalOrderCard (Month / Year toggle + sparkline) ka data
const orderSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: [true, 'Amount zaroori hai'], min: 0 },
    status: {
      type: String,
      enum: ['pending', 'completed', 'cancelled'],
      default: 'completed'
    },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
