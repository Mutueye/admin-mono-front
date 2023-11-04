import { defineStore } from 'pinia';
import { BulletinsResponse, BulletinsPayload, BulletinsCountPayload, SuccessStatusType } from '../types';
import { ApiPath, axiosInstance } from '@qst-admin/request';
import { requestWrapper, QstResult, QstPagination } from '@itshixun/qst-request-lib';

type Pagination = { pageSize: number; pageNumber: number; total: number };

interface BulletinsState {
  /** 数据同步信息列表 */
  list: BulletinsResponse[];
  listLoading: boolean;
  pagination: Pagination;
  count: Record<SuccessStatusType, number>;
}

export const useBulletinsStore = defineStore('bulletins', {
  state: (): BulletinsState => ({
    list: [],
    listLoading: false,
    pagination: { pageSize: 20, pageNumber: 1, total: 0 },
    count: {
      success: 0,
      segment: 0,
      fail: 0,
    },
  }),
  actions: {
    /**
     * 获取数据同步信息列表
     * @param {BulletinsPayload} params 请求同步数据列表参数
     * @param {boolean} getCount 是否同步请求成功状态数量，默认true
     * @returns {Promise<BulletinsResponse[]>} 数据同步信息列表
     */
    getDataSyncList(params: BulletinsPayload, getCount = true) {
      if (getCount) {
        const countParams: BulletinsCountPayload = {};
        if (params.startTimestamp) countParams.startTimestamp = params.startTimestamp;
        if (params.endTimestamp) countParams.endTimestamp = params.endTimestamp;
        if (params.eventId) countParams.eventId = params.eventId;
        if (params.eventType) countParams.eventType = params.eventType;
        if (params.eventSource) countParams.eventSource = params.eventSource;
        // 请求成功状态数量
        this.getBulletinsCount(countParams);
      }

      // 开始请求数据
      this.listLoading = true;
      return requestWrapper<QstResult<QstPagination<BulletinsResponse>>>(() =>
        axiosInstance.get(`${ApiPath}/console/bulletins`, { params })
      )
        .then((res) => {
          if (res.data) {
            this.list = res.data.rows ? res.data.rows : [];
            this.updatePagination({ total: res.data.total });
            return res.data;
          }
        })
        .finally(() => {
          this.listLoading = false;
        });
    },

    /** 更新分页数据 */
    updatePagination(data: Partial<Pagination>) {
      this.pagination = Object.assign({}, this.pagination, data);
      return this.pagination;
    },

    /**
     * 数据同步管理-查询数量
     * @param {BulletinsCountPayload} params 查询参数
     * @returns {Promise<Record<SuccessStatusType, number>>} { success, segment, fail }
     */
    getBulletinsCount(params: BulletinsCountPayload) {
      return requestWrapper<QstResult<Record<SuccessStatusType, number>>>(() =>
        axiosInstance.get(`${ApiPath}/console/bulletins/count`, { params })
      ).then((res) => {
        if (res.data) this.count = res.data;
        return res.data;
      });
    },
  },
});
