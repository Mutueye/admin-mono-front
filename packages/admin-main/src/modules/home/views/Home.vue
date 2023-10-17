<template>
  <ScrollableContent>
    <div class="grid grid-cols-2 xl:grid-cols-3 xxl:grid-cols-4 gap-spacing-md">
      <AppBtn v-for="app in appList" :key="app.name" :app-config="app" @config="() => open(app)" @delete="() => deleteApp(app)" />
      <AddAppBtn @click="() => open()" />
    </div>
  </ScrollableContent>
  <AppConfigDialog ref="appConfigDialogRef" />
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { ElMessageBox } from 'element-plus';
  import { remove } from 'lodash-es';
  import { SubAppConfig, setLocalSubAppList } from '@/utils/subAppConfig';
  import { getLocalSubAppList } from '@/utils/subAppConfig';

  import { ScrollableContent } from '@qst-admin/components';
  import AppBtn from './components/AppBtn.vue';
  import AddAppBtn from './components/AddAppBtn.vue';
  import AppConfigDialog from './components/AppConfigDialog.vue';

  const appList = ref<SubAppConfig[]>([]);
  const appConfigDialogRef = ref<InstanceType<typeof AppConfigDialog>>();

  onMounted(() => {
    const list = getLocalSubAppList();
    if (list) appList.value = list;
  });

  const open = (data?: SubAppConfig) => {
    if (appConfigDialogRef.value) {
      appConfigDialogRef.value.open(data);
    }
  };

  const deleteApp = (app: SubAppConfig) => {
    ElMessageBox.confirm(`您确定要删除应用 [${app.title}] 吗？`, '删除应用', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    })
      .then(() => {
        remove(appList.value, (item) => item.name === app.name);

        // const newAppList: SubAppConfig[] = [];
        // appList.value.forEach((item) => {
        //   if (app.name !== item.name) {
        //     newAppList.push(item);
        //   }
        // });
        setLocalSubAppList(appList.value, true);
      })
      .catch(() => null);
  };
</script>
