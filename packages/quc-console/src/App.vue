<template>
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { setThemeClassByIndex } from '@itshixun/qst-ui-system';
  import zhCn from 'element-plus/es/locale/lang/zh-cn';
  import { useToggleDayNight } from '@/componsables/useToggleDayNight';

  const { toggleDayNight } = useToggleDayNight();
  const locale = ref(zhCn);

  onMounted(() => {
    // 如果当前是是WUJIE微前端子应用
    if (window.__POWERED_BY_WUJIE__) {
      // 切换夜间模式事件
      window.$wujie?.bus.$on('toggle-dark', () => {
        toggleDayNight();
      });
      // 主题切换事件
      window.$wujie?.bus.$on('theme-change', (themIndex: number) => {
        setThemeClassByIndex(themIndex);
      });
    }
  });
</script>
