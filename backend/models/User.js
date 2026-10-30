import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name zaroori hai'], trim: true },
    email: {
      type: String,
      required: [true, 'Email zaroori hai'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password zaroori hai'],
      minlength: [6, 'Password kam az kam 6 characters ka ho'],
      select: false // query mein password by default nahi aayega
    },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
  },
  { timestamps: true }
);

// Save se pehle password hash karo (plain password kabhi DB mein nahi jata)
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Login ke waqt password compare karne ke liye
userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
