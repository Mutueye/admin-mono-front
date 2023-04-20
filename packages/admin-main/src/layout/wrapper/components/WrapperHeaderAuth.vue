<!--  登录状态控件：登录按钮 / 用户信息 -->
<template>
  <div class="flex flex-row items-center">
    <el-dropdown>
      <div class="flex flex-row items-center px-space-sm h-48px hover:bg-bg-page">
        <div class="text-size-base font-semibold color-text-primary select-none">
          {{ userInfo.name }}
        </div>
      </div>
      <template #dropdown>
        <div class="p-space bg-bg flex flex-col">
          <div class="w-full mb-space-sm">
            <el-button text bg class="w-full">账号设置</el-button>
          </div>
          <div class="w-full mb-space-sm">
            <el-button text bg class="w-full">退出登录</el-button>
          </div>
          <ThemeToggler />
        </div>
        <!-- <el-dropdown-menu>
          <el-dropdown-item @click="authStore.logout">退出登录</el-dropdown-item>
        </el-dropdown-menu> -->
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
  // import { computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useAuthStore } from '@/modules/auth/store/auth';
  import ThemeToggler from '@/components/ThemeToggler.vue';
  // import { goLogin } from '@/utils/authUtils';
  // import defaultAvatar from '@/assets/default-avatar.png';

  const authStore = useAuthStore();
  const { userInfo } = storeToRefs(authStore);

  // const avatar = computed(() => {
  //   return userInfo.value.avatar ? userInfo.value.avatar : defaultAvatar;
  // });

  // /** 下拉菜单相关 */
  // const studentMenus = [
  //   { name: '我的课程', path: '/workbench/index/school', divided: false },
  //   { name: '我的实习', path: '/workbench/index/internship', divided: false },
  //   { name: '我的简历', path: '/workbench/index/resume', divided: false },
  //   { name: '账号设置', path: qucPersonalPath(), divided: true },
  //   { name: '退出登录', path: '', divided: true },
  // ];

  // /** 教师下拉菜单相关 */
  // const teacherMenus = [
  //   { name: '我的课程', path: '/u/teacherGr/group', divided: false },
  //   { name: '我的习题', path: '/u/teacherGr/exerciseLibs', divided: false },
  //   { name: '账号设置', path: qucPersonalPath(), divided: true },
  //   { name: '退出登录', path: '', divided: true },
  // ];
</script>
