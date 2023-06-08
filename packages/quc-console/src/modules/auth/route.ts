import { RouteRecordData } from '@/router/types';

const Login = () => import('./views/Login.vue');

const routeData: RouteRecordData = {
  route: [
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
