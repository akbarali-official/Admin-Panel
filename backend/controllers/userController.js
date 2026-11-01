import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';

// GET /api/users   (admin)
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json(users);
});

// POST /api/users   (admin)
export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Name, email aur password teeno zaroori hain');
  }

  const exists = await User.findOne({ email });
  if (exists) {
    res.status(400);
    throw new Error('Is email se user pehle se maujood hai');
  }

  const user = await User.create({ name, email, password, role: role === 'admin' ? 'admin' : 'user' });
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt
  });
});

// PUT /api/users/:id   (admin) - password khali ho to purana hi rahega
export const updateUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const update = {};

  if (name) update.name = name;
  if (email) update.email = email;
  if (role) {
    // Admin apne aap ko admin se hata nahi sakta (warna koi admin hi na bache)
    if (String(req.user._id) === req.params.id && role !== 'admin') {
      res.status(400);
      throw new Error('Aap apna admin role khud nahi hata sakte');
    }
    update.role = role;
  }
  if (password) {
    if (password.length < 6) {
      res.status(400);
      throw new Error('Password kam az kam 6 characters ka ho');
    }
    update.password = await bcrypt.hash(password, 10);
  }

  const user = await User.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
  if (!user) {
    res.status(404);
    throw new Error('User nahi mila');
  }
  res.json(user);
});

// DELETE /api/users/:id   (admin)
export const deleteUser = asyncHandler(async (req, res) => {
  if (String(req.user._id) === req.params.id) {
    res.status(400);
    throw new Error('Aap apne aap ko delete nahi kar sakte');
  }
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User nahi mila');
  }
  res.json({ message: 'User delete ho gaya', id: req.params.id });
});
