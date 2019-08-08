const mongoose = require('mongoose');
const Todo = require('./models/todo');

const PORT = process.env.PORT || 4000;

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@graphql-cluster-omvn0.mongodb.net/${
      process.env.MONGO_DB
    }?retryWrites=true&w=majority`,
    {useNewUrlParser: true},
  )
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

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
