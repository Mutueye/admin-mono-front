import { ElMessage } from 'element-plus';
import { useAuthStore } from '@qst-admin/auth';
import { setDefaultRequestWrapperOption } from '@itshixun/qst-request-lib';
import { router } from '@/router';

export const initRequestWrapper = () => {
  setDefaultRequestWrapperOption({
    handle401: () => {
      ElMessage.error('登录已失效或无权限');
      useAuthStore().logout(() => router?.push({ name: 'login' }));
    },
    handleMessage: (msg: string) => ElMessage.error(msg),
  });
};
