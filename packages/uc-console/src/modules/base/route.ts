import { RouteRecordData } from '@/router/types';
import Applets from './views/Applets.vue';
import DataSyncMng from './views/DataSyncMng.vue';

const routeData: RouteRecordData = {
  admin: [
    {
      path: '/base',
      name: 'base',
      meta: {
        title: '基础信息配置',
        menuConfig: {
          order: 0,
          iconClass: 'i-mdi-database-cog-outline',
        },
      },
      redirect: '/base/applets',
      children: [
        {
          path: 'applets',
          name: 'applets',
          meta: {
            title: '应用管理',
            menuConfig: {
              order: 0,
            },
          },
          component: Applets,
        },
        {
          path: 'events',
          name: 'events',
          meta: {
            title: '数据同步管理',
            menuConfig: {
              order: 1,
            },
          },
          component: DataSyncMng,
        },
      ],
    },
  ],
};

export default routeData;
