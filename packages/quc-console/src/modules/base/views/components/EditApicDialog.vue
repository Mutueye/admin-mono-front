<!-- 删除应用弹窗 -->
<template>
  <DialogWrapper title="配置权限" width="500" :show="state.show" :z-index="1999" :before-close="closeDialog">
    <EditApicContent @cancel="closeDialog" @submit="closeDialog" />
  </DialogWrapper>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { DialogWrapper } from '@qst-admin/components';
  import EditApicContent from './EditApicContent.vue';

  const state = reactive<{ show: boolean }>({ show: false });

  const open = () => {
    state.show = true;
  };

  const closeDialog = () => {
    state.show = false;
  };

  defineExpose({ open });
</script>
