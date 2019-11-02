import gql from 'graphql-tag'
import { Entry } from '../Entry/typedefs';
import { List } from '../List/typedefs';
import { DocumentNode } from 'graphql';

export interface User {
  id: string
  entries: Entry[]
  lists: List[]
}

export interface UserInput {
  id: string
}

export interface UserQuery {
  id: string
}

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
