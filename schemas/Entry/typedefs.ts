import gql from 'graphql-tag'
import { List } from '../List/typedefs';
import { User } from '../User/typedefs';
import { DocumentNode } from 'graphql';

export interface Entry {
  id: string
  list: List
  creator: User
  title: string
  url?: string
  text?: string
  done: boolean
}

export interface EntryInput {
  listId: number
  creatorId: string
  title: string
  url?: string
  text?: string
}

export interface EntryQuery {
  id: number
}

export interface EntriesQuery {
  list?: number
  creator?: string
  done?: boolean
  search?: string
}

export interface ToggleEntryMutation {
  id: number
  done: boolean
}

export const schema: DocumentNode = gql`
  type Entry {
    id: ID!
    list: List!
    creator: User!
    title: String!
    url: String
    text: String
    done: Boolean
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
      done: Boolean,
      search: String
    ): [Entry]
  }

  extend type Mutation {
    createEntry(entry: EntryInput): Entry
    toggleEntry(id: ID!, done: Boolean!): Entry
    deleteEntry(id: ID!): Boolean
  }
`;
export default schema;
