<template>
  <div
    class="flex flex-col flex-1 w-full min-h-0 border-border-light rounded-base overflow-hidden border-1px mt-spacing-md">
    <div id="search_table_content" class="flex flex-1 min-h-200px">
      <el-table :data="list" class="search-table" :height="rect.height + 'px'">
        <el-table-column type="index" label="序号" width="100px">
          <template #default="scope">
            {{ (pagination.pageNumber - 1) * pagination.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="timestamp" label="执行时间" />
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
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useBulletinsStore } from '@/modules/base/store/bulletins';
  import { useBoundingClientRect } from '@qst-admin/composables';

  const bulletinsStore = useBulletinsStore();
  const { list, pagination } = storeToRefs(bulletinsStore);

  const { rect } = useBoundingClientRect('search_table_content');

  const onPageNumberChange = (num: number) => {
    bulletinsStore.updatePagination({ pageNumber: num });
  };

  const onPageSizeChange = (size: number) => {
    /** pageSize变更后，加载第1页 */
    bulletinsStore.updatePagination({ pageSize: size, pageNumber: 1 });
  };
</script>
