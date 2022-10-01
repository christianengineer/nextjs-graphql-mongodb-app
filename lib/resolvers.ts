import dbConnect from "./dbConnect";
import Todo from "./models/Todo";

const resolvers = {
  Query: {
    async todos(_parent, _args, _context, _info) {
      await dbConnect();

      const data = await Todo.find();

      const todos = data.map((doc) => {
        const todo = doc.toObject();
        // todo._id = todo._id.toString();
        // todo.created = todo.created.toString();
        // todo.updated = todo.updated.toString();
        return todo;
      });

      return todos;
    },
  },
  Mutation: {
    async addTodo(_parent, _args, _context, _info) {
      await dbConnect();
      const todo = await Todo.create(_args);
      return todo;
    },
  },
};

export default resolvers;
