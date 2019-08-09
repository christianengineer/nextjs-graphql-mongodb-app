const graphql = require('graphql');

module.exports = graphql.buildSchema(`
  type Todo {
    _id: ID!
    text: String!
    completed: Boolean!
  }

  input TodoInput {
    text: String!
    completed: Boolean
  }

  type RootQuery {
    todos: [Todo!]!
  }

  type RootMutation {
    addTodo(todoInput: TodoInput): Todo
    completeTodo(todoId: ID!, completed: Boolean): Todo
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
