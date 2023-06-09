<template>
  <ContentWrapper>
    <DashboardContent>
      <div class="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-spacing-md">
        <AppletItem v-for="app in applets" :key="app.id" :data="app" />
      </div>
    </DashboardContent>
  </ContentWrapper>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import ContentWrapper from '@/layout/common/ContentWrapper.vue';
  import DashboardContent from '@/layout/common/DashboardContent.vue';
  import AppletItem from './components/AppletItem.vue';
  import { useAppletsStore } from '../store/applets';
  import { storeToRefs } from 'pinia';

  const appletsStore = useAppletsStore();
  const { applets } = storeToRefs(appletsStore);

  onMounted(() => {
    appletsStore.getApplets();
  });
</script>
