import ContactMessage from '../models/ContactMessage.js';
import asyncHandler from '../utils/asyncHandler.js';
import createCrud from '../utils/createCrud.js';

const crud = createCrud(ContactMessage, 'Message');
export const { getAll, getOne, remove } = crud;

// POST /api/contact-messages  (public: koi bhi form bhej sakta hai)
// Sirf 4 fields lete hain, baaki sab ignore
export const createMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;
  const saved = await ContactMessage.create({ name, email, subject, message });
  res.status(201).json({ message: 'Aap ka message mil gaya. Shukriya!', id: saved._id });
});
