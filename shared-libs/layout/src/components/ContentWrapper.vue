<template>
  <div class="flex flex-col w-full flex-1 min-h-0">
    <div class="flex flex-row items-center justify-between px-spacing-xl py-spacing">
      <!-- TODO header slots -->
      <div class="text-size-large font-semibold color-text-primary">{{ route.meta.title }}</div>
      <slot name="header" />
    </div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  const route = useRoute();
</script>
