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
    :alive="true" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import WuJie from 'wujie-vue3';
  import { useClientSize } from '@/componsables/useClientSize';
  import { useRouteInfo } from '@/componsables/useRouteInfo';

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
