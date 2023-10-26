<!-- 重新生成signingKey弹窗 -->
<template>
  <DialogWrapper title="操作提示" :show="state.show" :z-index="1999" :before-close="closeDialog">
    <PasswordValidateForm ref="formRef" info="即将重新生成 Signing Key！" @cancel="closeDialog" @submit="submit" />
  </DialogWrapper>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { DialogWrapper } from '@qst-admin/components';
  import PasswordValidateForm from './PasswordValidateForm.vue';
  import { useAppletsStore } from '../../store/applets';

  const appletsStore = useAppletsStore();
  const { currentApplet } = storeToRefs(appletsStore);

  const formRef = ref<InstanceType<typeof PasswordValidateForm>>();

  const state = reactive<{ show: boolean }>({ show: false });

  const open = () => (state.show = true);

  const submit = (pwd: string) => {
    if (currentApplet.value && pwd) {
      appletsStore
        .regenerateSigningKey({ id: currentApplet.value.id, password: pwd })
        .then((res) => {
          if (res.success && res.data) {
            formRef.value ? formRef.value.resetForm() : null;
            if (currentApplet.value) appletsStore.getAppletDetail(currentApplet.value.id);
            closeDialog();
          }
        })
        .finally(() => {
          formRef.value ? formRef.value.stopSubmitting() : null;
        });
    }
  };

  const closeDialog = () => (state.show = false);

  defineExpose({ open });
</script>
