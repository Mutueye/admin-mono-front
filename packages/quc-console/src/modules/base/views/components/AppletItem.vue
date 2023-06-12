<template>
  <div
    class="flex flex-row bg-bg-page p-spacing-md rounded-base group hover:bg-primary-light-9 cursor-pointer transition-colors relative">
    <div
      class="w-48px min-h-48px color-primary flex flex-row items-center justify-center text-size-xxl rounded-base bg-bg transition-colors group-hover:(bg-primary color-white)">
      {{ data.name[0] }}
    </div>
    <div class="flex flex-col flex-1 items-start min-w-0 pl-spacing-xs">
      <div
        class="text-size-base color-text-primary truncate w-full font-bold group-hover:(color-primary) transition-colors">
        {{ data.name }}
      </div>
      <div class="text-size-xs color-text-regular truncate w-full leading-20px">
        clientId: {{ data.id }}
      </div>
      <div class="text-size-xs color-text-regular truncate w-full leading-20px">
        数据同步: {{ data.bulletinEnabled ? '事件回调/已启用' : '未启用' }}
      </div>
    </div>
    <el-tooltip :content="data.enabled ? '已启用' : '已禁用'" placement="top">
      <div
        class="absolute w-10px h-10px right-8px top-8px rounded-full"
        :class="data.enabled ? 'bg-success' : 'bg-danger'" />
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>
  import { Applet } from '../../types';

  defineProps<{ data: Applet }>();
</script>
