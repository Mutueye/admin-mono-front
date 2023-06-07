import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import type { RouteRecordData } from './types';
import { layoutRoutes, LayoutEnum } from '@/layout/layoutRouteConfig';
import { BasePath } from '@/utils/consts';
import { useAuthStore } from '@/modules/auth/store/auth';

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

  addRouteParentMeta(allRoutes, null, null);

  return allRoutes;
};

// 给每个路由的meta增加parentRouteData信息
const addRouteParentMeta = (
  routes: RouteRecordRaw[],
  parentRoute: RouteRecordRaw | null,
  baseRoute: RouteRecordRaw | null,
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
    redirect: '/dashboard',
  },
];

export const router = createRouter({
  history: createWebHistory(BasePath),
  routes: generateAllRoutes(baseRoutes),
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
