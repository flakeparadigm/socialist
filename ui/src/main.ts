// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from '@/App.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import filters from '@/utils/filters.ts';
import router from '@/router/index.ts';
import store from '@/store/index.ts';
import getApolloProvider from '@/utils/apolloProvider.ts';

Vue.config.productionTip = false;

// Global progress bar
const bar = new Vue(ProgressBar).$mount();
Vue.prototype.$bar = bar;
document.body.appendChild(bar.$el);

// Import template filters
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

// Get the Apollo provider
const apolloProvider = getApolloProvider(Vue);

/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  provide: apolloProvider.provide(),
  template: '<App/>',
  components: { App },
});
