import mongoose from 'mongoose';

// Customers / CRM page ka data
const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name zaroori hai'], trim: true },
    email: { type: String, trim: true, lowercase: true, default: '' },
    phone: { type: String, trim: true, default: '' },
    company: { type: String, trim: true, default: '' },
    status: { type: String, enum: ['lead', 'active', 'inactive'], default: 'lead' }
  },
  { timestamps: true }
);

export default mongoose.model('Customer', customerSchema);
