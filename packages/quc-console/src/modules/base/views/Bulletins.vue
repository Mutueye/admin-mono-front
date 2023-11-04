<template>
  <ContentWrapper v-loading="listLoading">
    <div class="px-spacing-xl pb-spacing-xl flex-shrink-0 flex-1 min-h-0 flex flex-col">
      <BulletinsSearchForm />
      <BulletinsTable />
    </div>
  </ContentWrapper>
</template>

<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  import { ContentWrapper } from '@qst-admin/layout';
  import BulletinsSearchForm from './components/bulletins/BulletinsSearchForm.vue';
  import BulletinsTable from './components/bulletins/BulletinsTable.vue';
  import { useBulletinsStore } from '../store/bulletins';

  const bulletinsStore = useBulletinsStore();
  const { listLoading } = storeToRefs(bulletinsStore);
</script>
