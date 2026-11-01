import Mail from '../models/Mail.js';
import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';

const isFrom = (mail, user) => String(mail.from._id || mail.from) === String(user._id);
const isTo = (mail, user) => String(mail.to._id || mail.to) === String(user._id);

// GET /api/mails/recipients  -> mail bhejne ke liye baaki users ki list
export const getRecipients = asyncHandler(async (req, res) => {
  const users = await User.find({ _id: { $ne: req.user._id } }).select('name email');
  res.json(users);
});

// GET /api/mails?box=inbox|sent
export const getMails = asyncHandler(async (req, res) => {
  const sent = req.query.box === 'sent';
  const filter = sent
    ? { from: req.user._id, deletedByFrom: false }
    : { to: req.user._id, deletedByTo: false };

  const mails = await Mail.find(filter)
    .sort({ createdAt: -1 })
    .populate('from', 'name email')
    .populate('to', 'name email');
  res.json(mails);
});

// GET /api/mails/:id  -> kholna (inbox wali mail "read" ho jati hai)
export const getMail = asyncHandler(async (req, res) => {
  const mail = await Mail.findById(req.params.id).populate('from', 'name email').populate('to', 'name email');

  const visible =
    mail && ((isFrom(mail, req.user) && !mail.deletedByFrom) || (isTo(mail, req.user) && !mail.deletedByTo));
  if (!visible) {
    res.status(404);
    throw new Error('Mail nahi mili');
  }

  if (isTo(mail, req.user) && !mail.read) {
    mail.read = true;
    await mail.save();
  }
  res.json(mail);
});

// POST /api/mails  { toEmail, subject, body }
export const sendMail = asyncHandler(async (req, res) => {
  const { toEmail, subject, body } = req.body;

  if (!toEmail || !body || !String(body).trim()) {
    res.status(400);
    throw new Error('Receiver ki email aur mail ka body zaroori hain');
  }

  const recipient = await User.findOne({ email: String(toEmail).toLowerCase().trim() });
  if (!recipient) {
    res.status(404);
    throw new Error('Is email ka koi user nahi mila');
  }

  const mail = await Mail.create({
    from: req.user._id,
    to: recipient._id,
    subject: subject && String(subject).trim() ? String(subject).trim() : '(no subject)',
    body: String(body).trim()
  });
  res.status(201).json(mail);
});

// DELETE /api/mails/:id  -> sirf apni taraf se hatata hai
export const deleteMail = asyncHandler(async (req, res) => {
  const mail = await Mail.findById(req.params.id);
  if (!mail || (!isFrom(mail, req.user) && !isTo(mail, req.user))) {
    res.status(404);
    throw new Error('Mail nahi mili');
  }

  if (isFrom(mail, req.user)) mail.deletedByFrom = true;
  if (isTo(mail, req.user)) mail.deletedByTo = true;

  if (mail.deletedByFrom && mail.deletedByTo) {
    await mail.deleteOne();
  } else {
    await mail.save();
  }
  res.json({ message: 'Mail delete ho gayi', id: req.params.id });
});
