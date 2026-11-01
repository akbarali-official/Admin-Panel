import mongoose from 'mongoose';

// Calendar ke events
const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Event ka title zaroori hai'], trim: true },
    description: { type: String, trim: true, default: '' },
    start: { type: Date, required: [true, 'Start time zaroori hai'] },
    end: { type: Date },
    color: {
      type: String,
      enum: ['primary', 'secondary', 'success', 'warning', 'error'],
      default: 'primary'
    }
  },
  { timestamps: true }
);

export default mongoose.model('Event', eventSchema);
