<!-- 应用详情 -->
<template>
  <ContentWrapper>
    <DashboardContent v-loading="loading">
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
  import { useEnumsStore } from '@/store/enums';
  import { useAppletsStore } from '../store/applets';
  import AppletDetailHeader from './components/AppletDetailHeader.vue';
  import AppletDetailContent from './components/AppletDetailContent.vue';

  const route = useRoute();
  const enumsStore = useEnumsStore();
  const appletsStore = useAppletsStore();

  const { currentApplet } = storeToRefs(appletsStore);

  const loading = ref(false);

  onMounted(() => {
    // 获取应用权限枚举
    enumsStore.getEnums('apic');
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
