import mongoose from 'mongoose';

// Blog posts
const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Title zaroori hai'], trim: true },
    content: { type: String, required: [true, 'Content zaroori hai'] },
    author: { type: String, trim: true, default: 'Admin' },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' }
  },
  { timestamps: true }
);

export default mongoose.model('Post', postSchema);
