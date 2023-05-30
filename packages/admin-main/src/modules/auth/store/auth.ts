import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';
// import { InterceptorTypeEnum } from 'common-utils';
import type { ResultData /* InterceptorItem */ } from 'common-utils';
import { ApiPath } from '@/utils/consts';
import { router } from '@/router';
import {
  axiosBaseInstanceAuthorize,
  axiosBaseInstance,
  setHeaderAccessToken,
} from '@/utils/requestUtils';

// const { bus } = Wujie;

export interface UserInfo {
  /** token */
  accessToken: string;
  /** 账号 */
  account: string;
  /** 账号id */
  accountId: string;
  /** 姓名 */
  name: string;
  /** 权限码 */
  perm: number;
}

interface AuthState {
  token: string;
  userInfo: UserInfo | Record<string, never>;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: '',
    userInfo: {},
  }),
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'admin-auth',
        storage: localStorage,
      },
    ],
  },
  actions: {
    /** 保存Token */
    setToken(token: string) {
      this.token = token;
    },

    async getLoginKey() {
      return axiosBaseInstance
        .get<ResultData<{ publicKey: string }>>(`${ApiPath}/console/login_key`)
        .then((res) => res.data.data.publicKey)
        .catch(() => ElMessage.error('获取登录密钥出错'));
    },

    async login(params: { cryptogram: string; key: string }) {
      return axiosBaseInstance
        .post<ResultData<{ accessToken: string }>>(`${ApiPath}/console/login`, params)
        .then((res) => {
          const token = res.data.data.accessToken;
          if (token) {
            this.setToken(token);
            axiosBaseInstanceAuthorize();
            // 添加拦截器示例
            // axiosBaseController.addInterceptor({
            //   name: 'test',
            //   type: InterceptorTypeEnum.ResponseFulfilled,
            //   method: (response) => {
            //     return response;
            //   },
            // } as InterceptorItem<InterceptorTypeEnum.ResponseFulfilled>);
            return token;
          } else {
            return '';
          }
        })
        .catch((err) => {
          console.log('登录接口出错:', err);
          ElMessage.error('登录出错了');
        });
    },

    async getUserInfo() {
      return axiosBaseInstance.get<ResultData<UserInfo>>(`${ApiPath}/console/token`).then((res) => {
        const userInfo = res.data.data;
        if (userInfo) {
          this.userInfo = userInfo;
          return userInfo;
        } else {
          return null;
        }
      });
    },

    async logout() {
      return axiosBaseInstance.post(`${ApiPath}/console/logout`).then(() => {
        if (this.token) {
          this.token = '';
          this.userInfo = {};
          setHeaderAccessToken();
        }
        if (router) {
          router.push({ name: 'login' });
        }
      });
    },
  },
});
