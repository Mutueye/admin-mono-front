<template>
  <div
    v-if="currentApplet"
    class="bg-primary-light-9 w-full min-h-100px rounded-base flex flex-row items-start p-spacing min-w-0">
    <div
      class="w-64px min-h-64px h-full flex items-center justify-center text-size-32px color-white rounded-base bg-theme">
      {{ currentApplet.name[0] }}
    </div>
    <div class="flex flex-col ml-spacing flex-1 min-w-0">
      <div v-if="!editName" class="flex flex-row items-center min-w-0 w-full min-h-component-size-small">
        <div class="text-size-16px font-bold leading-18px truncate min-w-0">
          {{ currentApplet.name }}
        </div>
        <el-tooltip content="修改应用名称" placement="top">
          <button class="tool-btn" @click="toggleEditName">
            <i class="tool-btn-icon i-mdi-edit" />
          </button>
        </el-tooltip>
        <el-tooltip content="配置权限" placement="top">
          <button class="tool-btn">
            <i class="tool-btn-icon i-mdi-cog" />
          </button>
        </el-tooltip>
        <el-tooltip content="删除应用" placement="top">
          <button class="tool-btn danger" @click="deleteApp">
            <i class="tool-btn-icon i-mdi-trash" />
          </button>
        </el-tooltip>
      </div>
      <EditAppletNameForm v-else @cancel="toggleEditName" @submit="toggleEditName" />
      <div class="leading-component-size-small flex flex-col">
        <div class="flex flex-row items-center mt-spacing-xxxs">
          <div class="w-90px">clientId:</div>
          <div>{{ currentApplet.id }}</div>
        </div>
        <div class="flex flex-row items-center mt-spacing-xxxs">
          <div class="w-90px">secret key:</div>
          <div>************************</div>
          <el-button size="small" class="ml-spacing-xxs">重新生成</el-button>
        </div>
        <div class="flex flex-row items-center mt-spacing-xxxs">
          <div class="w-90px">signing key:</div>
          <div>{{ showSigningKey ? currentApplet.signingKey : '************************' }}</div>
          <el-button size="small" class="ml-spacing-xxs">重新生成</el-button>
          <el-button size="small" class="ml-spacing-xxs" @click="toggleShowSigningKey">
            {{ showSigningKey ? '隐藏' : '显示' }}
          </el-button>
        </div>
      </div>
    </div>
  </div>
  <DeleteAppletDialog ref="deleteAppletDialogRef" />
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useAppletsStore } from '../../store/applets';
  import EditAppletNameForm from './EditAppletNameForm.vue';
  import DeleteAppletDialog from './DeleteAppletDialog.vue';

  const appletsStore = useAppletsStore();
  const { currentApplet } = storeToRefs(appletsStore);

  const editName = ref(false);
  const showSigningKey = ref(false);
  const deleteAppletDialogRef = ref<InstanceType<typeof DeleteAppletDialog>>();

  const toggleEditName = () => {
    editName.value = !editName.value;
  };

  const toggleShowSigningKey = () => {
    showSigningKey.value = !showSigningKey.value;
  };

  const deleteApp = () => {
    if (deleteAppletDialogRef.value && currentApplet.value) {
      deleteAppletDialogRef.value.open(currentApplet.value.id);
    }
    // ElMessageBox.confirm('您确定要删除应用吗？', '删除应用', {
    //   confirmButtonText: '确定',
    //   cancelButtonText: '取消',
    // })
    //   .then(() => {
    //     // TODO 删除
    //   })
    //   .catch(() => null);
  };
</script>

<style lang="scss">
  .tool-btn {
    @apply admin-btn ml-spacing-xxs w-component-size-small h-component-size-small bg-transparent transition-all rounded-full color-primary;
    .tool-btn-icon {
      @apply inline-block text-size-16px transition-all;
    }
    &:hover,
    &:focus-visible {
      @apply bg-bg color-primary-light-2;
    }
    &.danger {
      @apply color-danger;
      &:focus-visible {
        @apply outline-danger color-danger-light-2;
      }
    }
  }
</style>