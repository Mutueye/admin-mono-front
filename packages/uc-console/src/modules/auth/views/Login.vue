<template>
  <div class="w-full h-100vh bg-bg-page flex flex-col items-center justify-center">
    <div class="w-480px h-auto p-space-xxxl bg-bg rounded-large border border-border-light">
      <div class="text-size-24px font-semibold mb-space-xxxl text-center">统一运营管理平台</div>
      <el-form ref="formRef" :model="formData" :rules="rules" size="large" class="-mb-18px">
        <el-form-item prop="account" class="mb-space-xxl">
          <el-input v-model="formData.account" placeholder="账号" />
        </el-form-item>
        <el-form-item prop="pass" class="mb-space-xxl">
          <el-input v-model="formData.pass" type="password" autocomplete="off" placeholder="密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="w-full" @click="submit(formRef)">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import type { FormInstance, FormRules } from 'element-plus';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '../store/auth';
  import { encodeLoginParams } from '@/utils/authUtils';

  const authStore = useAuthStore();
  const router = useRouter();

  const formRef = ref<FormInstance>();

  const formData = reactive({
    account: '',
    pass: '',
  });

  const rules = reactive<FormRules>({
    account: [{ required: true, trigger: 'blur', message: '请输入账号' }],
    pass: [{ required: true, trigger: 'blur', message: '请输入密码' }],
  });

  const submit = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid) => {
      if (valid) {
        authStore.getLoginKey().then((res) => {
          if (res && typeof res === 'string') {
            const crypto = encodeLoginParams(res, [formData.account, formData.pass]);
            if (crypto) {
              authStore.login({ cryptogram: crypto, key: res }).then(() => {
                authStore.getUserInfo().then(() => {
                  router.replace({ path: '/' });
                });
              });
            }
          }
        });
      } else {
        console.log('error submit!');
        return false;
      }
    });
  };
</script>
