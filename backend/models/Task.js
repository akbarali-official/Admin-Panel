import mongoose from 'mongoose';

// Kanban board ke tasks
const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Task ka title zaroori hai'], trim: true },
    description: { type: String, trim: true, default: '' },
    status: { type: String, enum: ['todo', 'inprogress', 'done'], default: 'todo' },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    assignee: { type: String, trim: true, default: '' },
    dueDate: { type: Date }
  },
  { timestamps: true }
);

export default mongoose.model('Task', taskSchema);
