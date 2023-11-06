<!-- 应用同步明细弹窗 -->
<template>
  <DialogWrapper title="应用同步明细" :show="state.show" :before-close="closeDialog">
    <el-table v-loading="state.loading" :data="tableData">
      <el-table-column prop="appletName" label="应用名称" />
      <el-table-column label="执行状态">
        <template #default="scope">
          {{ scope.row.status ? '成功' : '失败' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template #default="scope">
          <el-button text type="primary" @click="() => showDetail(scope.row)">详情</el-button>
          <el-button text type="primary" @click="() => resend(scope.row)">重发</el-button>
        </template>
      </el-table-column>
    </el-table>
  </DialogWrapper>
  <BulletinsDetailDialog ref="bulletinsDetailDialogRef" />
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { ElMessage } from 'element-plus';
  import { DialogWrapper } from '@qst-admin/components';
  import { useBulletinsStore } from '@/modules/base/store/bulletins';
  import { BulletinAppletStatement } from '@/modules/base/types';
  import BulletinsDetailDialog from './BulletinsDetailDialog.vue';

  const bulletinsStore = useBulletinsStore();
  const { currentSearchPayload } = storeToRefs(bulletinsStore);

  const bulletinsDetailDialogRef = ref<InstanceType<typeof BulletinsDetailDialog>>();
  const state = reactive<{ show: boolean; loading: boolean }>({ show: false, loading: false });
  const tableData = ref<BulletinAppletStatement[]>([]);

  /**
   * 打开弹窗
   * @param {string} id bulletin id
   */
  const open = (id: string) => {
    state.show = true;
    state.loading = true;
    bulletinsStore
      .getBulletinStatement(id)
      .then((res) => {
        if (state.show) tableData.value = res;
      })
      .finally(() => {
        state.loading = false;
      });
  };

  const closeDialog = () => {
    state.show = false;
    tableData.value = [];
  };

  const showDetail = (row: BulletinAppletStatement) => {
    if (bulletinsDetailDialogRef.value) {
      bulletinsDetailDialogRef.value.open(row.reply);
    }
  };

  // 重发
  const resend = (row: BulletinAppletStatement) => {
    state.loading = true;
    bulletinsStore
      .resendBulletins(row.id)
      .then((res) => {
        if (res.success) {
          closeDialog();
          ElMessage.success('重发成功');
          if (currentSearchPayload.value) bulletinsStore.getDataSyncList(currentSearchPayload.value, false);
        }
      })
      .finally(() => {
        state.loading = false;
      });
  };

  defineExpose({ open });
</script>
