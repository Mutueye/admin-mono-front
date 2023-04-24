import { RouteRecordData } from '@/router/types';
import Authorize from './views/Authorize.vue';
import Login from './views/Login.vue';

const routeData: RouteRecordData = {
  route: [
    {
      path: '/authorize',
      name: 'authorize',
      component: Authorize,
      meta: {
        title: '登录授权',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: '登录',
      },
    },
  ],
};

export default routeData;
