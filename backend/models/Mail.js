import mongoose from 'mongoose';

// Dashboard ke andar ki mail (user se user)
const mailSchema = new mongoose.Schema(
  {
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: String, trim: true, default: '(no subject)' },
    body: { type: String, required: [true, 'Mail ka body zaroori hai'] },
    read: { type: Boolean, default: false },
    deletedByFrom: { type: Boolean, default: false },
    deletedByTo: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model('Mail', mailSchema);
