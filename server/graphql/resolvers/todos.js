const Todo = require('../../models/todo');

module.exports = {
  todos: async () => {
    try {
      const todos = await Todo.find();
      return todos;
    } catch (err) {
      throw err;
    }
  },
  addTodo: async (args, request) => {
    const todo = new Todo({
      text: args.todoInput.text,
      completed: false,
    });

    try {
      const result = todo.save();
      return result;
    } catch (err) {
      throw err;
    }
  },
};
