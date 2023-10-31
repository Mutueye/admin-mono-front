<!-- 重新生成secretKey弹窗 -->
<template>
  <DialogWrapper
    width="500"
    :title="stepTitle[state.step]"
    :show="state.show"
    :z-index="1999"
    :before-close="closeDialog">
    <PasswordValidateForm
      v-if="state.step === 'hint'"
      ref="formRef"
      info="即将重新生成 Secret Key！"
      submit-label="提交验证"
      @cancel="closeDialog"
      @submit="submit" />
    <SecretSuccessInfo v-if="state.step === 'success'" :secret="state.secret" @close="closeDialog" />
  </DialogWrapper>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { DialogWrapper } from '@qst-admin/components';
  import PasswordValidateForm from './PasswordValidateForm.vue';
  import SecretSuccessInfo from './SecretSuccessInfo.vue';
  import { useAppletsStore } from '../../store/applets';

  const appletsStore = useAppletsStore();
  const { currentApplet } = storeToRefs(appletsStore);

  const formRef = ref<InstanceType<typeof PasswordValidateForm>>();

  type Step = 'hint' | 'success';
  const stepTitle: Record<Step, string> = {
    hint: '操作提示',
    success: 'Secret Key 生成成功',
  };

  const state = reactive<{ show: boolean; step: Step; secret: string }>({
    show: false,
    step: 'hint',
    secret: '',
  });

  const open = () => (state.show = true);

  const submit = (pwd: string) => {
    if (currentApplet.value && pwd) {
      appletsStore
        .regenerateSecretKey({ id: currentApplet.value.id, password: pwd })
        .then((res) => {
          if (res.success && res.data) {
            formRef.value ? formRef.value.resetForm() : null;
            state.secret = res.data.secret;
            state.step = 'success';
            if (currentApplet.value) appletsStore.getAppletDetail(currentApplet.value.id);
          }
        })
        .finally(() => {
          formRef.value ? formRef.value.stopSubmitting() : null;
        });
    }
  };

  const closeDialog = () => {
    state.show = false;
    state.secret = '';
    state.step = 'hint';
  };

  defineExpose({ open });
</script>
