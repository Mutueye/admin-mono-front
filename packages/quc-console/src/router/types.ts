import type { RouteRecordRaw } from 'vue-router';
import { LayoutEnum } from '@/layout/layoutRouteConfig';

export type RouteRecordData = Partial<Record<LayoutEnum | 'route', RouteRecordRaw[]>>;

export interface MenuConfig {
  iconClass?: string;
  order?: number;
  menuScope?: string;
}

export interface ParentRouteData {
  parentRoute: RouteRecordRaw;
  baseRoute: RouteRecordRaw;
}
