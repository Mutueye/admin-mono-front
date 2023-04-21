import { defineStore } from 'pinia';
// import axios from 'axios';

/** 子应用数据 */
export interface SubAppConfig {
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
  order: number;
  /** auth code 权限码 */
  authCode?: number | string;
}

const sub_app_dev_config_list: SubAppConfig[] = [
  {
    title: '用户中心控制台',
    name: 'uc',
    iconClass: 'i-mdi-account-settings-outline',
    devUrl: '//localhost:5210/',
    url: '//localhost:5210/',
    order: 1,
    authCode: 256,
  },
  {
    title: '测试外网跨域',
    name: 'testcors',
    iconClass: 'i-mdi-check-network-outline',
    devUrl: '',
    url: 'https://mutueye.github.io/vite-vue3-scaffold/',
    order: 2,
    authCode: 256,
  },
];

interface SubAppState {
  configList: SubAppConfig[];
}

export const useSubAppStore = defineStore('appConfig', {
  state: (): SubAppState => {
    return {
      configList: [...sub_app_dev_config_list],
    };
  },
  actions: {
    getAppList() {
      // TODO 接口请求子应用列表数据
      // return axios
      //   .get<AppConfig>('/get_appconfig?r=' + Math.random())
      //   .then((res) => {
      //     console.log('res::::', res);
      //   })
      //   .catch((err) => {
      //     document.write(err, '获取配置失败！请检查 nginx 配置');
      //   });
    },
  },
});
