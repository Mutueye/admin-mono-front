<template>
  <ContentWrapper>
    <!-- <template #header>
      <el-button type="primary" @click="createNewApplet">创建应用</el-button>
    </template> -->
    <DashboardContent v-loading="loading">
      <div v-if="currentApplet" class="bg-primary-light-9 w-full min-h-100px rounded-base flex flex-row items-start p-spacing min-w-0">
        <div class="w-64px min-h-64px h-full flex items-center justify-center text-size-32px color-white rounded-base bg-theme">
          {{ currentApplet.name[0] }}
        </div>
        <div class="flex flex-col ml-spacing flex-1 min-w-0">
          <div class="flex flex-row items-center min-w-0 w-full">
            <div class="text-size-16px font-bold leading-component-size-small truncate min-w-0">{{ currentApplet.name }}</div>
            <el-button text size="small" type="primary" class="ml-spacing-xs">
              <i class="i-mdi-edit text-size-16px" />
            </el-button>
            <el-button text size="small" type="primary" class="ml-spacing-xs">
              <i class="i-mdi-cog text-size-16px" />
            </el-button>
            <el-button text size="small" type="danger" class="ml-spacing-xs">
              <i class="i-mdi-trash text-size-16px" />
            </el-button>
          </div>
        </div>
      </div>
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
