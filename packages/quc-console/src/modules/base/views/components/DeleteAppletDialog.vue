<!-- 删除应用弹窗 -->
<template>
  <DialogWrapper title="删除应用" width="500" :show="state.show" :z-index="1999" :before-close="closeDialog">
    <PasswordValidateForm
      ref="formRef"
      info="应用删除后不可恢复!"
      submit-label="执行删除"
      :submit-danger="true"
      @submit="submit"
      @cancel="closeDialog" />
  </DialogWrapper>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { DialogWrapper } from '@qst-admin/components';
  import { useAppletsStore } from '../../store/applets';
  import PasswordValidateForm from './PasswordValidateForm.vue';
  import { ElMessage } from 'element-plus';

  const formRef = ref<InstanceType<typeof PasswordValidateForm>>();
  const appletId = ref<string>('');

  const appletsStore = useAppletsStore();
  const router = useRouter();

  const state = reactive<{ show: boolean }>({ show: false });

  const open = (id: string) => {
    if (id) appletId.value = id;
    state.show = true;
  };

  const submit = (pwd: string) => {
    appletsStore
      .deleteApplet({ id: appletId.value, password: pwd })
      .then((res) => {
        if (res.success) {
          ElMessage.success('应用已删除');
          if (formRef.value) formRef.value.resetForm();
          closeDialog();
          appletsStore.getApplets();
          router.replace({ name: 'applets' });
        }
      })
      .finally(() => {
        if (formRef.value) formRef.value.stopSubmitting();
      });
  };

  const closeDialog = () => {
    state.show = false;
  };

  defineExpose({ open });
</script>
