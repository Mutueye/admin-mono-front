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
    :plugins="[InstanceofPlugin()]" />
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
</script>
