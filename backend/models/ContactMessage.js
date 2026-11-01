import mongoose from 'mongoose';

// Contact Us form se aane wale messages
const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name zaroori hai'], trim: true },
    email: { type: String, required: [true, 'Email zaroori hai'], trim: true, lowercase: true },
    subject: { type: String, trim: true, default: '' },
    message: { type: String, required: [true, 'Message zaroori hai'], trim: true }
  },
  { timestamps: true }
);

export default mongoose.model('ContactMessage', contactMessageSchema);
