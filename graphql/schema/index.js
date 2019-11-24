const graphql = require('graphql');

module.exports = graphql.buildSchema(`
  type Todo {
    _id: ID!
    text: String!
    completed: Boolean!
    created: String!
    updated: String!
  }

  type RootQuery {
    todos: [Todo!]!
  }

  type RootMutation {
    addTodo(text: String!): Todo
    completeTodo(todoId: ID!, completed: Boolean): Todo
    deleteTodo(todoId: ID!): String
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
