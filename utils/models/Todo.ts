import mongoose from "mongoose";

interface Todo {
  task: string;
  isCompleted: boolean;
  created: Date;
  updated: Date;
}

const TodoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  isCompleted: { type: Boolean, required: true },
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
});

export default (mongoose.models.Todo as mongoose.Model<Todo>) ||
  mongoose.model("Todo", TodoSchema);
