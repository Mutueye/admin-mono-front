import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';
import type { PaginationResult } from 'common-utils';
import { ApiPath } from '@/utils/consts';
import { axiosBaseInstance } from '@/utils/requestUtils';

export interface Applet {
  name: string;
  id: string;
}

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
        .get<PaginationResult<Applet>>(`${ApiPath}/console/applets`)
        .then((res) => {
          return res.data.rows;
        })
        .catch(() => ElMessage.error('获取应用列表错误'));
    },
  },
});
