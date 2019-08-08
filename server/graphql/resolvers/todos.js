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
};
