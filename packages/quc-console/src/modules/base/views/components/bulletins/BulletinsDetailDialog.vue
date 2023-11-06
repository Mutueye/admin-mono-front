<!-- 详情弹窗 -->
<template>
  <DialogWrapper title="详情" :show="state.show" :before-close="closeDialog">
    <p class="pre-container">{{ detailStr }}</p>
  </DialogWrapper>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { DialogWrapper } from '@qst-admin/components';
  import { BulletinsResponse } from '@/modules/base/types';

  const state = reactive<{ show: boolean }>({ show: false });
  const detailStr = ref<string>('');

  const open = (data: string) => {
    detailStr.value = data;
    state.show = true;
  };

  const closeDialog = () => {
    state.show = false;
    detailStr.value = '';
  };

  defineExpose({ open });
</script>

<style lang="scss" scoped>
  .pre-container {
    display: block;
    overflow-x: auto;
    word-break: break-all;
    word-wrap: break-word;
    white-space: pre-wrap;
  }
</style>
