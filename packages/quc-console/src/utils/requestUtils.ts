import Axios, { AxiosResponse, AxiosError } from 'axios';
import { ElMessage } from 'element-plus';
import { AxiosController, InterceptorTypeEnum, ResultData, getAxiosResult } from 'common-utils';
import { useAuthStore } from '@/modules/auth/store/auth';
import { setDefaultRequestWrapperOption } from '@itshixun/qst-request-lib';

export const axiosMainInstance = Axios.create({
  withCredentials: import.meta.env.DEV,
});

setDefaultRequestWrapperOption({
  handle401: () => {
    ElMessage.error('登录已失效或无权限');
    useAuthStore().logout();
  },
  handleMessage: (msg: string) => ElMessage.error(msg),
});

export const axiosBaseController = new AxiosController({
  // 开发模式下多个子项目使用不同端口，需要设置withCredentials为true，才能在请求接口时request headers拿到基座的cookie
  withCredentials: import.meta.env.DEV,
});
export const axiosBaseInstance = axiosBaseController.instance;

axiosBaseController.addInterceptor({
  type: InterceptorTypeEnum.ResponseRejected,
  name: 'responseRejected',
  method: (response: AxiosResponse<ResultData<unknown>>) => {
    const status = response.status;
    const authStore = useAuthStore();
    if (status === 401 || status === 403) {
      const msg = '登录已失效或无权限';
      ElMessage.error(msg);
      // 跳转登录页
      authStore.logout();
      throw new Error(`[${status}] ${msg}`);
    } else if (status === 502 || status === 503) {
      const msg = '系统升级中...';
      ElMessage.info(msg);
      throw new Error(`[${status}] ${msg}`);
    } else if (status === 404) {
      const msg = '您访问的内容不存在';
      ElMessage.error(msg);
      throw new Error(`[${status}] ${msg}`);
    } else {
      return response;
    }
  },
});

// 添加拦截器示例：responseFulfilled拦截器
axiosBaseController.addInterceptor({
  type: InterceptorTypeEnum.ResponseFulfilled,
  name: 'responseFulfilled',
  method: (config: AxiosResponse<ResultData<unknown>>) => {
    console.log('response fulfilled ::::', config);
    return config;
  },
});

/** 接口返回数据的通用处理，默认通过ElMessage报错提示 */
export const getResult = <T>(
  res: AxiosResponse<ResultData<T>>,
  {
    showError = true,
    errorMessage,
    defaultErrorMessage,
  }: {
    showError?: boolean;
    errorMessage?: string;
    defaultErrorMessage?: string;
  }
) => {
  return getAxiosResult<T>(res, {
    errorMessage,
    defaultErrorMessage,
    errorHandler: (err: AxiosError<unknown>) => {
      if (showError) ElMessage.error(err.message ? err.message : '接口返回错误');
    },
  });
};

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
