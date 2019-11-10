import { Entry } from '../Entry/types';
import { User } from '../User/types';

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
  id: string
}

export interface ListsQuery {
  ownerId: string
}
