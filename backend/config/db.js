import mongoose from 'mongoose';

let cached = global._mongoose;
if (!cached) cached = global._mongoose = { conn: null };

const connectDB = async () => {
  if (cached.conn) return cached.conn;
  try {
    cached.conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log(`MongoDB connected: ${cached.conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
  return cached.conn;
};

export default connectDB;