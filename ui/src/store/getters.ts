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
};

export default getters;
