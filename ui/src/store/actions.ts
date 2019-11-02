import api from '@/api/mockAsync';
import { ActionTree } from 'vuex';
import { State } from '@/store/index.ts';
import { Entry } from '@/schemas/Entry/typedefs.ts';

const actions: ActionTree<State, State> = {
  /* Users */
  // Set the specified user as the current user
  USER_LOGIN: ({ commit }, { user }) => {
    commit('USER_SET', { user });
    return Promise.resolve();
  },

  /* Entries */
  // Add an entry to the collection
  ENTRY_ADD: ({ commit, dispatch, state }, { entry }) => (
    api.addEntry(Object.assign(entry, {
      owner: state.currentUser,
      creator: state.currentUser,
    }))
      .then((storedEntry) => {
        commit('ENTRY_STORE', { entry: storedEntry });
        return dispatch('LIST_FETCH', { type: 'feed' });
      })
  ),

  // Set the entry's done status
  ENTRY_SET_DONE: ({ commit, dispatch }, { id, done }) => (
    api.updateEntry({ id, done })
      .then((entry) => {
        commit('ENTRY_STORE', { entry });
        return dispatch('LIST_FETCH', { type: 'feed' });
      })
  ),

  // Fetch the entries in the active list
  ENTRY_FETCH_ACTIVE: ({ commit, state }) => (
    api.fetchEntries(state.lists[state.activeList])
      .then((entries) => entries.forEach((entry: Entry) => commit('ENTRY_STORE', { entry })))
  ),

  /* Lists */
  // Sets the active list, returning a resolved promise with the new active list type
  LIST_SET_ACTIVE: ({ commit }, { type }) => {
    commit('LIST_SET_ACTIVE', { type });
    return Promise.resolve(type);
  },

  // Fetch the ID's of the entries on the requested list
  LIST_FETCH: ({ commit }, { type, user }) => {
    const commitList = (entryIds: string[]) => commit('LIST_UPDATE_ENTRIES', { type, entryIds });

    switch (type) {
      case 'USER':
        return api.fetchEntryIdsByUser(user).then(commitList);

      case 'FEED':
        return api.fetchUnreadEntryIds().then(commitList);

      default:
        return Promise.resolve();
    }
  },
};

export default actions;
