import Vue from 'vue';
import Vuex from 'vuex';
import actions from '@/store/actions.ts';
import getters from '@/store/getters.ts';
import mutations from '@/store/mutations.ts';

Vue.use(Vuex);

export interface State {
  currentUser: string,
}

const state: State = {
  currentUser: null,
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
});
