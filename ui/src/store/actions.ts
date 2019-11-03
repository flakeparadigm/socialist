import { ActionTree } from 'vuex';
import { State } from '@/store/index.ts';

const actions: ActionTree<State, State> = {
  /* Users */
  // Set the specified user as the current user
  USER_LOGIN: ({ commit }, { user }) => {
    commit('USER_SET', { user });
    return Promise.resolve();
  },
};

export default actions;
