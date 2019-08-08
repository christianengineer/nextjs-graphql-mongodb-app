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

  schema {
    query: RootQuery
  }
`);
