import mongoose from 'mongoose';

// E-commerce page ke products
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Product ka naam zaroori hai'], trim: true },
    category: { type: String, trim: true, default: '' },
    price: { type: Number, required: [true, 'Price zaroori hai'], min: 0 },
    stock: { type: Number, default: 0, min: 0 },
    description: { type: String, trim: true, default: '' }
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
