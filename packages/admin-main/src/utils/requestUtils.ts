import { axiosBaseInstance, setupAxiosRequestInterceptor } from 'common-utils';
import { useAuthStore } from '@/modules/auth/store/auth';

console.log('reuest utils:::test');

export const setupRequestInterceptor = () =>
  setupAxiosRequestInterceptor({
    instance: axiosBaseInstance,
    onFulfilled: (config) => {
      const token = useAuthStore().token;
      if (token) {
        config.headers = Object.assign(config.headers, { 'X-Access-Token': token });
      }
      return config;
    },
    onRejected: (err) => {
      // TODO error handler
      console.log('err:::', err);
      return err;
    },
  });
