<template>
  <ScrollableContent>
    <div>Applets</div>
  </ScrollableContent>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import ScrollableContent from '@/components/ScrollableContent.vue';
  import { useAppletsStore } from '../store/applets';

  const appletsStore = useAppletsStore();

  onMounted(() => {
    appletsStore.getApplets();
  });
</script>
