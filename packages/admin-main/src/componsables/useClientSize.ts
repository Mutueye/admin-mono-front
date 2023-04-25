import { ref } from 'vue';
import { useEventListener, useDebounceFn } from '@vueuse/core';
/** 取得窗口的宽度/高度(不含滚动条) */
export const useClientSize = (debounceTime = 100) => {
  const width = ref(document.documentElement.clientWidth);
  const height = ref(document.documentElement.clientHeight);

  const debouncedOnResize = useDebounceFn(() => {
    width.value = document.documentElement.clientWidth;
    height.value = document.documentElement.clientHeight;
  }, debounceTime);

  useEventListener(window, 'resize', () => debouncedOnResize());

  return { width, height };
};
