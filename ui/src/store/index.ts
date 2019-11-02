import Vue from 'vue';
import Vuex from 'vuex';
import actions from '@/store/actions.ts';
import getters from '@/store/getters.ts';
import mutations from '@/store/mutations.ts';
import { Entry } from '@/schemas/Entry/typedefs.ts';
import { User } from '@/schemas/User/typedefs.ts';

Vue.use(Vuex);

export type ListTypes = 'FEED' | 'USER';

export interface State {
  readonly users: { [id: string]: User };
  currentUser: User,
  entries: { [id: string]: Entry },
  activeList: ListTypes,
  lists: { [ListType in ListTypes]: string[] },
}

const state: State = {
  users: {},
  currentUser: null,
  entries: {},
  activeList: 'FEED',
  lists: {
    FEED: [],
    USER: [],
  },
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
});
