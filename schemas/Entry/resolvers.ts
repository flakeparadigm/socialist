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
      return entries[parseInt(id)];
    },

    entries(obj: any, {
      list, creator, complete, search,
    }: EntriesQuery): StoredEntry[] {
      let filtered = entries;

      if (!isUndefined(list)) {
        filtered = filtered.filter((entry) => entry.listId === parseInt(list));
      }

      if (!isUndefined(creator)) {
        filtered = filtered.filter((entry) => entry.creatorId === creator);
      }

      if (!isUndefined(complete)) {
        filtered = filtered.filter((entry) => entry.complete === complete);
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
        listId: parseInt(entry.listId),
        complete: false,
      };

      entries.push(newEntry);

      return newEntry;
    },

    toggleEntry(obj: any, { id, complete }: ToggleEntryMutation) {
      const entry = entries[parseInt(id)];

      if (!entry) throw new Error(`Entry ${id} does not exist.`);

      entry.complete = complete;
      return entry;
    },

    deleteEntry(obj: any, { id }: EntryQuery) {
      const idInt = parseInt(id);

      if (!entries[idInt]) return false;

      return delete entries[idInt];
    },
  },
};
