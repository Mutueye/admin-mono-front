<template>
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import zhCn from 'element-plus/es/locale/lang/zh-cn';
  // import { useThemeStore } from '@/store/theme';
  import { useThemeForBaseApp } from '@qst-admin/theme';
  import { useAuthStore } from '@qst-admin/auth';
  import { bus } from 'wujie';

  const router = useRouter();
  const authStore = useAuthStore();
  // const themeStore = useThemeStore();
  // const { currentThemeIndex } = toRefs(themeStore);
  const locale = ref(zhCn);

  useThemeForBaseApp();

  onMounted(() => {
    // if (currentThemeIndex.value !== 0) {
    //   themeStore.setCurrentThemeIndex(currentThemeIndex.value);
    // }
    // 监听子应用触发的退出事件
    bus.$on('logout', () => {
      authStore.logout(() => router.push({ name: 'login' }));
    });
  });
</script>
