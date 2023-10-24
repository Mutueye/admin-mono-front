<template>
  <div class="w-full flex flex-col flex-1 min-h-0 min-w-0">
    <div v-if="showTopLine" class="w-auto mx-spacing-xl h-1px bg-border-light" />
    <el-scrollbar>
      <div class="px-spacing-xl pb-spacing-xl flex-shrink-0 min-w-0 min-h-0 flex flex-col" :class="showTopLine ? 'pt-spacing-xl' : ''">
        <slot />
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    showTopLine: {
      type: Boolean,
      default: false,
    },
  });
</script>
