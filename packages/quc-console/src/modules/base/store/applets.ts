import { defineStore } from 'pinia';
import { AppletCardData, AppletData, CreateAppletPayload, CreateAppletResponse } from '../types';
import { ApiPath, axiosInstance } from '@qst-admin/request';
import { requestWrapper, QstResult, QstPagination } from '@itshixun/qst-request-lib';

interface AppletsState {
  applets: AppletCardData[];
  currentApplet: AppletData | null;
}

export const useAppletsStore = defineStore('applets', {
  state: (): AppletsState => ({
    applets: [],
    currentApplet: null,
  }),
  actions: {
    /**
     * 获取应用列表
     * @returns {Promise<AppletCardData[]>} 应用列表
     */
    getApplets() {
      return requestWrapper<QstResult<QstPagination<AppletCardData>>>(() =>
        axiosInstance.get(`${ApiPath}/console/applets`)
      ).then((res) => {
        if (res.data) {
          this.applets = res.data.rows ? res.data.rows : [];
          return this.applets;
        }
      });
    },

    /**
     * 创建应用
     * @param {CreateAppletPayload} payload 创建应用需要的payload: 应用名称和hosts
     * @returns {Promise<QstResult<CreateAppletResponse>>} 返回{ name: string; hosts: string[]; id: string; secret: string }
     */
    createApplet(payload: CreateAppletPayload) {
      return requestWrapper<QstResult<CreateAppletResponse>>(() =>
        axiosInstance.post(`${ApiPath}/console/applets`, payload)
      );
    },

    /**
     * 获取应用详情
     * @param {string} id 应用id
     * @returns {Promise<AppletData | undefined>}
     */
    getAppletDetail(id: string) {
      return requestWrapper<QstResult<AppletData>>(() => axiosInstance.get(`${ApiPath}/console/applets/${id}`)).then(
        (res) => {
          if (res.data) {
            this.currentApplet = res.data;
          }
          return res.data;
        }
      );
    },

    /**
     * 修改应用名称
     * @param {object} payload 修改信息：id和name
     * @returns {Promise<QstResult<unknown>>}
     */
    editAppletName(payload: { id: string; name: string }) {
      return requestWrapper<QstResult<unknown>>(() =>
        axiosInstance.patch(`${ApiPath}/console/applets/${payload.id}/name`, payload)
      );
    },

    /**
     * 删除应用
     * @param {string} id 应用id
     * @param {string} password 当前账号的密码
     * @returns {Promise<QstResult<unknown>>}
     */
    deleteApplet(payload: { id: string; password: string }) {
      // TODO 密码加密
      return requestWrapper<QstResult<unknown>>(() =>
        axiosInstance.delete(`${ApiPath}/console/applets/${payload.id}`, { data: { password: payload.password } })
      );
    },
  },
});
