const typeDefs = /* GraphQL */ `
  type Todo {
    _id: ID!
    task: String!
    isCompleted: Boolean!
  }

  type Query {
    todos: [Todo]!
  }

  type Mutation {
    addTodo(task: String!, isCompleted: Boolean!): Todo!
  }
`;

export default typeDefs;
