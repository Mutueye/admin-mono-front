import { Router, createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { layoutRoutes, LayoutEnum, RouteRecordData } from '@qst-admin/layout';
import { BasePath } from '@/utils/consts';
import { useAuthStore } from '@qst-admin/auth';
import { getLocalSubAppList } from '@/utils/subAppConfig';
import AppWrapper from '@/modules/appWrapper/views/AppWrapper.vue';

const generateAllRoutes = (staticRoutes: RouteRecordRaw[]): RouteRecordRaw[] => {
  const allRoutes: RouteRecordRaw[] = [...staticRoutes];
  Object.keys(LayoutEnum).forEach((key) => {
    allRoutes.push(layoutRoutes[key as LayoutEnum]);
  });
  const moduleRoutes = import.meta.glob('@/modules/**/*/route.ts', {
    eager: true,
  }) as Record<string, { default: RouteRecordData }>;
  for (const path in moduleRoutes) {
    const route = moduleRoutes[path].default.route;
    if (route) allRoutes.push(...route);
    Object.keys(LayoutEnum).forEach((key) => {
      const targetRoutes = moduleRoutes[path].default[key as LayoutEnum];
      if (targetRoutes) {
        layoutRoutes[key as LayoutEnum].children?.push(...targetRoutes);
      }
    });
  }

  const wrapperRoutes = allRoutes.find((rout) => rout.name === 'wrapper');
  addSubAppRoutes(wrapperRoutes);

  addRouteParentMeta(allRoutes, null, null);

  return allRoutes;
};

// 从配置中读取子项目路由
const addSubAppRoutes = (parentRoute?: RouteRecordRaw) => {
  if (parentRoute) {
    const subAppRoutes: RouteRecordRaw[] = [];
    const appList = getLocalSubAppList();
    if (appList) {
      appList.forEach((appConfig) => {
        subAppRoutes.push({
          name: appConfig.name,
          path: '/' + appConfig.name,
          component: AppWrapper,
          meta: {
            title: appConfig.title,
            menuConfig: {
              iconClass: appConfig.iconClass,
              order: appConfig.order,
            },
            subAppUrl: appConfig.url,
          },
        });
      });
      if (parentRoute.children) {
        parentRoute.children = [...parentRoute.children, ...subAppRoutes];
      } else {
        parentRoute.children = subAppRoutes;
      }
    }
  }
};

// 给每个路由的meta增加parentRouteData信息
const addRouteParentMeta = (
  routes: RouteRecordRaw[],
  parentRoute: RouteRecordRaw | null,
  baseRoute: RouteRecordRaw | null
) => {
  routes.forEach((route) => {
    if (parentRoute && baseRoute) {
      const parentRouteData = { parentRoute, baseRoute };
      if (route.meta) {
        route.meta.parentRouteData = parentRouteData;
      } else {
        route.meta = { title: '', parentRouteData };
      }
    }
    if (route.children) {
      addRouteParentMeta(route.children, route, baseRoute ? baseRoute : route);
    }
  });
};

export const baseRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
];

export let router: Router | null = null;

export const initRouter = () => {
  const routes = generateAllRoutes(baseRoutes);
  // console.log('routes::::', routes);
  router = createRouter({
    history: createWebHistory(BasePath),
    routes,
  });

  router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    if (to.name !== 'login') {
      if (authStore.token) {
        next();
      } else {
        // TODO 登录后跳转回from所在页面
        next({ name: 'login' });
      }
    } else {
      next();
    }
  });
};
