<!--  登录状态控件：登录按钮 / 用户信息 -->
<template>
  <div class="flex flex-row items-center h-full">
    <el-dropdown class="h-full">
      <div class="flex flex-row items-center px-spacing-sm h-full hover:bg-bg-page">
        <i class="inline-block i-mdi-account-circle text-size-20px mr-spacing-xxxs" />
        <div class="text-size-base font-semibold color-text-primary select-none">
          {{ userInfo.name }}
        </div>
      </div>
      <template #dropdown>
        <div class="p-spacing-md bg-bg flex flex-col">
          <div class="w-full mb-spacing-sm">
            <el-button text bg class="w-full">账号设置</el-button>
          </div>
          <div class="w-full mb-spacing-sm">
            <el-button text bg class="w-full" @click="logout">退出登录</el-button>
          </div>
          <ThemeToggler />
        </div>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { ElMessageBox } from 'element-plus';
  import { useAuthStore } from '@/modules/auth/store/auth';
  import ThemeToggler from '@/components/ThemeToggler.vue';

  const authStore = useAuthStore();
  const { userInfo } = storeToRefs(authStore);

  const logout = () => {
    ElMessageBox.confirm('您确定要退出吗？', '退出登录', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    })
      .then(() => {
        authStore.logout();
      })
      .catch(() => null);
  };
</script>
