import { onMounted, ref } from 'vue';
import { setThemeClassByIndex } from '@itshixun/qst-ui-system';
import { useToggleDayNight } from '@qst-admin/composables';

export const useThemeForSubApp = () => {
  const { toggleDayNight } = useToggleDayNight();

  onMounted(() => {
    // 如果当前是是WUJIE微前端子应用
    if (window.__POWERED_BY_WUJIE__) {
      // 切换夜间模式事件
      window.$wujie?.bus.$on('toggle-dark', () => {
        toggleDayNight();
      });
      // 主题切换事件
      window.$wujie?.bus.$on('theme-change', (themIndex: number) => {
        setThemeClassByIndex(themIndex);
      });
    }
  });
};
