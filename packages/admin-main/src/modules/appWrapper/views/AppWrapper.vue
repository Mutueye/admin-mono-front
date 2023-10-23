<template>
  <WuJie
    v-if="isSubApp"
    :key="route.name as string"
    width="100%"
    :height="height - 48 + 'px'"
    class="overflow-y-auto"
    :name="route.name"
    :url="route.meta.subAppUrl"
    :sync="true"
    :alive="true"
    :plugins="[InstanceofPlugin(), windowClipboardPlugin()]" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import WuJie from 'wujie-vue3';
  import { InstanceofPlugin } from 'wujie-polyfill';
  import { useClientSize, useRouteInfo } from '@qst-admin/composables';

  const { route } = useRouteInfo();
  const { height } = useClientSize();

  const isSubApp = computed(() => {
    if (route.meta && route.meta.subAppUrl && route.meta.title && route.meta.menuConfig) {
      return true;
    } else {
      return false;
    }
  });

  /** 自定义wujie插件，避免子应用使用clipboard时报document not focused错误 */
  const windowClipboardPlugin = () => {
    return {
      windowPropertyOverride: (subWindow: Window) => {
        // return Object.defineProperty(subWindow.Navigator.prototype, 'clipboard', {
        return Object.defineProperty(subWindow.navigator, 'clipboard', {
          get: () => {
            return subWindow.__POWERED_BY_WUJIE__ ? subWindow.parent.navigator.clipboard : subWindow.navigator;
          },
        });
      },
    };
  };
</script>
