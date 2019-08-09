const graphql = require('graphql');

module.exports = graphql.buildSchema(`
  type Todo {
    _id: ID!
    text: String!
    completed: Boolean!
  }

  type RootQuery {
    todos: [Todo!]!
  }

  type SuccessfulDeletion {
    acknowledged: Boolean
    deletedCount: Int
  }

  type RootMutation {
    addTodo(text: String): Todo
    completeTodo(todoId: ID!, completed: Boolean): Todo
    deleteTodo(todoId: ID!): SuccessfulDeletion
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
