import { toRefs, onMounted } from 'vue';
import { useThemeStore } from '../store/theme';

export const useThemeForBaseApp = () => {
  const themeStore = useThemeStore();
  const { currentThemeIndex } = toRefs(themeStore);

  onMounted(() => {
    if (currentThemeIndex.value !== 0) {
      themeStore.setCurrentThemeIndex(currentThemeIndex.value);
    }
  });
};
