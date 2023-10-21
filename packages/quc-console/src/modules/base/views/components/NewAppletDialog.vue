<template>
  <DialogWrapper title="创建应用" :show="state.show" :before-close="closeDialog">
    <NewAppletForm ref="newAppletFormRef" />
  </DialogWrapper>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { DialogWrapper } from '@qst-admin/components';
  import NewAppletForm from './NewAppletForm.vue';

  const newAppletFormRef = ref<InstanceType<typeof NewAppletForm>>();

  const state = reactive<{ show: boolean; isSubmitting: boolean }>({
    show: false,
    isSubmitting: false,
  });

  const open = () => {
    state.show = true;
  };

  const closeDialog = () => {
    state.isSubmitting = false;
    state.show = false;
    if (newAppletFormRef.value) {
      newAppletFormRef.value.resetForm();
    }
  };

  defineExpose({ open });
</script>
