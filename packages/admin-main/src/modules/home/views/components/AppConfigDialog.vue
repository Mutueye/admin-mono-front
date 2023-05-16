<template>
  <el-dialog
    v-model="state.show"
    :title="state.isEdit ? '配置应用' : '添加应用'"
    width="460px"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :before-close="handleClose">
    <el-form
      ref="formRef"
      label-position="left"
      :model="formData"
      :rules="formRules"
      class="-mb-20px"
      @submit.enter.prevent>
      <el-form-item prop="title" label="应用标题">
        <el-input v-model.trim="formData.title" placeholder="请输入应用标题" />
      </el-form-item>
      <el-form-item prop="name" label="应用名称">
        <el-input v-model.trim="formData.name" placeholder="请输入应用名称（英文）" />
      </el-form-item>
      <el-form-item prop="iconClass" label="应用图标">
        <el-select v-model="formData.iconClass" placeholder="请选择应用图标" class="w-full">
          <el-option v-for="item in iconList" :key="item" :value="item">
            <div class="flex flex-row w-full items-center justify-start">
              <div class="w-20px h-16px flex items-center justify-center">
                <i class="inline-block text-size-16px color-regular" :class="item" />
              </div>
              <div class="ml-spacing-xxxs">{{ item }}</div>
            </div>
          </el-option>
          <template v-if="formData.iconClass" #prefix>
            <div class="w-16px h-16px flex items-center justify-center">
              <i
                class="inline-block text-size-16px color-text-regular"
                :class="formData.iconClass" />
            </div>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item prop="name" label="应用地址">
        <el-input v-model.trim="formData.url" placeholder="请输入应用地址" />
      </el-form-item>
      <!-- <el-form-item prop="captcha">
        <el-input
          v-model.trim="formData.captcha"
          placeholder="请输入验证码"
          maxlength="6"
          class="input-indent-45px suffix-offset-125px"
          clearable
          @change="onFormChange"
          @keyup.enter="submit"
          @clear="handleClear('captcha')" />
        <div class="auth-form-left">
          <img
            class="auth-form-img-icon"
            :src="joinBasePath('/assets/images/formIcons/vertify.png')" />
        </div>
        <div class="auth-form-right">
          <el-button
            link
            size="default"
            type="primary"
            :disabled="captchaControlData.disabled"
            @click="getCaptcha">
            {{ captchaControlData.label }}
          </el-button>
        </div>
      </el-form-item> -->
      <el-form-item>
        <div class="w-full flex flex-row justify-end mt-10px">
          <el-button class="flex-1" @click="handleClose">取消</el-button>
          <el-button
            type="primary"
            class="flex-1"
            :disabled="state.submitDisabled"
            :loading="state.isSubmitting"
            @click="submit">
            保存
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { ElForm } from 'element-plus';
  import type { FormInstance, FormRules } from 'element-plus';
  import type { SubAppConfig } from '@/utils/subAppConfig';
  import { iconList } from 'common-utils';
  import { getLocalSubAppList, setLocalSubAppList } from '@/utils/subAppConfig';

  const initialFormData = {
    title: '',
    name: '',
    iconClass: '',
    url: '',
    // order: 0,
  };

  const formRef = ref<FormInstance>();
  const formData = ref<SubAppConfig>(Object.assign({}, initialFormData));
  const formRules = reactive<FormRules>({
    title: [{ required: true, message: '请输入应用标题', trigger: 'blur' }],
    name: [{ required: true, message: '请输入应用名称(英文)', trigger: 'blur' }],
    iconClass: [{ required: true, message: '请选择应用图标', trigger: 'blur' }],
    url: [{ required: true, message: '请输入应用地址', trigger: 'blur' }],
    // order: [{ required: true, message: '请设置应用序号', trigger: 'blur' }],
  });

  const dialogData = ref<SubAppConfig>();
  const state = reactive({
    show: false,
    isEdit: false,
    submitDisabled: false,
    isSubmitting: false,
  });

  /**
   * 打开弹窗，须传入必要的弹窗数据， 不传则为新建
   * @param {SubAppConfig} data
   */
  const open = (data?: SubAppConfig) => {
    state.show = true;
    if (data) {
      state.isEdit = true;
      formData.value = Object.assign(formData.value, data);
      dialogData.value = data;
    } else {
      state.isEdit = false;
    }
  };
  /**
   * 提交绑定
   */
  const submit = () => {
    if (!formRef.value) return;
    formRef.value.validate((valid: boolean) => {
      if (valid) {
        const appList = getLocalSubAppList();
        if (appList) {
          if (state.isEdit) {
            const newAppList: SubAppConfig[] = [];
            appList.forEach((config) => {
              // if (config.id === formData.value.id)
              if (dialogData.value && config.name === dialogData.value.name) {
                newAppList.push(formData.value);
              } else {
                newAppList.push(config);
              }
            });
            setLocalSubAppList(newAppList, true);
          } else {
            const newAppList = [...appList, formData.value];
            setLocalSubAppList(newAppList, true);
          }
        } else {
          setLocalSubAppList([formData.value], true);
        }
      }
    });
  };

  // 关闭绑定手机号弹框同时清掉错误提示、文本框内容
  const handleClose = () => {
    state.show = false;
    formData.value = Object.assign({}, initialFormData);
    formRef.value && formRef.value.resetFields();
  };

  defineExpose({ open });
</script>
