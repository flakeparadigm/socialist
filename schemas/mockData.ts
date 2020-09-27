export interface StoredEntry {
  id: number
  listId: number
  creatorId: string
  title: string
  url?: string
  text?: string
  complete: boolean
}
export const entries: StoredEntry[] = [
  {
    id: 0,
    listId: 0,
    creatorId: 'flakeparadigm',
    title: 'Check out my website!',
    url: 'https://tyler.nien.house',
    complete: false,
  },
  {
    id: 1,
    listId: 1,
    creatorId: 'flakeparadigm',
    title: 'I love reddit',
    url: 'https://reddit.com',
    text: 'It really is the front page of the internet!',
    complete: false,
  },
  {
    id: 2,
    listId: 0,
    creatorId: 'alice',
    title: 'LMGTFY',
    url: 'http://lmgtfy.com/?q=Hi!',
    complete: false,
  },
  {
    id: 3,
    listId: 1,
    creatorId: 'alice',
    title: 'Some Examples Website',
    url: 'http://example.com',
    complete: false,
  },
  {
    id: 4,
    listId: 2,
    creatorId: 'flakeparadigm',
    title: 'I love reddit',
    url: 'https://reddit.com',
    complete: false,
  },
  {
    id: 5,
    listId: 0,
    creatorId: 'bob',
    title: 'LMGTFY',
    url: 'http://lmgtfy.com/?q=Hi!',
    complete: false,
  },
  {
    id: 6,
    listId: 0,
    creatorId: 'flakeparadigm',
    title: 'LMGTFY',
    url: 'http://lmgtfy.com/?q=Hi!',
    complete: true,
  },
];

export interface StoredList {
  id: number
  name: string
  ownerId: string
}
export const lists: StoredList[] = [
  {
    id: 0,
    name: 'Flakeparadigm',
    ownerId: 'flakeparadigm',
  },
  {
    id: 1,
    name: 'Alice',
    ownerId: 'alice',
  },
  {
    id: 2,
    name: 'Bob',
    ownerId: 'bob',
  },
];

export interface StoredUser {
  id: string
}
export const users: StoredUser[] = [
  {
    id: 'flakeparadigm',
  },
  {
    id: 'alice',
  },
  {
    id: 'bob',
  },
];

export interface StoredFriendship {
  initUserId: string
  confUserId: string
  confirmed: boolean
}
export const friendships: StoredFriendship[] = [
  {
    initUserId: 'flakeparadigm',
    confUserId: 'alice',
    confirmed: true,
  },
];
