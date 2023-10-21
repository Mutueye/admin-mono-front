import { RouteRecordData } from '@qst-admin/layout';
const Applets = () => import('./views/Applets.vue');
const DataSyncMng = () => import('./views/DataSyncMng.vue');

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
          path: 'applets/detail/:id',
          name: 'appletDetail',
          component: Applets,
          meta: {
            title: '应用详情',
            menuConfig: {
              hidden: true,
              activeRouteName: 'applets',
            },
          },
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
