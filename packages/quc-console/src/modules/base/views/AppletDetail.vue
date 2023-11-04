<!-- 应用详情 -->
<template>
  <ContentWrapper v-loading="loading">
    <DashboardContent>
      <AppletDetailHeader />
      <AppletDetailContent v-if="currentApplet" :applet-data="currentApplet" />
    </DashboardContent>
  </ContentWrapper>
</template>

<script setup lang="ts">
  import { onMounted, ref, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import { ContentWrapper, DashboardContent } from '@qst-admin/layout';
  import { useAppletsStore } from '../store/applets';
  import AppletDetailHeader from './components/AppletDetailHeader.vue';
  import AppletDetailContent from './components/AppletDetailContent.vue';

  const route = useRoute();
  const appletsStore = useAppletsStore();

  const { currentApplet } = storeToRefs(appletsStore);

  const loading = ref(false);

  onMounted(() => {
    // 取应用详情
    getAppletDetail();
  });

  const getAppletDetail = () => {
    let id = route.params.id;
    if (Array.isArray(id)) id = id[0];
    loading.value = true;
    appletsStore.getAppletDetail(id).finally(() => {
      loading.value = false;
    });
  };
</script>
