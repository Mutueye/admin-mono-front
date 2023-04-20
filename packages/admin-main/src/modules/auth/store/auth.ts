import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';
import { axiosBaseInstance, ApiPath } from '@/utils/requestUtils';
import { router } from '@/router';
import type { ResultData } from '@/utils/requestUtils';

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

    getLoginKey() {
      return axiosBaseInstance
        .get<ResultData<{ publicKey: string }>>(`${ApiPath}/console/login_key`)
        .then((res) => res.data.data.publicKey)
        .catch(() => ElMessage.error('获取登录密钥出错'));
    },

    login(params: { cryptogram: string; key: string }) {
      return axiosBaseInstance
        .post<ResultData<{ accessToken: string }>>(`${ApiPath}/console/login`, params)
        .then((res) => {
          const token = res.data.data.accessToken;
          if (token) {
            this.setToken(token);
            return token;
          } else {
            return '';
          }
        })
        .catch(() => {
          ElMessage.error('登录出错了');
        });
    },

    getUserInfo() {
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

    logout() {
      return axiosBaseInstance.post(`${ApiPath}/console/logout`).then(() => {
        if (this.token) {
          this.token = '';
          this.userInfo = {};
        }
        router.push({ name: 'login' });
      });
    },
  },
});
