import { AxiosController } from 'common-utils';
// import { useAuthStore } from '@/modules/auth/store/auth';

export const axiosBaseController = new AxiosController({
  // 开发模式下端口不同，需要设置withCredentials为true，才能在请求接口时request headers拿到基座的cookie
  withCredentials: import.meta.env.DEV,
});
export const axiosBaseInstance = axiosBaseController.instance;

/**
 * 根据store里存储的token设置axiosBaseInstance实例的headers['X-Access-Token'],
 * 如果store里存储的token和headers['X-Access-Token']一致，则忽略
 */
// export const axiosBaseInstanceAuthorize = () => {
//   const token = useAuthStore().token;
//   const headerToken = axiosBaseInstance.defaults.headers['X-Access-Token'];
//   if (token && token !== headerToken) setHeaderAccessToken(token);
// };

/** 设置headers的X-Accesss-Token，不传则为清空 */
// export const setHeaderAccessToken = (token?: string) => {
//   axiosBaseController.setHeaders({
//     'X-Access-Token': token ? token : null,
//   });
// };
