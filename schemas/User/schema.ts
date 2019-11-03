import gql from 'graphql-tag'
import { DocumentNode } from 'graphql';

export const schema: DocumentNode = gql`
  type User {
    id: ID!
    entries: [Entry]
    lists: [List]
  }

  input UserInput {
    id: ID!
  }

  extend type Query {
    user(id: ID!): User
    users: [User]
  }

  extend type Mutation {
    createUser(user: UserInput): User
    deleteUser(id: ID!): Boolean
  }
`;
export default schema;
