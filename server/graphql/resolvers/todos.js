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
      text: args.text,
      completed: false,
    });

    try {
      const result = await todo.save();
      return result;
    } catch (err) {
      throw err;
    }
  },
  completeTodo: async (args, request) => {
    try {
      const result = await Todo.findOneAndUpdate(
        {_id: args.todoId},
        {
          $set: {
            completed: args.completed,
          },
        },
        {
          new: true,
        },
      );

      return result;
    } catch (error) {
      console.log(error);
    }
  },
};
