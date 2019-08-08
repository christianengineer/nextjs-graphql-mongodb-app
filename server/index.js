const mongoose = require('mongoose');
const Todo = require('./models/todo');

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${
    process.env.MONGO_PASSWORD
  }@graphql-cluster-omvn0.mongodb.net/${
    process.env.MONGO_DB
  }?retryWrites=true&w=majority`,
  {useNewUrlParser: true},
);

const addTodo = async () => {
  const todo = {
    text: 'Do laundry',
    completed: false,
  };

  const response = await Todo.create(todo);
  console.log(response);
};

// const updateTodo = async () => {
//   const response = await Todo.update(
//     {_id: '5d4c94dd29b83d6aca775be7'},
//     {
//       $set: {
//         text: 'LAWN LAWN',
//       },
//     },
//   );
//   console.log(response);
// };

addTodo();
// updateTodo();
