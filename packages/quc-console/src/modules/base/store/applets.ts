import { defineStore } from 'pinia';
import { Applet } from '../types';
import { ApiPath } from '@/utils/consts';
import { axiosMainInstance } from '@/utils/requestUtils';
import { requestWrapper, QstResult, QstPagination } from '@itshixun/qst-request-lib';

interface AppletsState {
  applets: Applet[];
}

export const useAppletsStore = defineStore('applets', {
  state: (): AppletsState => ({
    applets: [],
  }),
  actions: {
    getApplets() {
      return requestWrapper<QstResult<QstPagination<Applet>>>(() =>
        axiosMainInstance.get(`${ApiPath}/console/applets`),
      ).then((res) => {
        if (res.data) {
          this.applets = res.data.rows ? res.data.rows : [];
          return this.applets;
        }
      });
    },
  },
});
