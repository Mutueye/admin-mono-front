// https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
import { MenuConfig, ParentRouteData } from './router/types';

export {};

/** augment RoutMeta interface. */
declare module 'vue-router' {
  interface RouteMeta {
    /** one title for each route page */
    title: string;
    /** layout menu will traverse route tree and generate menu items according to this config */
    menuConfig?: MenuConfig;
    /** stores parent route data 引用父路由和根路由信息 */
    parentRouteData?: ParentRouteData;
    /** sub app url 子应用地址 */
    subAppUrl?: string;
    /** 菜单权限码 authorization code */
    authCode?: number | string;
  }
}
