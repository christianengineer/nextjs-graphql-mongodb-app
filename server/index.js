const mongoose = require('mongoose');
const Todo = require('./models/todo')

mongoose.connect(
  `mongodb+srv://chris.ipanaque@gmail.com:THf8.MChcw-5sdX@graphql-cluster-omvn0.mongodb.net/test?retryWrites=true&w=majority`,
  {useMongoClient: true},
);

