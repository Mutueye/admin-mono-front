import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { generateAllRoutes } from '@qst-admin/layout';
import { useAuthStore } from '@qst-admin/auth';
import { BasePath } from '@/utils/consts';

export const baseRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard',
  },
];

export const router = createRouter({
  history: createWebHistory(BasePath),
  routes: generateAllRoutes({
    staticRoutes: baseRoutes,
    moduleRoutes: import.meta.glob('@/modules/**/*/route.ts', { eager: true }),
  }),
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
