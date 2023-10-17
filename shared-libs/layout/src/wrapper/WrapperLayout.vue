<template>
  <div class="w-full overflow-hidden flex flex-col min-w-1200px" :style="{ height: height + 'px' }">
    <WrapperHeader />
    <div class="flex flex-row flex-1 h-full min-h-0">
      <WrapperSidebar />
      <div class="flex-1 w-full flex flex-col bg-bg min-h-0 min-w-0">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import WrapperHeader from './components/WrapperHeader.vue';
  import WrapperSidebar from './components/WrapperSidebar.vue';
  import { useClientSize } from '@qst-admin/composables';

  const { height } = useClientSize();
</script>
