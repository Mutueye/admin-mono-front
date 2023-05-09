<template>
  <div
    class="w-full min-h-full max-h-full overflow-hidden flex flex-row items-stretch min-w-1200px">
    <div class="flex flex-col w-left-menu bg-bg-page flex-shrink relative">
      <div class="flex flex-1 relative w-full z-10 min-h-0">
        <el-scrollbar class="w-full pt-spacing-xs">
          <Menu :layout="layout" />
        </el-scrollbar>
      </div>
      <div class="absolute w-1px top-0 bottom-0 right-0 bg-border-light" />
    </div>
    <div class="w-full flex flex-col bg-bg">
      <div class="flex flex-row items-center justify-between px-spacing-xl py-spacing">
        <div class="text-size-large font-semibold color-text-primary">{{ route.meta.title }}</div>
      </div>
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  import { LayoutEnum } from '@/layout/layoutRouteConfig';
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
