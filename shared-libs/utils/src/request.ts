import { ElMessage } from 'element-plus';
import { setDefaultRequestWrapperOption } from '@itshixun/qst-request-lib';

export const initRequestWrapper = (handleLogout?: () => void) => {
  setDefaultRequestWrapperOption({
    handle401: () => {
      if (typeof handleLogout === 'function') handleLogout();
    },
    handleMessage: (msg: string) => {
      ElMessage.error(msg);
    },
  });
};
