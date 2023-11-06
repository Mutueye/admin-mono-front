<!-- 创建应用弹窗 -->
<template>
  <DialogWrapper :title="stepTitle[state.step]" :show="state.show" :z-index="1999" :before-close="closeDialog">
    <NewAppletForm v-if="state.step === 'create'" ref="newAppletFormRef" @cancel="closeDialog" @submit="onCreate" />
    <SecretSuccessInfo v-if="state.step === 'success'" :secret="state.secret" @close="closeDialog" />
  </DialogWrapper>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { DialogWrapper } from '@qst-admin/components';
  import NewAppletForm from './NewAppletForm.vue';
  import SecretSuccessInfo from './SecretSuccessInfo.vue';
  import { CreateAppletResponse } from '../../types';

  const newAppletFormRef = ref<InstanceType<typeof NewAppletForm>>();

  type Step = 'create' | 'success';
  const stepTitle: Record<Step, string> = {
    create: '创建应用',
    success: '创建应用成功',
  };

  const state = reactive<{ show: boolean; step: Step; secret: string }>({
    show: false,
    step: 'create',
    secret: '',
  });

  const open = () => {
    state.show = true;
  };

  const onCreate = (data: CreateAppletResponse) => {
    if (newAppletFormRef.value) {
      newAppletFormRef.value.resetForm();
    }
    state.secret = data.secret;
    state.step = 'success';
  };

  const closeDialog = () => {
    state.show = false;
    state.secret = '';
    state.step = 'create';
    // TODO 重置内容
  };

  defineExpose({ open });
</script>
