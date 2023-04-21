<template>
  <div
    class="w-full bg-bg h-48px border-b border-border flex flex-row items-center justify-between relative pl-space-sm">
    <div class="flex flex-row items-center">
      <!-- <i class="i-uplus:logo inline-block align-middle w-space-lg h-space-lg" /> -->
      <div class="text-size-medium font-semibold">统一运营管理平台</div>
    </div>
    <WrapperHeaderAuth class="ml-space-xs" />
  </div>
</template>

<script lang="ts" setup>
  import WrapperHeaderAuth from './WrapperHeaderAuth.vue';
</script>
