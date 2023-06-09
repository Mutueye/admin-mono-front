import axios from 'axios';
import {
  AxiosInstance,
  AxiosError,
  AxiosHeaderValue,
  InternalAxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
} from 'axios';

/** 约定的常规接口返回数据结构体 */
export interface ResultData<T> {
  code: number;
  status: number;
  success: boolean;
  message: string;
  /** 返回的数据 */
  data: T;
  // 额外的返回数据，比如用户中心的extras.failureCount，返回登录错误的次数
  extras?: Record<string, unknown>;
}

/** 约定的分页数据结构 */
export interface Pagination<T> {
  total: number;
  offset: number;
  limit: number;
  pageNumber: number;
  pageSize: number;
  rows: T[];
}

/** request contentType */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

/**
 * @name 拦截器类型枚举
 * @description 分为四种类型：RequestFulfilled - 请求完成，RequestRejected - 请求失败，
 * ResponseFulfilled - 响应成功，ResponseRejected - 响应失败。
 */
export enum InterceptorTypeEnum {
  /** 拦截器类型：请求成功时触发的拦截器 */
  RequestFulfilled = 'requestFulfilled',
  /** 拦截器类型：请求失败时触发的拦截器 */
  RequestRejected = 'requestRejected',
  /** 拦截器类型：响应成功时触发的拦截器 */
  ResponseFulfilled = 'responseFulfilled',
  /** 拦截器类型：响应失败时触发的拦截器 */
  ResponseRejected = 'responseRejected',
}

/** 拦截器方法类型，根据拦截器的类型，对应的拦截器的方法也不同 */
export type InterceptorMethod<T extends InterceptorTypeEnum> =
  T extends InterceptorTypeEnum.RequestFulfilled
    ? (config: InternalAxiosRequestConfig<any>) => InternalAxiosRequestConfig<any>
    : T extends InterceptorTypeEnum.ResponseFulfilled
    ? (config: AxiosResponse<any>) => AxiosResponse<any>
    : (err: any) => any;

/**
 * @name 可插拔的拦截器独立逻辑块
 * @description 我们将当前axios实例的拦截器配置拆分为一个拦截器数组，在实际项目中，
 * 我们可以随时根据项目插拔单个的拦截器逻辑，而不需要重新调用interceptors.request.use
 * 或者interceptors.response.use来重新配置拦截器。
 */
export interface InterceptorItem<T extends InterceptorTypeEnum> {
  /** 拦截器名称，用于更新或者删除该拦截器时的唯一标识 */
  name: string;
  /** 拦截器类型InterceptorTypeEnum：RequestFulfilled - 请求完成，RequestRejected - 请求失败，ResponseFulfilled - 响应成功，ResponseRejected - 响应失败*/
  type: T;
  /** 拦截器方法 */
  method: InterceptorMethod<T>;
}

/**
 * @description 通用的axios控制器。主要功能：
 * 1. 创建一个axios拦截器；
 * 2. 通过setHeaders方法随时设置config.headers配置；
 * 3. 通过addInterceptor和deleteInterceptor在项目执行过程总热插拔拦截器的逻辑块；
 * 4. TODO: 支持文件上传的相关配置
 */
export class AxiosController {
  /** 当前AxiosController控制的axios实例 */
  instance: AxiosInstance;
  /** 拦截器列表 */
  interceptorList: Array<InterceptorItem<InterceptorTypeEnum>>;

  constructor(config?: CreateAxiosDefaults<any>) {
    this.instance = axios.create(config);
    this.setHeaders({ 'Content-Type': ContentTypeEnum.JSON });
    this.interceptorList = [
      {
        name: 'baseResponseRejected',
        type: InterceptorTypeEnum.ResponseRejected,
        method: (res: AxiosError<any>) => {
          if (res.response) {
            return res.response;
          } else {
            throw new Error('axios response empty');
          }
        },
      },
    ];
    this.setAxiosInterceptors();
  }

  /** 设置当前实例的headers配置 */
  setHeaders = (headers: Record<string, AxiosHeaderValue>) => {
    if (!this.instance) return;
    Object.assign(this.instance.defaults.headers, headers);
  };

  /**
   * 添加一个拦截器
   * @param { InterceptorItem<InterceptorTypeEnum> } interceptorItem 拦截器内容
   */
  addInterceptor = (interceptorItem: InterceptorItem<InterceptorTypeEnum>) => {
    const target = this.interceptorList.find((item) => item.name === interceptorItem.name);
    if (target) {
      target.method = interceptorItem.method;
      target.type = interceptorItem.type;
    } else {
      this.interceptorList.push(interceptorItem);
    }
  };

  /** 删除指定名字的拦截器 */
  deleteInterceptor = (name: string) => {
    const targetIndex = this.interceptorList.findIndex((item) => item.name === name);
    if (targetIndex >= 0) {
      this.interceptorList.splice(targetIndex, 1);
    }
  };

  /** 设置当前控制器所创建的实例的axios拦截器 */
  private setAxiosInterceptors = () => {
    if (!this.instance) return;
    // setup request interceptors
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig<any>) => {
        let ret = config;
        this.interceptorList.forEach((interceptor) => {
          if (interceptor.type === InterceptorTypeEnum.RequestFulfilled) {
            if (typeof interceptor.method === 'function') ret = interceptor.method(ret);
          }
        });
        return ret;
      },
      (err: any) => {
        let ret = err;
        this.interceptorList.forEach((interceptor) => {
          if (interceptor.type === InterceptorTypeEnum.RequestRejected) {
            if (typeof interceptor.method === 'function') ret = interceptor.method(ret);
          }
        });
        return ret;
      },
    );
    // setup response interceptors
    this.instance.interceptors.response.use(
      (response: AxiosResponse<any>) => {
        let ret = response;
        this.interceptorList.forEach((interceptor) => {
          if (interceptor.type === InterceptorTypeEnum.ResponseFulfilled) {
            if (typeof interceptor.method === 'function') ret = interceptor.method(ret);
          }
        });
        return ret;
      },
      (err: any) => {
        let ret = err;
        this.interceptorList.forEach((interceptor) => {
          if (interceptor.type === InterceptorTypeEnum.ResponseRejected) {
            if (typeof interceptor.method === 'function') ret = interceptor.method(ret);
          }
        });
        return ret;
      },
    );
  };
}

/**
 * 请求返回的数据格式化
 */
export const getResult = <T>({
  res,
  message,
  fallbackMessage = '接口请求错误',
}: {
  res: AxiosResponse<ResultData<T>>;
  message?: string;
  fallbackMessage?: string;
}) => {
  const status = res.status;
  const code = res.data.code;
  if (res.data.success || (status === 200 && code === 200)) {
    return res.data;
  } else if (
    status === 200 &&
    res.statusText === 'OK' &&
    res.config.url.indexOf('myhuaweicloud') >= 0
  ) {
    // 华为云
    return res.data;
  } else {
    const msg = res.data && res.data.message ? res.data.message : res.statusText;
    const code = res.data && res.data.code ? res.data.code.toString() : '';
    throw handleAxiosError({
      err: new AxiosError(msg, code, res.config, res),
      message,
      fallbackMessage,
    });
  }
};

export const handleAxiosError = ({
  err,
  message,
  fallbackMessage = '接口请求错误',
}: {
  err: AxiosError<unknown>;
  fallbackMessage?: string;
  message?: string;
}) => {
  err.message = message ? message : err.message ? err.message : fallbackMessage;
  err.toJSON = () => {
    return {
      code: err.code,
      message: err.message,
      request: err.request,
      data: err.response ? err.response.data : null,
    };
  };
  return err;
};
