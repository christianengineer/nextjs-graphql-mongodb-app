const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  text: {type: String, required: true},
  completed: {type: Boolean, required: true},
  date: {type: Number, required: true}
});

module.exports = mongoose.model('Todo', todoSchema);
