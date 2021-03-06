import gql from 'graphql-tag'
import { DocumentNode } from 'graphql';

export const schema: DocumentNode = gql`
  type Entry {
    id: ID!
    list: List!
    creator: User!
    title: String!
    url: String
    text: String
    complete: Boolean
  }

  input EntryInput {
    listId: ID!
    creatorId: ID
    title: String!
    url: String
    text: String
  }

  extend type Query {
    entry(id: ID!): Entry
    entries(
      list: ID,
      creator: ID,
      complete: Boolean,
      search: String
    ): [Entry]
  }

  extend type Mutation {
    createEntry(entry: EntryInput): Entry
    toggleEntry(id: ID!, complete: Boolean!): Entry
    deleteEntry(id: ID!): Boolean
  }
`;
export default schema;
