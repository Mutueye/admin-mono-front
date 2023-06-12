import { defineStore } from 'pinia';
import { Pagination, ResultData } from 'common-utils';
import { Applet } from '../types';
import { ApiPath } from '@/utils/consts';
import { axiosBaseInstance, getResult } from '@/utils/requestUtils';

interface AppletsState {
  applets: Applet[];
}

export const useAppletsStore = defineStore('applets', {
  state: (): AppletsState => ({
    applets: [],
  }),
  actions: {
    async getApplets() {
      return axiosBaseInstance
        .get<ResultData<Pagination<Applet>>>(`${ApiPath}/console/applets`)
        .then((res) => {
          return getResult(res, { defaultErrorMessage: '请求应用列表失败' });
        })
        .then((res) => {
          this.applets = res.data.rows ? res.data.rows : [];
          return this.applets;
        });
    },
  },
});
