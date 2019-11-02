import { lists, entries, users, StoredList } from '../mockData';
import { ListQuery, ListsQuery, ListInput } from './typedefs';

export default {
  List: {
    owner: ({ ownerId }: StoredList) => users.find((user) => user.id === ownerId),
    entries: ({ id }: StoredList) => entries.filter((entry) => entry.listId === id),
  },

  Query: {
    list(obj: any, { id }: ListQuery) {
      return lists[id];
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
      if (!lists[id]) return false;

      return delete lists[id];
    },
  },
};
