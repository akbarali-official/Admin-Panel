import mongoose from 'mongoose';

// Group chat ke messages
const chatMessageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    senderName: { type: String, required: true },
    text: { type: String, required: [true, 'Message khali nahi ho sakta'], trim: true, maxlength: 1000 }
  },
  { timestamps: true }
);

export default mongoose.model('ChatMessage', chatMessageSchema);
