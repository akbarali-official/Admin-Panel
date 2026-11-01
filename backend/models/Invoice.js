import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: { type: String, unique: true, trim: true },
    customer: { type: String, required: [true, 'Customer ka naam zaroori hai'], trim: true },
    amount: { type: Number, required: [true, 'Amount zaroori hai'], min: 0 },
    status: { type: String, enum: ['pending', 'paid', 'overdue'], default: 'pending' },
    dueDate: { type: Date },
    notes: { type: String, trim: true, default: '' }
  },
  { timestamps: true }
);

// Number na diya ho to khud banao: INV-123456
invoiceSchema.pre('validate', function () {
  if (!this.invoiceNumber) {
    this.invoiceNumber = `INV-${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 90 + 10)}`;
  }
});

export default mongoose.model('Invoice', invoiceSchema);
