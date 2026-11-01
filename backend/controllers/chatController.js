import ChatMessage from '../models/ChatMessage.js';
import asyncHandler from '../utils/asyncHandler.js';

// GET /api/chat  -> aakhri 100 messages (purane se naye)
export const getMessages = asyncHandler(async (req, res) => {
  const messages = await ChatMessage.find().sort({ createdAt: -1 }).limit(100);
  res.json(messages.reverse());
});

// POST /api/chat  { text }
export const sendMessage = asyncHandler(async (req, res) => {
  const text = (req.body.text || '').trim();
  if (!text) {
    res.status(400);
    throw new Error('Message khali nahi ho sakta');
  }
  if (text.length > 1000) {
    res.status(400);
    throw new Error('Message 1000 characters se chhota ho');
  }

  const message = await ChatMessage.create({
    sender: req.user._id,
    senderName: req.user.name,
    text
  });
  res.status(201).json(message);
});
