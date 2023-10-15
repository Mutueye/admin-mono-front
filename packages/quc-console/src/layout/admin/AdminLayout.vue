<template>
  <div class="w-full min-h-full max-h-full overflow-hidden flex flex-row items-stretch">
    <div class="flex flex-col w-300px bg-bg-page flex-shrink-0 relative">
      <div class="flex flex-1 relative w-full z-10 min-h-0">
        <el-scrollbar class="w-full">
          <div class="w-full flex flex-col py-spacing-xs">
            <Menu :layout="layout" />
          </div>
        </el-scrollbar>
      </div>
      <div class="absolute w-1px top-0 bottom-0 right-0 bg-border-light" />
    </div>
    <div class="w-full flex flex-col bg-bg">
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { LayoutEnum } from '@/layout/layoutRouteConfig';
  import Menu from './components/Menu.vue';

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
