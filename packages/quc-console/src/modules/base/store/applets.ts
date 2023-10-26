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
     * @TODO 后端接口调整：密码加密提交
     */
    deleteApplet(payload: { id: string; password: string }) {
      return requestWrapper<QstResult<unknown>>(() =>
        axiosInstance.delete(`${ApiPath}/console/applets/${payload.id}`, { data: { password: payload.password } })
      );
    },

    /**
     * 编辑应用权限
     * @param {object} payload 修改信息：{ id: 应用id; apicList: 权限name列表}
     * @returns {Promise<QstResult<unknown>>}
     * @TODO 后端接口调整：需要默认选中DEFAULT权限，且保证勾选DEFAULT权限起作用
     */
    editApic(payload: { id: string; apicList: string[] }) {
      return requestWrapper<QstResult<unknown>>(() =>
        axiosInstance.patch(`${ApiPath}/console/applets/${payload.id}/apic`, payload.apicList)
      );
    },
  },
});
