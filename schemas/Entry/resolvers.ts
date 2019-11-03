import { isUndefined } from 'lodash';
import { entries, lists, users, StoredEntry } from '../mockData';
import { EntryQuery, EntriesQuery, EntryInput, ToggleEntryMutation } from './types';

export default {
  Entry: {
    list: ({ listId }: StoredEntry) => lists[listId],
    creator: ({ creatorId }: StoredEntry) => users.find((user) => user.id === creatorId),
  },

  Query: {
    entry(obj: any, { id }: EntryQuery): StoredEntry {
      return entries[id];
    },

    entries(obj: any, {
      list, creator, done, search,
    }: EntriesQuery): StoredEntry[] {
      let filtered = entries;

      if (!isUndefined(list)) {
        filtered = filtered.filter((entry) => entry.listId === list);
      }

      if (!isUndefined(creator)) {
        filtered = filtered.filter((entry) => entry.creatorId === creator);
      }

      if (!isUndefined(done)) {
        filtered = filtered.filter((entry) => entry.done === done);
      }

      if (!isUndefined(search)) {
        filtered = filtered.filter((entry) => (
          entry.title.indexOf(search) !== -1
          || (entry.url && entry.url.indexOf(search) !== -1)
          || (entry.text && entry.text.indexOf(search) !== -1)
        ));
      }

      return filtered;
    },
  },

  Mutation: {
    createEntry(obj: any, { entry }: { entry: EntryInput }) {
      const newEntry: StoredEntry = {
        ...entry,
        id: entries.length,
        done: false
      };

      entries.push(newEntry);
      return newEntry;
    },

    toggleEntry(obj: any, { id, done }: ToggleEntryMutation) {
      const entry = entries[id];

      if (!entry) throw new Error(`Entry ${id} does not exist.`);

      entry.done = done;
      return entry;
    },

    deleteEntry(obj: any, { id }: EntryQuery) {
      if (!entries[id]) return false;

      return delete entries[id];
    },
  },
};
