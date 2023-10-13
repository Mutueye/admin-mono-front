import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';
import { requestWrapper, QstResult } from '@itshixun/qst-request-lib';
import { ApiPath } from '@/utils/consts';
import { axiosMainInstance } from '@/utils/requestUtils';
import { router } from '@/router';

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

    getLoginKey() {
      return requestWrapper<QstResult<{ publicKey: string }>>(() => axiosMainInstance.get(`${ApiPath}/console/login_key`)).then((res) => {
        if (res.data) return res.data.publicKey;
      });
    },

    login(params: { cryptogram: string; key: string }) {
      return requestWrapper<QstResult<{ accessToken: string }>>(() => axiosMainInstance.post(`${ApiPath}/console/login`, params)).then((res) => {
        if (res.data && res.data.accessToken) {
          const token = res.data.accessToken;
          this.setToken(token);
          return token;
        } else {
          ElMessage.error('登录成功但未返回token');
          return '';
        }
      });
    },

    getUserInfo() {
      return requestWrapper<QstResult<UserInfo>>(() => axiosMainInstance.get(`${ApiPath}/console/token`)).then((res) => {
        if (res.data) {
          this.userInfo = res.data;
          return res.data;
        } else {
          return null;
        }
      });
    },

    logout() {
      if (window.__POWERED_BY_WUJIE__) {
        // 全局事件总线触发“退出”
        window.$wujie?.bus.$emit('logout');
      } else {
        return requestWrapper(() => axiosMainInstance.post(`${ApiPath}/console/logout`)).then(() => {
          if (this.token) {
            this.token = '';
            this.userInfo = {};
          }
          if (router) {
            router.push({ name: 'login' });
          }
        });
      }
    },
  },
});
