<!-- 创建应用表单 -->
<template>
  <el-form ref="formRef" :model="formData">
    <el-form-item prop="name" label="应用名称" label-width="100px" :rules="formRules.name">
      <el-input v-model="formData.name" />
    </el-form-item>
    <!-- 注意正确设置props属性 -->
    <el-form-item
      v-for="(item, index) in formData.hostList"
      :key="'host.' + index"
      label-width="100px"
      :label="index === 0 ? 'hosts地址' : ''"
      :prop="'hostList.' + index + '.host'"
      :rules="formRules.hosts">
      <div class="flex flex-row w-full items-center justify-between">
        <el-input v-model="item.host" class="flex-1" />
        <el-button v-if="formData.hostList.length > 1" text bg class="w-component-size ml-spacing-xxs" @click.prevent="removeHost(index)">
          <i class="i-mdi-close text-size-16px" />
        </el-button>
      </div>
    </el-form-item>
    <el-form-item label="" label-width="100px">
      <el-button @click="addHosts">
        <i class="i-mdi-plus text-size-16px mr-spacing-xxxs" />
        <span>添加</span>
      </el-button>
    </el-form-item>
    <div class="w-full flex flex-row justify-end">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" :loading="formState.submitting" @click="submit">创建应用</el-button>
    </div>
  </el-form>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { FormInstance, FormRules } from 'element-plus';
  import { globalFormRules } from '@qst-admin/utils';
  import { useAppletsStore } from '../../store/applets';
  import { CreateAppletPayload, CreateAppletResponse } from '../../types';

  /** 表单数据结构 */
  interface FormData {
    /** 应用名称 */
    name: string;
    /** 应用hosts列表 */
    hostList: { host: string }[];
  }

  /** 表单初始数据 */
  const initialFormData: FormData = {
    name: '',
    hostList: [{ host: '' }],
  };

  /** 表单ref */
  const formRef = ref<FormInstance>();
  /** 表单数据 */
  const formData = reactive<FormData>({ ...initialFormData });
  /** 表单验证规则 */
  const formRules = reactive<FormRules>({ name: globalFormRules.appletName, hosts: globalFormRules.hosts });
  /** 表单状态 */
  const formState = reactive<{ submitting: boolean }>({
    /** 是否提交中 */
    submitting: false,
  });

  const appletsStore = useAppletsStore();

  // const emit = defineEmits(['cancel', 'submit']);
  const emit = defineEmits<{
    (e: 'cancel'): void;
    (e: 'submit', value: CreateAppletResponse): void;
  }>();

  const addHosts = () => {
    formData.hostList = [...formData.hostList, { host: '' }];
  };

  const removeHost = (index: number) => {
    formData.hostList.splice(index, 1);
  };

  const clearValidate = () => {
    if (formRef.value) {
      formRef.value.clearValidate();
    }
  };

  const resetFormData = () => {
    Object.assign(formData, initialFormData);
  };

  const resetForm = () => {
    clearValidate();
    resetFormData();
  };

  const cancel = () => {
    emit('cancel');
  };

  const submit = () => {
    if (!formRef.value) return;
    formRef.value.validate((valid) => {
      if (valid) {
        formState.submitting = true;
        const payload: CreateAppletPayload = {
          name: formData.name,
          hosts: formData.hostList.map((item) => item.host),
        };
        appletsStore
          .createApplet(payload)
          .then((res) => {
            if (res.success && res.data) {
              emit('submit', res.data);
              appletsStore.getApplets();
            }
          })
          .finally(() => {
            formState.submitting = false;
          });
      }
    });
  };

  defineExpose({ resetForm });
</script>
