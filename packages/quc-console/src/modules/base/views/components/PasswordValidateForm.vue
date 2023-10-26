<!-- 殊权限操作验证登录密码表单 -  用于：1.删除应用 2.重新生成secretKey 3.重新生成signingKey -->
<template>
  <div v-if="info" class="mb-spacing-xxs text-size-lg color-text-primary font-semibold">{{ info }}</div>
  <div class="mb-spacing-xxs">特殊权限操作，须验证登录密码：</div>
  <div class="w-full flex flex-col">
    <el-form ref="formRef" :model="formData">
      <el-form-item prop="password" :rules="formRules.password">
        <el-input v-model="formData.password" type="password" placeholder="请输入登录密码" :autofocus="true" />
      </el-form-item>
    </el-form>
    <div class="flex flex-row items-center justify-end">
      <el-button @click="cnacel">取消</el-button>
      <el-button
        class="ml-spacing-xxs"
        :type="submitDanger ? 'danger' : 'primary'"
        :loading="formState.submitting"
        :disabled="formState.submitDisabled"
        @click="submit">
        {{ submitLabel }}
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, watch } from 'vue';
  import { FormInstance, FormRules } from 'element-plus';

  /** 表单数据结构 */
  interface FormData {
    password: string;
  }
  /** 表单ref */
  const formRef = ref<FormInstance>();
  /** 表单数据 */
  const formData = reactive<FormData>({ password: '' });
  /** 表单验证规则 */
  const formRules = reactive<FormRules>({ password: [{ required: true, trigger: 'blur', message: '请输入登录密码' }] });
  /** 表单状态 */
  const formState = reactive<{ submitting: boolean; submitDisabled: boolean }>({
    /** 是否提交中 */
    submitting: false,
    /** 按钮禁用 */
    submitDisabled: false,
  });

  withDefaults(
    defineProps<{
      /** 特殊权限操作的标题，比如删除应用时显示“应用删除后不可恢复！” */
      info: string;
      /** 提交按钮的文字，默认“确定” */
      submitLabel: string;
      /** 提交按钮是否使用danger色 */
      submitDanger?: boolean;
    }>(),
    { info: '', submitLabel: '确定', submitDanger: false }
  );

  const emit = defineEmits<{
    (e: 'cancel'): void;
    (e: 'submit', password: string): void;
  }>();

  const clearValidate = () => {
    if (formRef.value) {
      formRef.value.clearValidate();
    }
  };

  const resetForm = () => {
    formData.password = '';
    Object.assign(formState, { submitting: false, submitDisabled: false });
    clearValidate();
  };

  const stopSubmitting = () => {
    formState.submitting = false;
  };

  const cnacel = () => {
    resetForm();
    emit('cancel');
  };

  watch(
    formData,
    (val) => {
      if (val.password) {
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
        emit('submit', formData.password);
      }
    });
  };

  defineExpose({ resetForm, stopSubmitting });
</script>
