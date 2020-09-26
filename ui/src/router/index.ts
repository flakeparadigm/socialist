import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.ts';
import Lists from '@/views/Lists.vue';
import Login from '@/views/Login.vue';
import ViewList from '@/views/ViewList.vue';
import store from '@/store/index.ts';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        public: true,
      },
    },
    {
      path: '/lists',
      name: 'Lists',
      component: Lists,
    },
    {
      path: '/lists/:listId',
      name: 'ViewList',
      component: ViewList,
      props: (route) => ({
        listId: route.params.listId,
      }),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta.public)) {
    next();
  } else if (store.getters.loggedIn) {
    next();
  } else {
    next({
      name: 'Login',
      query: { redirect: to.fullPath },
    });
  }
});

export default router;
