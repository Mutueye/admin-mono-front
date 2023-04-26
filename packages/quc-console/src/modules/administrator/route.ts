import { RouteRecordData } from '@/router/types';
import AccountMng from './views/AccountMng.vue';
import RoleMng from './views/RoleMng.vue';
import OperationLog from './views/OperationLog.vue';

const routeData: RouteRecordData = {
  admin: [
    {
      path: '/administrator',
      name: 'administrator',
      meta: {
        title: '管理员业务',
        menuConfig: {
          order: 2,
          iconClass: 'i-mdi-account-cog-outline',
        },
      },
      redirect: '/administrator/applets',
      children: [
        {
          path: 'accountMng',
          name: 'accountMng',
          meta: {
            title: '管理员账号管理',
            menuConfig: {
              order: 0,
            },
          },
          component: AccountMng,
        },
        {
          path: 'roleMng',
          name: 'roleMng',
          meta: {
            title: '角色与权限',
            menuConfig: {
              order: 1,
            },
          },
          component: RoleMng,
        },
        {
          path: 'operationLog',
          name: 'operationLog',
          meta: {
            title: '操作明细',
            menuConfig: {
              order: 2,
            },
          },
          component: OperationLog,
        },
      ],
    },
  ],
};

export default routeData;
