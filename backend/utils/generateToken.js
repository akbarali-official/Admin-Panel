import jwt from 'jsonwebtoken';

// User ki id se JWT token banata hai (login ke baad frontend ko milta hai)
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });

export default generateToken;
