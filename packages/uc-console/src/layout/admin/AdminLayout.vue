<template>
  <div
    class="w-full min-h-full overflow-hidden flex flex-row self-stretch items-stretch min-w-1200px">
    <div class="flex flex-col w-left-menu bg-bg-page border-r border-border-lighter flex-shrink-0">
      <el-scrollbar>
        <Menu :layout="layout" />
      </el-scrollbar>
    </div>
    <div class="w-full flex flex-col bg-bg">
      <div class="flex flex-row items-center justify-between px-space-xl py-space">
        <div class="text-size-large font-semibold color-text-primary">{{ route.meta.title }}</div>
      </div>
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  import { LayoutEnum } from '@/router/layoutRouteConfig';
  import Menu from './components/Menu.vue';

  const route = useRoute();

  defineProps<{ layout: LayoutEnum }>();
</script>

<style lang="scss">
  html {
    height: 100%;
  }
  body {
    height: 100%;
  }
</style>
