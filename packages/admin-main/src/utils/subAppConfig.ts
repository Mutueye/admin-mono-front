// import { unionBy } from 'lodash-es';

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
  /** 是否可以编辑/删除 */
  isFixed?: boolean;
}

const localSubAppListKey = 'sub-app-list';

/** app列表mock */
export const appList: SubAppConfig[] = [
  {
    title: '用户中心控制台',
    name: 'quc',
    iconClass: 'i-mdi-account-settings-outline',
    devUrl: `//${import.meta.env.VITE_DEV_HOST}:${import.meta.env.VITE_DEV_PORT_QUC}/`,
    url: import.meta.env.VITE_APP_PATH_QUC,
    order: 1,
    isFixed: true,
  },
  {
    title: '消息通知控制台',
    name: 'qmn',
    iconClass: 'i-mdi-alarm-light-outline',
    devUrl: `//${import.meta.env.VITE_DEV_HOST}:${import.meta.env.VITE_DEV_PORT_QMN}/`,
    url: import.meta.env.VITE_APP_PATH_QMN,
    order: 2,
    isFixed: true,
  },
  {
    title: '任务调度控制台',
    name: 'qts',
    iconClass: 'i-mdi-check-network-outline',
    devUrl: `//${import.meta.env.VITE_DEV_HOST}:${import.meta.env.VITE_DEV_PORT_QTS}/`,
    url: import.meta.env.VITE_APP_PATH_QTS,
    order: 3,
    isFixed: true,
  },
  {
    title: '外部可跨域站点示例(webpack)',
    iconClass: 'i-mdi-bulletin-board',
    name: 'webpack',
    url: 'https://webpack.js.org/',
    order: 4,
  },
];

/**
 * 获取合适的子应用url：前端开发模式时使用devUrl，否者使用url，并判断是否为完整url，如果不是，使用当前location.origin组成完整url
 * @param {subAppConfig} config 子应用配置
 */
export const resolveSubAppUrl = (config: SubAppConfig) => {
  const finalUrl = import.meta.env.DEV && config.devUrl ? config.devUrl : config.url;
  if (finalUrl.startsWith('//') || finalUrl.startsWith('http://') || finalUrl.startsWith('https://')) {
    return finalUrl;
  } else {
    return `${window.location.origin}${finalUrl.startsWith('/') || finalUrl.startsWith('?') ? '' : '/'}${finalUrl}`;
  }
};

export const getSubAppList = async () => {
  // TODO 请求接口取得子应用列表
  const localSubAppList = getLocalSubAppList();
  let subAppList: SubAppConfig[] = appList;
  if (localSubAppList && localSubAppList.length > 0) {
    // subAppList = unionBy(localSubAppList, appList, 'name');
    subAppList = localSubAppList;
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
