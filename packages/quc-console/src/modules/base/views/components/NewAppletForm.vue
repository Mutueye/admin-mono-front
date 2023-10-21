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
        <el-button v-if="formData.hostList.length > 1" class="w-component-size ml-spacing-xxs" @click.prevent="removeHost(index)">
          <i class="i-mdi-close text-size-18px" />
        </el-button>
      </div>
    </el-form-item>
    <el-form-item label="" label-width="100px">
      <el-button @click="addHosts">添加</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { FormInstance, FormRules } from 'element-plus';
  import { globalFormRules } from '@qst-admin/utils';

  interface FormData {
    name: string;
    hostList: { host: string }[];
  }

  const initialFormData = {
    name: '',
    hostList: [{ host: '' }],
  };

  const formRef = ref<FormInstance>();
  const formData = reactive<FormData>({ ...initialFormData });
  const formRules = reactive<FormRules>({ name: globalFormRules.appletName, hosts: globalFormRules.hosts });

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

  defineExpose({ resetForm });
</script>
