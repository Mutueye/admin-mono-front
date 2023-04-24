<template>
  <div class="w-full overflow-hidden flex flex-row min-w-1200px" :style="{ height: height + 'px' }">
    <WrapperSidebar />
    <div class="flex flex-col items-start flex-1 h-full min-h-0">
      <WrapperHeader />
      <div class="flex-1 w-full flex flex-col bg-bg min-h-0">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import WrapperHeader from './components/WrapperHeader.vue';
  import WrapperSidebar from './components/WrapperSidebar.vue';
  import { useClientSize } from '@/componsables/useClientSize';

  const { height } = useClientSize();
</script>
