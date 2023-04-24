import { RouteRecordData } from '@/router/types';
import UserMng from './views/UserMng.vue';
import OrgMng from './views/OrgMng.vue';

const routeData: RouteRecordData = {
  admin: [
    {
      path: '/operate',
      name: 'operate',
      meta: {
        title: '运营业务',
        menuConfig: {
          order: 1,
          iconClass: 'i-mdi-database-cog-outline',
        },
      },
      redirect: '/operate/userMng',
      children: [
        {
          path: 'userMng',
          name: 'userMng',
          meta: {
            title: '用户管理',
            menuConfig: {
              order: 0,
            },
          },
          component: UserMng,
        },
        {
          path: 'orgMng',
          name: 'orgMng',
          meta: {
            title: '组织机构管理',
            menuConfig: {
              order: 1,
            },
          },
          component: OrgMng,
        },
      ],
    },
  ],
};

export default routeData;
