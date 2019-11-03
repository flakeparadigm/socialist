import { List } from '../List/types';
import { User } from '../User/types';

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
