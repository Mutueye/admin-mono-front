import { ref } from 'vue';
import { useEventListener, useDebounceFn } from '@vueuse/core';

/**
 * @name useClientSize
 * @desc 取得页面宽度&高度
 */
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
