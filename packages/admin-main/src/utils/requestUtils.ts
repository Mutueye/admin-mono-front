import { AxiosController } from 'common-utils';
// import { useAuthStore } from '@/modules/auth/store/auth';

export const axiosBaseController = new AxiosController();
export const axiosBaseInstance = axiosBaseController.instance;

/**
 * 根据store里存储的token设置axiosBaseInstance实例的headers['X-Access-Token'],
 * 如果store里存储的token和headers['X-Access-Token']一致，则忽略
 */
export const axiosBaseInstanceAuthorize = () => {
  // const token = useAuthStore().token;
  // const headerToken = axiosBaseInstance.defaults.headers['X-Access-Token'];
  // if (token && token !== headerToken) setHeaderAccessToken(token);
};

/** 设置headers的X-Accesss-Token，不传则为清空 */
export const setHeaderAccessToken = (token?: string) => {
  axiosBaseController.setHeaders({
    'X-Access-Token': token ? token : null,
  });
};
