import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import Lists from '@/views/Lists.vue';
import ViewList from '@/views/ViewList.vue';
import Feed from '@/views/Feed.vue';
import User from '@/views/User.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
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
        listId: route.params.listId
      }),
    },

    // {
    //   path: '/feed',
    //   name: 'Feed',
    //   component: Feed,
    // },
    // {
    //   path: '/from/:viewUser',
    //   name: 'FromUser',
    //   component: User,
    //   props: (route) => ({
    //     viewUser: route.params.viewUser,
    //     direction: 'from',
    //   }),
    // },
    // {
    //   path: '/to/:viewUser',
    //   name: 'ToUser',
    //   component: User,
    //   props: (route) => ({
    //     viewUser: route.params.viewUser,
    //     direction: 'to',
    //   }),
    // },
  ],
});
