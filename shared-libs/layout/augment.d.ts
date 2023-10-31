// https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
import { MenuConfig, ParentRouteData } from './';

/** augment RoutMeta interface. */
declare module 'vue-router' {
  /** 路由meta数据 */
  interface RouteMeta {
    /** 页面标题 */
    title: string;
    /** layout菜单通过遍历路由树的menuConfig来生成菜单树 */
    menuConfig?: MenuConfig;
    /** 父级路由的信息，用于页面后退按钮和面包屑 */
    parentRouteData?: ParentRouteData;
    /** sub app url 子应用地址 */
    subAppUrl?: string;
    /** 菜单权限码 authorization code */
    authCode?: number | string;
  }
}

export {};
