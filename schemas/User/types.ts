import { Entry } from '../Entry/types';
import { List } from '../List/types';

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
