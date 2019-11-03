/* eslint no-param-reassign: ["error", { "props": false }] */
import { MutationTree } from 'vuex';
import { State } from '@/store/index.ts';

const mutations: MutationTree<State> = {
  /* Users */
  // Set the specified user as the current user
  USER_SET: (state, { user }: { user: string }) => {
    state.currentUser = user;
  },
};

export default mutations;
