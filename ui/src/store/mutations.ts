/* eslint no-param-reassign: ["error", { "props": false }] */
import Vue from 'vue';
import { MutationTree } from 'vuex';
import { State, ListTypes } from '@/store/index.ts';
import { User } from '@/schemas/User/typedefs.ts';
import { Entry } from '@/schemas/Entry/typedefs.ts';

const mutations: MutationTree<State> = {
  /* Users */
  // Set the specified user as the current user
  USER_SET: (state, { user }: { user: User }) => {
    state.currentUser = user;
  },

  /* Entries */
  // Add an entry to the collection
  ENTRY_STORE: (state, { entry }: { entry: Entry }) => {
    Vue.set(state.entries, entry.id, entry);
  },

  /* Lists */
  LIST_SET_ACTIVE: (state, { type }: { type: ListTypes }) => {
    state.activeList = type;
  },

  LIST_UPDATE_ENTRIES: (state, { type, entryIds }: { type: ListTypes, entryIds: string }) => {
    Vue.set(state.lists, type, entryIds);
  },
};

export default mutations;
