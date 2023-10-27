<!-- 编辑应用信息表单 TODO -->
<template>
  <el-form ref="formRef" :model="formData" class="border-border border-1px p-spacing-md border-solid mt-spacing">
    <el-form-item
      v-for="(item, index) in formData.hostList"
      :key="'host.' + index"
      label-width="100px"
      :label="index === 0 ? 'hosts' : ''"
      :prop="'hostList.' + index + '.host'"
      :rules="formRules.hosts">
      <div class="flex flex-row w-full items-center justify-between">
        <el-input v-model="item.host" class="flex-1" />
        <el-button
          v-if="formData.hostList.length > 1"
          text
          bg
          class="w-component-size ml-spacing-xxs"
          @click.prevent="removeHost(index)">
          <i class="i-mdi-close text-size-16px" />
        </el-button>
      </div>
    </el-form-item>
    <el-form-item label="" label-width="100px">
      <el-button class="w-full" @click="addHosts">
        <i class="i-mdi-plus text-size-16px mr-spacing-xxxs" />
        <span>添加</span>
      </el-button>
    </el-form-item>
    <div class="w-full flex flex-row justify-end">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" :loading="formState.submitting" @click="submit">保存</el-button>
    </div>
  </el-form>
</template>

<script setup lang="ts">
  import { reactive, ref, toRefs } from 'vue';
  import { FormInstance, FormRules } from 'element-plus';
  import { globalFormRules } from '@qst-admin/utils';
  import { useAppletsStore } from '../../store/applets';
  import { AppletData } from '../../types';
  import { storeToRefs } from 'pinia';

  interface AppletFormData extends AppletData {
    hostList: { host: string }[];
  }

  const resolveHostList = (hosts: string[]) => {
    return hosts.map((host) => ({ host }));
  };

  const props = defineProps<{ appletData: AppletData }>();
  const { appletData } = toRefs(props);

  /** 表单ref */
  const formRef = ref<FormInstance>();
  /** 表单数据 */
  const formData = reactive<AppletFormData>({ ...appletData.value, hostList: resolveHostList(appletData.value.hosts) });
  /** 表单验证规则 */
  const formRules = reactive<FormRules>({ name: globalFormRules.appletName, hosts: globalFormRules.hosts });
  /** 表单状态 */
  const formState = reactive<{ submitting: boolean }>({
    /** 是否提交中 */
    submitting: false,
  });

  const appletsStore = useAppletsStore();
  const { currentApplet } = storeToRefs(appletsStore);

  // const emit = defineEmits(['cancel', 'submit']);
  const emit = defineEmits<{
    (e: 'cancel'): void;
    (e: 'submit', value: AppletData): void;
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
    Object.assign(formData, { ...appletData.value, hostList: resolveHostList(appletData.value.hosts) });
  };

  const resetForm = () => {
    clearValidate();
    resetFormData();
  };

  const cancel = () => {
    resetForm();
    emit('cancel');
  };

  const submit = () => {
    if (!formRef.value) return;
    formRef.value.validate((valid) => {
      if (valid) {
        formState.submitting = true;
        // const payload: CreateAppletPayload = {
        //   hosts: formData.hostList.map((item) => item.host),
        // };
        // appletsStore
        //   .createApplet(payload)
        //   .then((res) => {
        //     if (res.success && res.data) {
        //       emit('submit', res.data);
        //       appletsStore.getApplets();
        //     }
        //   })
        //   .finally(() => {
        //     formState.submitting = false;
        //   });
      }
    });
  };

  defineExpose({ resetForm });
</script>
