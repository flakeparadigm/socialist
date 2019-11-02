import gql from 'graphql-tag'
import { Entry } from '../Entry/typedefs';
import { User } from '../User/typedefs';
import { DocumentNode } from 'graphql';

export interface List {
  id: string
  owner: User
  name: string
  entries: Entry[]
}

export interface ListInput {
  ownerId: string,
  name: string
}

export interface ListQuery {
  id: number
}

export interface ListsQuery {
  ownerId: string
}

export const schema: DocumentNode = gql`
  type List {
    id: ID!
    owner: User!
    name: String!
    entries: [Entry]
  }

  input ListInput {
    ownerId: ID!
    name: String!
  }

  extend type Query {
    list(id: ID!): List
    lists(
      ownerId: ID,
    ): [List]
  }

  extend type Mutation {
    createList(list: ListInput): List
    deleteList(id: ID!): Boolean
  }
`;
export default schema;
