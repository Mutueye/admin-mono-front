import { unionBy } from 'lodash-es';

export interface SubAppConfig {
  /** id */
  id?: string;
  /** 子应用中文标题 */
  title: string;
  /** 子应用名称 英文 用于路由配置 */
  name: string;
  /** 子应用图标的样式名 */
  iconClass: string;
  /** 开发模式下子应用的url */
  devUrl?: string;
  /** 子应用url */
  url: string;
  /** 顺序号 */
  order?: number;
  /** auth code 权限码 */
  authCode?: number | string;
}

const localSubAppListKey = 'sub-app-list';

export const appList: SubAppConfig[] = [
  {
    title: '用户中心控制台',
    name: 'uc',
    iconClass: 'i-mdi-account-settings-outline',
    devUrl: '//localhost:5210/',
    url: '//localhost:5210/',
    order: 1,
  },
  {
    title: '测试外网跨域',
    name: 'testcors',
    iconClass: 'i-mdi-check-network-outline',
    devUrl: '',
    url: 'https://mutueye.github.io/vite-vue3-scaffold/',
    order: 2,
  },
];

export const getSubAppList = async () => {
  // TODO 请求接口取得子应用列表
  const localSubAppList = getLocalSubAppList();
  let subAppList: SubAppConfig[] = appList;
  if (localSubAppList) {
    subAppList = unionBy(localSubAppList, appList, 'name');
  }
  setLocalSubAppList(subAppList);
  // return subAppList;
  return new Promise<SubAppConfig[]>((resolve) => {
    // 通过延时模拟接口请求
    setTimeout(() => {
      resolve(subAppList);
    }, 300);
  });
};

export const getLocalSubAppList = (): SubAppConfig[] | null => {
  const appListStr = localStorage.getItem(localSubAppListKey);
  if (appListStr) {
    return JSON.parse(appListStr) as SubAppConfig[];
  } else {
    return null;
  }
};

export const setLocalSubAppList = (list: SubAppConfig[], reload = false) => {
  localStorage.setItem(localSubAppListKey, JSON.stringify(list));
  if (reload) {
    location.reload();
  }
};
