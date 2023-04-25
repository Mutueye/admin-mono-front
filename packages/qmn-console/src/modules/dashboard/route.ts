import { RouteRecordData } from '@/router/types';
import Dashboard from './views/Dashboard.vue';

const routeData: RouteRecordData = {
  admin: [
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: {
        title: 'QMN-dashboard',
        menuConfig: {
          order: 0,
          iconClass: 'i-mdi-database-cog-outline',
        },
      },
      component: Dashboard,
    },
  ],
};

export default routeData;
