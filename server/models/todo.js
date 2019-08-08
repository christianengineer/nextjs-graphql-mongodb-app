const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  text: {type: String},
  completed: {type: Boolean},
});

module.exports = mongoose.model('Todo', todoSchema);
