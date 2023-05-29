import axios from 'axios'
import type {
  AxiosResponse,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosInterceptorOptions
} from 'axios'

/** 约定的常规返回数据结构体 */
export interface ResultData<T> {
  code: number
  status: number
  success: boolean
  message: string
  /** 返回的数据 */
  data: T
  // 额外的返回数据，比如用户中心的extras.failureCount，返回登录错误的次数
  extras?: Record<string, unknown>
}

/** 返回的分页数据结构 */
export interface PaginationResult<T> {
  total: number
  offset: number
  limit: number
  pageNumber: number
  pageSize: number
  rows: T[]
}

/** axios拦截器配置方法的参数 */
export interface AxiosInterceptorParams<T> {
  /** axios实例 */
  instance: AxiosInstance
  /** request/response成功 */
  onFulfilled?: (value: T) => T | Promise<T>
  /** request/response失败 */
  onRejected?: (error: any) => any
  /** 选项 */
  options?: AxiosInterceptorOptions
}

// request contentType
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8'
}

export const axiosBaseInstance = axios.create({
  headers: {
    'Content-Type': ContentTypeEnum.JSON
  }
})

export const axiosUploadInstance = axios.create({
  headers: {
    'Content-Type': ContentTypeEnum.FORM_DATA
  }
})

/** 配置axios request拦截器的方法 */
export const setupAxiosRequestInterceptor = ({
  instance,
  onFulfilled,
  onRejected,
  options
}: AxiosInterceptorParams<InternalAxiosRequestConfig<any>>) => {
  instance.interceptors.request.use(onFulfilled, onRejected, options)
}

/** 配置axios response拦截器的方法 */
export const setupAxiosResponseInterceptor = ({
  instance,
  onFulfilled,
  onRejected,
  options
}: AxiosInterceptorParams<AxiosResponse<any, any>>) => {
  instance.interceptors.response.use(onFulfilled, onRejected, options)
}

// setupAxiosRequestInterceptor({
//   instance: axiosBaseInstance,
//   onFulfilled: (config) => {
//     const token = useAuthStore().token
//     if (token) {
//       config.headers = Object.assign(config.headers, {
//         'X-Access-Token': token
//       })
//     }
//     return config
//   },
//   onRejected: (err) => {
//     console.log('err:::', err)
//     return err
//   }
// })

// export const ApiPath = import.meta.env.VITE_API_BASE_PATH
//   ? import.meta.env.VITE_API_BASE_PATH
//   : '/spi'
