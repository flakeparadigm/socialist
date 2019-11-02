import { GetterTree } from 'vuex';
import { State } from '@/store/index.ts';

const getters: GetterTree<State, State> = {
  /* Users */
  // Determine whether a user is logged in or not
  loggedIn(state) {
    return !!state.currentUser;
  },

  // Get the current user
  currentUser(state) {
    return state.currentUser;
  },

  /* Entries */
  // ids of the entries that should be currently displayed
  activeIds(state) {
    return state.lists[state.activeList];
  },

  // entries that should be currently displayed.
  // this Array may not be fully fetched.
  activeEntries(state, getters) {
    return getters.activeIds.map((id: string) => state.entries[id]);
  },
};

export default getters;
