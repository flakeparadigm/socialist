import { lists, entries, users, StoredList } from '../mockData';
import { ListQuery, ListsQuery, ListInput } from './types';
import { EntriesQueryBasic } from '../Entry/types';

export default {
  List: {
    owner: ({ ownerId }: StoredList) => users.find((user) => user.id === ownerId),
    entries: ({ id }: StoredList, { complete }: EntriesQueryBasic) => entries.filter((entry) => (
      entry.listId === id
      && entry.complete === complete
    )),
  },

  Query: {
    list(obj: any, { id }: ListQuery) {
      return lists[parseInt(id)];
    },

    lists(obj: any, { ownerId }: ListsQuery) {
      return lists.filter((list) => list.ownerId === ownerId);
    },
  },

  Mutation: {
    createList(obj: any, { list }: { list: ListInput }) {
      const newList: StoredList = {
        ...list,
        id: lists.length
      };

      lists.push(newList);
      return newList;
    },

    deleteList(obj: any, { id }: ListQuery) {
      const idInt = parseInt(id);

      if (!lists[idInt]) return false;

      return delete lists[idInt];
    },
  },
};
