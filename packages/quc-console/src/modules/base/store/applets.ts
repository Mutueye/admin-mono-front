import { defineStore } from 'pinia';
import { Applet, CreateAppletPayload, CreateAppletResponse } from '../types';
import { ApiPath, axiosInstance } from '@qst-admin/request';
import { requestWrapper, QstResult, QstPagination } from '@itshixun/qst-request-lib';

interface AppletsState {
  applets: Applet[];
}

export const useAppletsStore = defineStore('applets', {
  state: (): AppletsState => ({
    applets: [],
  }),
  actions: {
    /** 获取应用列表 */
    getApplets() {
      return requestWrapper<QstResult<QstPagination<Applet>>>(() => axiosInstance.get(`${ApiPath}/console/applets`)).then((res) => {
        if (res.data) {
          this.applets = res.data.rows ? res.data.rows : [];
          return this.applets;
        }
      });
    },

    /** 创建应用 */
    createApplet(payload: CreateAppletPayload) {
      return requestWrapper<QstResult<CreateAppletResponse>>(() => axiosInstance.post(`${ApiPath}/console/applets`, payload));
    },
  },
});
