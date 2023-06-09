<template>
  <button class="app-btn" @click="() => null">
    <div class="app-btn-title">
      <i class="inline-block text-size-20px i-mdi-plus mr-spacing-xxxs" />
      <span>添加应用</span>
    </div>
  </button>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  .app-btn {
    @apply bg-bg-page rounded-base cursor-pointer border-none p-spacing-md flex flex-row items-center justify-center min-w-0 transition-colors relative overflow-hidden duration-75;
    .app-btn-title {
      @apply text-size-14px h-44px flex flex-row items-center justify-center leading-18px font-500 color-primary runcate w-full text-left transition-colors;
    }
    &:hover {
      @apply bg-theme z-100;
      .app-btn-title {
        @apply color-white;
      }
    }
  }
</style>
