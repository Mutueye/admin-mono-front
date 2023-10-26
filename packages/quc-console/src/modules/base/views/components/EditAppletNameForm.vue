<!-- 修改应用名称表单 -->
<template>
  <el-form ref="formRef" :inline="true" size="small" :model="formData">
    <el-form-item prop="name" :rules="formRules.name">
      <div class="flex flex-row items-center">
        <el-input v-model="formData.name" :autofocus="true" class="w-200px" />
        <el-button
          type="primary"
          class="ml-spacing-xxs"
          :loading="formState.submitting"
          :disabled="formState.submitDisabled"
          @click="submit">
          保存
        </el-button>
        <el-button class="ml-spacing-xxs" @click="cancel">取消</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import { reactive, ref, watch } from 'vue';
  import { FormInstance, FormRules } from 'element-plus';
  import { globalFormRules } from '@qst-admin/utils';
  import { useAppletsStore } from '../../store/applets';
  import { storeToRefs } from 'pinia';

  /** 表单数据结构 */
  interface FormData {
    /** 应用id */
    id: string;
    /** 应用名称 */
    name: string;
  }

  const appletsStore = useAppletsStore();

  const { currentApplet } = storeToRefs(appletsStore);

  /** 表单ref */
  const formRef = ref<FormInstance>();
  /** 表单数据 */
  const formData = reactive<FormData>(
    currentApplet.value ? { id: currentApplet.value.id, name: currentApplet.value.name } : { id: '', name: '' }
  );
  /** 表单验证规则 */
  const formRules = reactive<FormRules>({ name: globalFormRules.appletName });
  /** 表单状态 */
  const formState = reactive<{ submitting: boolean; submitDisabled: boolean }>({
    /** 是否提交中 */
    submitting: false,
    /** 按钮禁用 */
    submitDisabled: false,
  });

  const emit = defineEmits(['cancel', 'submit']);

  const clearValidate = () => {
    if (formRef.value) {
      formRef.value.clearValidate();
    }
  };

  const cancel = () => {
    clearValidate();
    emit('cancel');
  };

  watch(
    formData,
    (val) => {
      if (val.name && val.name !== currentApplet.value?.name) {
        // 表单名称存在且已修改，保存按钮可用
        formState.submitDisabled = false;
      } else {
        formState.submitDisabled = true;
      }
    },
    { deep: true, immediate: true }
  );

  const submit = () => {
    if (!formRef.value) return;
    formRef.value.validate((valid) => {
      if (valid) {
        formState.submitting = true;
        const payload = {
          id: formData.id,
          name: formData.name,
        };
        appletsStore
          .editAppletName(payload)
          .then((res) => {
            if (res.success) {
              emit('submit', res.data);
              appletsStore.getApplets();
              appletsStore.getAppletDetail(formData.id);
            }
          })
          .finally(() => {
            formState.submitting = false;
          });
      }
    });
  };

  defineExpose({ clearValidate });
</script>
