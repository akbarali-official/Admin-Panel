import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import generateToken from '../utils/generateToken.js';

const sendUser = (res, user, statusCode = 200) =>
  res.status(statusCode).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id)
  });

// POST /api/auth/register
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Name, email aur password teeno zaroori hain');
  }

  const exists = await User.findOne({ email });
  if (exists) {
    res.status(400);
    throw new Error('Is email se user pehle se maujood hai');
  }

  const user = await User.create({ name, email, password });
  sendUser(res, user, 201);
});

// POST /api/auth/login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Email aur password zaroori hain');
  }

  // password select:false hai, isliye yahan explicitly mangwaya
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Email ya password galat hai');
  }

  sendUser(res, user);
});

// GET /api/auth/me   (protected)
export const getMe = asyncHandler(async (req, res) => {
  res.json(req.user);
});
