<template>
  <ContentWrapper>
    <template #header>
      <el-button type="primary" @click="createNewApplet">创建应用</el-button>
    </template>
    <DashboardContent>
      <div class="grid grid-cols-2 xl:grid-cols-3 xxl:grid-cols-4 gap-spacing-md">
        <AppletItem v-for="app in applets" :key="app.id" :data="app" />
      </div>
    </DashboardContent>
  </ContentWrapper>
  <NewAppletDialog ref="newAppletDialogRef" />
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { ContentWrapper, DashboardContent } from '@qst-admin/layout';
  import AppletItem from './components/AppletItem.vue';
  import { useAppletsStore } from '../store/applets';
  import NewAppletDialog from './components/NewAppletDialog.vue';

  const appletsStore = useAppletsStore();
  const { applets } = storeToRefs(appletsStore);

  const newAppletDialogRef = ref<InstanceType<typeof NewAppletDialog>>();

  onMounted(() => {
    appletsStore.getApplets();
  });

  const createNewApplet = () => {
    if (newAppletDialogRef.value) {
      newAppletDialogRef.value.open();
    }
  };
</script>
