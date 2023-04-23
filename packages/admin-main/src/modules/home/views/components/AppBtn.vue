<template>
  <button class="app-btn" @click="() => router.push({ name: appConfig.name })">
    <div class="app-icon">
      <i class="app-icon-text" :class="appConfig.iconClass" />
    </div>
    <div class="flex flex-col items-start flex-1 ml-space-xs min-w-0">
      <div class="app-btn-title">{{ appConfig.title }}</div>
      <div class="app-btn-info">{{ appConfig.url }}</div>
    </div>
    <i class="deco-icon" :class="appConfig.iconClass" />
    <div class="absolute top-10px right-10px flex flex-row items-center">
      <el-tooltip content="应用配置" placement="top">
        <div class="config-btn" @click.stop="configClick">
          <i class="color-white text-size-16px i-mdi-cog" />
        </div>
      </el-tooltip>
      <el-tooltip content="删除应用" placement="top">
        <div class="config-btn" @click.stop="deleteApp">
          <i class="color-white text-size-16px i-mdi-close-circle" />
        </div>
      </el-tooltip>
    </div>
  </button>
</template>

<script setup lang="ts">
  import type { SubAppConfig } from '@/utils/subAppConfig';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  defineProps<{ appConfig: SubAppConfig }>();

  const emit = defineEmits(['config', 'delete']);
  const configClick = () => {
    emit('config');
  };

  const deleteApp = () => {
    emit('delete');
  };
</script>

<style lang="scss" scoped>
  .app-btn {
    @apply bg-bg-page rounded-base cursor-pointer border-none p-space-md flex flex-row items-center min-w-0 transition-colors relative overflow-hidden duration-75;
    .app-icon {
      @apply w-44px h-44px bg-bg rounded-base flex items-center justify-center flex-shrink-0 transition-colors;
      .app-icon-text {
        @apply color-text-regular text-size-24px;
      }
    }
    .app-btn-title {
      @apply text-size-16px leading-18px font-500 color-text-primary runcate w-full text-left transition-colors;
    }
    .app-btn-info {
      @apply text-size-12px color-text-secondary truncate w-full text-left transition-colors mt-space-xxxs;
    }
    .deco-icon {
      @apply color-white text-size-80px absolute right-50px -top-2px opacity-0 translate-y-20px transition-transform duration-400 ease-out;
    }
    .config-btn {
      @apply opacity-0 w-30px h-30px flex items-center justify-center rounded-base cursor-pointer;
      &:hover {
        @apply bg-white bg-opacity-10;
      }
    }
    &:hover {
      @apply bg-theme z-100;
      .app-icon {
        @apply bg-white;
        .app-icon-text {
          @apply color-primary;
        }
      }
      .app-btn-title {
        @apply color-white;
      }
      .app-btn-info {
        @apply color-white opacity-50;
      }
      .deco-icon {
        @apply translate-y-0 opacity-5;
      }
      .config-btn {
        @apply opacity-100;
      }
    }
  }
</style>
