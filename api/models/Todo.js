import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  isCompleted: { type: Boolean, required: true },
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
});

export default mongoose.model('Todo', TodoSchema);
