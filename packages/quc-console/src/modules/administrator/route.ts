import { RouteRecordData } from '@qst-admin/layout';

const AccountMng = () => import('./views/AccountMng.vue');
const RoleMng = () => import('./views/RoleMng.vue');
const OperationLog = () => import('./views/OperationLog.vue');

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
