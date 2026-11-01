import mongoose from 'mongoose';

// Dashboard ka TotalOrderCard + Orders page dono isi se chalte hain
const orderSchema = new mongoose.Schema(
  {
    customer: { type: String, trim: true, default: '' },
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
