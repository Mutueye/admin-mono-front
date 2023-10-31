<template>
  <div class="flex flex-col w-full flex-1 min-h-0 min-w-0">
    <div v-if="showHeader" class="flex flex-row items-center justify-between px-spacing-xl py-spacing">
      <HeaderTitle />
      <slot name="header" />
    </div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import HeaderTitle from './HeaderTitle.vue';

  withDefaults(
    defineProps<{
      /** 是否显示标题栏 */
      showHeader?: boolean;
    }>(),
    { showHeader: true }
  );
</script>
