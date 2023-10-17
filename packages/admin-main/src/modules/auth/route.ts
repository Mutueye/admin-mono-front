import { RouteRecordData } from '@qst-admin/layout';
import { Login } from '@qst-admin/auth';

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
