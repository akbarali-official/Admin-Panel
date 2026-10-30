import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';

// Sirf logged-in user guzar sakta hai (header: Authorization: Bearer <token>)
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, token nahi mila');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) throw new Error('user nahi mila');
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized, token galat ya expire ho gaya');
  }

  next();
});

// Sirf admin guzar sakta hai (protect ke BAAD lagana)
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') return next();
  res.status(403);
  next(new Error('Sirf admin ye kaam kar sakta hai'));
};
