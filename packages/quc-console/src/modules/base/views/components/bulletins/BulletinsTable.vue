<template>
  <div
    class="flex flex-col flex-1 w-full min-h-0 border-border-light rounded-base overflow-hidden border-1px mt-spacing-md">
    <div id="search_table_content" class="flex flex-1 min-h-200px">
      <el-table :data="list" class="search-table" :height="rect.height + 'px'" table-layout="auto">
        <el-table-column type="index" label="序号" width="80px" align="center">
          <template #default="scope">
            {{ (pagination.pageNumber - 1) * pagination.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="timestamp" label="执行时间">
          <template #default="scope">
            {{ formatDate((scope.row as BulletinsResponse).timestamp) }}
          </template>
        </el-table-column>
        <el-table-column prop="eventId" label="事件ID" />
        <el-table-column prop="eventType" label="事件类型" />
        <el-table-column prop="eventSource" label="事件源" />
        <el-table-column prop="status" label="执行状态" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button type="primary" size="small" @click="showDetail(scope.row)">详情</el-button>
            <el-button type="primary" size="small" @click="showStatement(scope.row)">应用同步明细</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="w-full bg-bg-page px-spacing-xs py-spacing-xxs">
      <el-pagination
        class="search-from-pagination"
        small
        layout="total, ->, sizes, prev, pager, next"
        :total="pagination.total"
        :current-page="pagination.pageNumber"
        :page-size="pagination.pageSize"
        @size-change="onPageSizeChange"
        @current-change="onPageNumberChange" />
    </div>
    <BulletinsDetailDialog ref="bulletinsDetailDialogRef" />
    <BulletinsStatementDialog ref="bulletinsStatementDialogRef" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useBulletinsStore } from '@/modules/base/store/bulletins';
  import { useBoundingClientRect } from '@qst-admin/composables';
  import { formatDate } from '@qst-admin/utils';
  import { BulletinsResponse } from '../../../types';
  import BulletinsDetailDialog from './BulletinsDetailDialog.vue';
  import BulletinsStatementDialog from './BulletinsStatementDialog.vue';

  const bulletinsStore = useBulletinsStore();
  const { list, pagination } = storeToRefs(bulletinsStore);

  const bulletinsDetailDialogRef = ref<InstanceType<typeof BulletinsDetailDialog>>();
  const bulletinsStatementDialogRef = ref<InstanceType<typeof BulletinsStatementDialog>>();

  const { rect } = useBoundingClientRect('search_table_content');

  const onPageNumberChange = (num: number) => {
    bulletinsStore.updatePagination({ pageNumber: num });
  };

  const onPageSizeChange = (size: number) => {
    /** pageSize变更后，加载第1页 */
    bulletinsStore.updatePagination({ pageSize: size, pageNumber: 1 });
  };

  const showDetail = (row: BulletinsResponse) => {
    if (bulletinsDetailDialogRef.value) {
      const str = JSON.stringify(row.payloads, null, 4);
      bulletinsDetailDialogRef.value.open(str);
    }
  };

  const showStatement = (row: BulletinsResponse) => {
    if (bulletinsStatementDialogRef.value) {
      bulletinsStatementDialogRef.value.open(row.id);
    }
  };
</script>
