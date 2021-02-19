import { gql } from '@apollo/client';

export const typeDefs = gql`
  type Todo {
    _id: ID!
    task: String!
  }

  type Query {
    todos: [Todo]!
  }
`;
