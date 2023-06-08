<template>
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>

<script setup lang="ts">
  import { toRefs, onMounted, ref } from 'vue';
  import zhCn from 'element-plus/es/locale/lang/zh-cn';
  import { useThemeStore } from '@/store/theme';

  const themeStore = useThemeStore();
  const { currentThemeIndex } = toRefs(themeStore);
  const locale = ref(zhCn);

  onMounted(() => {
    if (currentThemeIndex.value !== 0) {
      themeStore.setCurrentThemeIndex(currentThemeIndex.value);
    }
  });
</script>
