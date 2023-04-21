import { RouteRecordData } from '@/router/types';
import Home from './views/Home.vue';

const routeData: RouteRecordData = {
  wrapper: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        title: '应用控制台',
        menuConfig: {
          order: 0,
          iconClass: 'i-mdi-apps',
        },
      },
    },
  ],
};

export default routeData;
