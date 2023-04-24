<template>
  <RouterView />
</template>

<script setup lang="ts">
  import { toRefs, onMounted } from 'vue';
  import { useThemeStore } from './store/theme';

  const themeStore = useThemeStore();
  const { currentThemeIndex } = toRefs(themeStore);

  onMounted(() => {
    if (currentThemeIndex.value !== 0) {
      themeStore.setCurrentThemeIndex(currentThemeIndex.value);
    }
  });
</script>
