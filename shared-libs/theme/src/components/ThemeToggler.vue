<template>
  <div class="flex flex-row items-center">
    <button
      v-for="(theme, index) in currentThemeList"
      :key="'primary' + theme.name"
      class="theme-btn mr-spacing color-white"
      :style="{ backgroundColor: theme.config[dayNightMode].color.primary }"
      @click="themeStore.setCurrentThemeIndex(index)">
      <i
        v-if="currentThemeIndex === index"
        class="i-mdi-check-circle-outline inline-block align-middle text-size-large" />
    </button>
    <button class="theme-btn" @click="() => toggleDayNight(true)">
      <i
        class="i-line-md-moon-filled-to-sunny-filled-loop-transition dark:i-line-md-moon-filled inline-block align-middle text-size-large color-text-regular" />
    </button>
  </div>
</template>

<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  import { useToggleDayNight } from '@qst-admin/composables';
  import { currentThemeList } from '@itshixun/qst-ui-system';
  import { useThemeStore } from '../store/theme';

  const themeStore = useThemeStore();
  const { currentThemeIndex } = storeToRefs(themeStore);
  const { toggleDayNight, dayNightMode } = useToggleDayNight();
</script>

<style lang="scss" scoped>
  $btn-size: 28px;
  .theme-btn {
    @apply rounded-full bg-bg-secondary border-none cursor-pointer flex flex-col items-center justify-center;

    width: $btn-size;
    height: $btn-size;
    outline-offset: 1px;
    &:focus-visible,
    &:hover {
      outline: 2px solid var(--el-text-color-disabled);
    }
  }
</style>
