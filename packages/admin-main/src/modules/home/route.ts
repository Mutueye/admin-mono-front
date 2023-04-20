import { RouteRecordData } from '@/router/types';
import Home from './views/Home.vue';

const routeData: RouteRecordData = {
  wrapper: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        title: '首页',
        menuConfig: {
          order: 1,
          iconClass: 'i-mdi-collage',
        },
      },
    },
  ],
};

export default routeData;
