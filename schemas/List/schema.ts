import gql from 'graphql-tag'
import { DocumentNode } from 'graphql';

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
