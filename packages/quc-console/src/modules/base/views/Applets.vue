<template>
  <ContentWrapper>
    <DashboardContent>
      <div class="grid grid-cols-2 xl:grid-cols-3 xxl:grid-cols-4 gap-spacing-md">
        <AppletItem v-for="app in applets" :key="app.id" :data="app" />
      </div>
    </DashboardContent>
  </ContentWrapper>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { ContentWrapper, DashboardContent } from '@qst-admin/layout';
  import AppletItem from './components/AppletItem.vue';
  import { useAppletsStore } from '../store/applets';
  import { storeToRefs } from 'pinia';

  const appletsStore = useAppletsStore();
  const { applets } = storeToRefs(appletsStore);

  onMounted(() => {
    appletsStore.getApplets();
  });
</script>
