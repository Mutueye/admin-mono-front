<template>
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>

<script setup lang="ts">
  import { toRefs, onMounted, ref } from 'vue';
  import zhCn from 'element-plus/es/locale/lang/zh-cn';
  import { useThemeStore } from '@/store/theme';
  import { useAuthStore } from './modules/auth/store/auth';
  import { bus } from 'wujie';

  const authStore = useAuthStore();
  const themeStore = useThemeStore();
  const { currentThemeIndex } = toRefs(themeStore);
  const locale = ref(zhCn);

  onMounted(() => {
    if (currentThemeIndex.value !== 0) {
      themeStore.setCurrentThemeIndex(currentThemeIndex.value);
    }
    // 监听子应用触发的退出事件
    bus.$on('logout', () => {
      authStore.logout();
    });
  });
</script>
