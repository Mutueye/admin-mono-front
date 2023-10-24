<template>
  <ContentWrapper>
    <template #header>
      <el-button type="primary" @click="createNewApplet">创建应用</el-button>
    </template>
    <DashboardContent v-loading="loading">
      <div class="grid grid-cols-2 xl:grid-cols-3 xxl:grid-cols-4 gap-spacing-md">
        <AppletItem v-for="app in applets" :key="app.id" :data="app" @click="() => onClick(app)" />
      </div>
    </DashboardContent>
  </ContentWrapper>
  <NewAppletDialog ref="newAppletDialogRef" />
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useRouter } from 'vue-router';
  import { ContentWrapper, DashboardContent } from '@qst-admin/layout';
  import AppletItem from './components/AppletItem.vue';
  import { useAppletsStore } from '../store/applets';
  import NewAppletDialog from './components/NewAppletDialog.vue';
  import { type AppletCardData } from '../types';

  const router = useRouter();

  const appletsStore = useAppletsStore();
  const { applets } = storeToRefs(appletsStore);

  const newAppletDialogRef = ref<InstanceType<typeof NewAppletDialog>>();
  const loading = ref(false);

  onMounted(() => {
    loading.value = true;
    appletsStore.getApplets().finally(() => {
      loading.value = false;
    });
  });

  const onClick = (app: AppletCardData) => {
    console.log('app:::', app.id);
    router.push({ name: 'appletDetail', params: { id: app.id } });
  };

  const createNewApplet = () => {
    if (newAppletDialogRef.value) {
      newAppletDialogRef.value.open();
    }
  };
</script>
