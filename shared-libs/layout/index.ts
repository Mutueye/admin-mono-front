import type { RouteRecordRaw } from 'vue-router';
import type { Component } from 'vue';
import BaseLayout from './src/base/Baselayout.vue';
import WrapperLayout from './src/wrapper/WrapperLayout.vue';
import AdminLayout from './src/admin/AdminLayout.vue';
import ContentWrapper from './src/components/ContentWrapper.vue';
import DashboardContent from './src/components/DashboardContent.vue';

export { ContentWrapper, DashboardContent };

/**
 * Page layout enum.
 */
export enum LayoutEnum {
  base = 'base',
  wrapper = 'wrapper',
  admin = 'admin',
}

const generateLayoutRoute = (config: { name: LayoutEnum; component: Component }): RouteRecordRaw => {
  return {
    path: `/${config.name}`,
    name: config.name,
    props: { layout: config.name },
    component: config.component,
    children: [],
  };
};

export const layoutRoutes: Record<LayoutEnum, RouteRecordRaw> = {
  base: generateLayoutRoute({ name: LayoutEnum.base, component: BaseLayout }),
  wrapper: generateLayoutRoute({ name: LayoutEnum.wrapper, component: WrapperLayout }),
  admin: generateLayoutRoute({ name: LayoutEnum.admin, component: AdminLayout }),
};

/** 以layout作为根目录的路由数据结构 */
export type RouteRecordData = Partial<Record<LayoutEnum | 'route', RouteRecordRaw[]>>;

/** 路由meta中的菜单配置 */
export interface MenuConfig {
  /** 菜单图标样式名称 */
  iconClass?: string;
  /** 菜单顺序号 */
  order?: number;
  /** 菜单scope，相同的layout显示不同的菜单时，使用scope来过滤菜单 */
  menuScope?: string;
  /** 不在菜单中显示  */
  hidden?: boolean;
  /** 指定要高亮的菜单对应的路由名称 */
  activeRouteName?: string;
}

/**
 * 父级路由结构定义
 * - 约定：在定义路由时保持父页面和子页面的param和query字段名称一致，才可在面包屑等位置正确的生成对应路由的地址
 */
export interface ParentRouteData {
  /** 路由名称 */
  name: string;
  /** 路由param参数的键值 */
  paramKeys?: string[];
  /** 路由query参数的键值 */
  queryKeys?: string[];
}

export const generateAllRoutes = ({
  staticRoutes,
  moduleRoutes,
}: {
  staticRoutes: RouteRecordRaw[];
  moduleRoutes: Record<string, { default: RouteRecordData }>;
}): RouteRecordRaw[] => {
  const allRoutes: RouteRecordRaw[] = [...staticRoutes];
  Object.keys(LayoutEnum).forEach((key) => {
    allRoutes.push(layoutRoutes[key as LayoutEnum]);
  });

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

  return allRoutes;
};
