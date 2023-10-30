<!-- 编辑应用配置弹窗 -->
<template>
  <DialogWrapper title="修改应用配置" :show="state.show" width="700px" :z-index="1999" :before-close="closeDialog">
    <AppletDetailContentForm
      v-if="appletData"
      ref="appletDetailContentFormRef"
      :applet-data="appletData"
      @cancel="closeDialog"
      @submit="closeDialog" />
  </DialogWrapper>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { DialogWrapper } from '@qst-admin/components';
  import AppletDetailContentForm from './AppletDetailContentForm.vue';
  import { AppletData } from '../../types';

  const state = reactive<{ show: boolean }>({ show: false });
  const appletData = ref<AppletData>();

  const appletDetailContentFormRef = ref<InstanceType<typeof AppletDetailContentForm>>();

  const open = (data: AppletData) => {
    appletData.value = Object.assign({}, data);
    if (appletDetailContentFormRef.value) {
      appletDetailContentFormRef.value.resetForm(data);
    }
    state.show = true;
  };

  const closeDialog = () => {
    state.show = false;
  };

  defineExpose({ open });
</script>
