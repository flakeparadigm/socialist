import { List } from '../List/types';
import { User } from '../User/types';

export interface Entry {
  id: string
  list: List
  creator: User
  title: string
  url?: string
  text?: string
  complete: boolean
}

export interface EntryInput {
  listId: string
  creatorId: string
  title: string
  url?: string
  text?: string
}

export interface EntryQuery {
  id: string
}

export interface EntriesQueryBasic {
  complete?: boolean
}

export interface EntriesQuery extends EntriesQueryBasic {
  list?: string
  creator?: string
  search?: string
}

export interface ToggleEntryMutation {
  id: string
  complete: boolean
}
