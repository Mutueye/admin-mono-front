import { ref, type Ref, onMounted } from 'vue';
import { useEventListener, useDebounceFn } from '@vueuse/core';

/**
 * @name useBoundingClientRect
 * @desc 取得元素的Rect信息(宽度&高度&位置等)
 */
export const useBoundingClientRect = (elementId: string, debounceTime = 100) => {
  const rect: Ref<DOMRect> = ref({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    toJSON: () => null,
  });

  const getRect = () => {
    const el = document.getElementById(elementId);
    if (el) rect.value = el.getBoundingClientRect();
  };

  onMounted(() => {
    getRect();
  });

  const debouncedOnResize = useDebounceFn(() => {
    getRect();
  }, debounceTime);

  useEventListener(window, 'resize', () => debouncedOnResize());

  return { rect, getRect };
};
