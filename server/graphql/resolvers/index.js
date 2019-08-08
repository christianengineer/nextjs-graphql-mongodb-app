const todosResolver = require('./todos');

const rootResolver = {
  ...todosResolver,
};

module.exports = rootResolver;
